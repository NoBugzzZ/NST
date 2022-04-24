class XEvent {
    constructor(props) {
        const { schema, formdata } = props;
        this.schema = schema;
        this.formdata = formdata ? formdata : this.getDefaultFormdata(schema);
        this.queue = {};
        this.dependencyGraph = {};
        this.constructdependencyGraph(schema, "root");
        this.topologicalOrder = this.topologicalSort();
        this.initialFormdata()

        console.log(this.formdata, this.dependencyGraph, this.topologicalOrder);
    }
    getDefaultFormdata(schema){
        const mapper={
          "object":{},
          "array":[],
          "string":"",
          "boolean":false,
          "number":"",
          "integer":"",
          "null":null,
        }
        const {type}=schema;
        if(mapper.hasOwnProperty(type)){
          return mapper[type];
        }else{
            throw new Error(`json schema no such type=${type}`)
        }
      }
    constructdependencyGraph(schema, path) {
        const { type } = schema;
        if (type === "object") {
            const properties = schema["properties"];
            const childrenKeys = Object.keys(properties)
            childrenKeys.forEach(key => {
                this.constructdependencyGraph(properties[key], `root.${key}`)
            })
        } else if (type !== "array") {
            // console.log(schema, path)
            const denpendency = schema["custom-denpendency"];
            if (denpendency) {
                const { denpendencies, value } = denpendency;
                denpendencies.forEach(d => {
                    if (!this.dependencyGraph[d]) {
                        this.dependencyGraph[d] = {
                            inDegree: 0,
                            successors: []
                        };
                    }
                    this.dependencyGraph[d] = {
                        ...this.dependencyGraph[d],
                        successors: [
                            ...this.dependencyGraph[d].successors,
                            {
                                ...denpendency,
                                target: path,
                                callback: new Function(`return ${value.replace(/\$deps/g, 'arguments')}`),
                            }
                        ],
                    }

                    if (!this.dependencyGraph[path]) {
                        this.dependencyGraph[path] = {
                            inDegree: 0,
                            successors: []
                        }
                    }
                    this.dependencyGraph[path] = {
                        ...this.dependencyGraph[path],
                        inDegree: this.dependencyGraph[path].inDegree + 1,
                    }
                })
            }
        }
    }
    topologicalSort() {
        let res = [];
        const newGraph = {}
        const keys = Object.keys(this.dependencyGraph);
        keys.forEach(key => {
            newGraph[key] = {
                inDegree: this.dependencyGraph[key].inDegree,
                successors: this.dependencyGraph[key].successors.map(successor => {
                    return successor.target;
                })
            }
        })
        // console.log(newGraph)
        for (let i = 0, len = keys.length; i < len; i++) {
            let findKey = "";
            for (let key in newGraph) {
                if (newGraph[key].inDegree === 0) {
                    findKey = key;
                    newGraph[key].successors.forEach(successor => {
                        newGraph[successor].inDegree -= 1;
                    })
                    delete newGraph[key];
                    // console.log(newGraph)
                    break;
                }
            }
            if (findKey) {
                res.push(findKey);
                findKey = "";
            } else {
                throw new Error("存在环!");
            }
        }
        return res;
    }
    initialFormdata() {
        this.topologicalOrder.forEach(key => {
            this.updateFormdata(this.dependencyGraph[key].successors)
        })
    }
    insertByTopologicalOrder(successor, queue) {
        let index = 0;
        for (let i = 0; i < queue.length; i++) {
            const currentOrder = this.topologicalOrder.indexOf(queue[i].target);
            const order = this.topologicalOrder.indexOf(successor.target)
            if (order < currentOrder) {
                break;
            } else if (order > currentOrder) {
                index++;
            } else {
                return;
            }
        }
        queue.splice(index, 0, successor);
    }
    getSuccessors(successors = [], queue) {
        // console.log(successors)
        for (let successor of successors) {
            // console.log(successor)
            this.insertByTopologicalOrder(successor, queue);
            this.getSuccessors(this.dependencyGraph[successor.target].successors, queue);
        }
    }
    updateFormdata(successors) {
        const queue = [];
        this.getSuccessors(successors, queue);
        queue.forEach(denpendency => {
            const { denpendencies, target, callback } = denpendency;
            const deps = denpendencies.map(d => this.getDataByPath(d));
            let flag = true;
            for (let d of deps) {
                if (d === null || d === undefined) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                const value = callback(...denpendencies.map(d => this.getDataByPath(d)))
                this.setDataByPath(target, value);
                this.notify(target);
            }
        })
    }
    setDataByPath(path = "root", value) {
        const paths = path.split(".");
        if (paths.length === 1) this.formdata = value;
        this.formdata = this.formdata ? this.formdata : {};
        let temp = this.formdata;
        const len = paths.length;
        for (let i = 1; i < len; i++) {
            let key = paths[i];
            if ((len - 1) === i) temp[key] = value;
            else {
                if (key in temp) temp = temp[key];
                else {
                    temp[key] = {};
                    temp = temp[key];
                }
            }
        }
    }
    getDataByPath(path) {
        const paths = path.split(".");
        if (paths.length === 1) return this.formdata;
        let temp = this.formdata;
        const len = paths.length;
        for (let i = 1; i < len; i++) {
            let key = paths[i];
            if ((len - 1) === i) return temp[key];
            else {
                temp = temp[key];
                if (!temp) return undefined;
            }
        }
    }
    notify(path) {
        const callbackArray = this.queue[path];
        if (callbackArray) {
            callbackArray.forEach(item => {
                const { paths, callback } = item;
                callback(paths.map(path => this.getDataByPath(path)))
            })
        }
    }

    //外部根据path更改值的方法
    publish(path, value) {
        // console.log(`[publish] ${path}=${value}`);
        this.setDataByPath(path, value);
        // console.log(this.formdata);
        this.notify(path);
        if (this.dependencyGraph[path]) {
            this.updateFormdata(this.dependencyGraph[path].successors);
        }
    }
    //外部根据path订阅值更新的方法
    subscribe(paths, callback) {
        paths.forEach(path => {
            if (!this.queue[path]) {
                this.queue[path] = [];
            }
            this.queue[path].push({ callback, paths });
        })

        // console.log(this.queue);
    }
}

let getEvent = (function () {
    let _instance = null;
    return (props) => {
        // console.log("[event]", props)
        if (!props) return _instance;
        const { schema, formdata } = props
        if (!schema) return _instance;
        _instance = new XEvent({ schema, formdata });
        return _instance;
    }
})()

export { XEvent, getEvent }


// const e = getEvent({
//     schema: {
//         "type": "object",
//         "properties": {
//             "firstname": {
//                 "type": "string"
//             },
//             "lastname": {
//                 "type": "string"
//             },
//             "name": {
//                 "type": "string",
//                 "custom-denpendency": {
//                     "denpendencies": ["root.firstname", "root.lastname"],
//                     "value": "$deps[1]+' '+$deps[0]"
//                 }
//             },
//             "birthday": {
//                 "type": "number"
//             },
//             "age": {
//                 "type": "number",
//                 "custom-denpendency": {
//                     "denpendencies": ["root.birthday"],
//                     "value": "new Date().getFullYear()-$deps[0]"
//                 }
//             },
//             "test1": {
//                 "type": "string"
//             },
//             "test2": {
//                 "type": "string",
//                 "custom-denpendency": {
//                     "denpendencies": ["root.test1"],
//                     "value": "'test2+'+$deps[0]"
//                 }
//             },
//             "test3": {
//                 "type": "string",
//                 "custom-denpendency": {
//                     "denpendencies": ["root.test1", "root.test2"],
//                     "value": "$deps[0]+' '+$deps[1]"
//                 }
//             },
//         }
//     },
//     formdata: {
//         "firstname": "z",
//         "lastname": "t",
//         "birthday": 1998
//     }
// })


// e.subscribe(["root.age"], (age) => {
//     console.log(`[subscribe] root.age=${age}`)
// })

// e.subscribe(["root.name"], (name) => {
//     console.log(`[subscribe] root.name=${name}`)
// })

// e.publish("root.birthday", 1997)
// e.publish("root.firstname", "zheng")


/**
class YEvent {
    constructor(props) {
        const { schema, formdata } = props;
        this.schema = schema;
        this.formdata = formdata ? formdata : this.getDefaultFormdata(schema);
        this.queue = {};
        this.dependencyGraph = {};
        this.constructdependencyGraph(schema, "root");
        this.topologicalOrder = this.topologicalSort();
        this.initialFormdata()

        console.log(this.formdata, this.dependencyGraph, this.topologicalOrder);
    }
    getDefaultFormdata(schema){
        const mapper={
          "object":{},
          "array":[],
          "string":"",
          "boolean":false,
          "number":"",
          "integer":"",
          "null":null,
        }
        const {type}=schema;
        if(mapper.hasOwnProperty(type)){
          return mapper[type];
        }else{
            throw new Error(`json schema no such type=${type}`)
        }
      }
    constructdependencyGraph(schema, path) {
        const { type } = schema;
        if (type === "object") {
            const properties = schema["properties"];
            const childrenKeys = Object.keys(properties)
            childrenKeys.forEach(key => {
                this.constructdependencyGraph(properties[key], `root.${key}`)
            })
        } else if (type !== "array") {
            // console.log(schema, path)
            const denpendency = schema["custom-denpendency"];
            if (denpendency) {
                const { denpendencies, value } = denpendency;
                denpendencies.forEach(d => {
                    if (!this.dependencyGraph[d]) {
                        this.dependencyGraph[d] = {
                            inDegree: 0,
                            successors: []
                        };
                    }
                    this.dependencyGraph[d] = {
                        ...this.dependencyGraph[d],
                        successors: [
                            ...this.dependencyGraph[d].successors,
                            {
                                ...denpendency,
                                target: path,
                                callback: new Function(`return ${value.replace(/\$deps/g, 'arguments')}`),
                            }
                        ],
                    }

                    if (!this.dependencyGraph[path]) {
                        this.dependencyGraph[path] = {
                            inDegree: 0,
                            successors: []
                        }
                    }
                    this.dependencyGraph[path] = {
                        ...this.dependencyGraph[path],
                        inDegree: this.dependencyGraph[path].inDegree + 1,
                    }
                })
            }
        }
    }
    topologicalSort() {
        let res = [];
        const newGraph = {}
        const keys = Object.keys(this.dependencyGraph);
        keys.forEach(key => {
            newGraph[key] = {
                inDegree: this.dependencyGraph[key].inDegree,
                successors: this.dependencyGraph[key].successors.map(successor => {
                    return successor.target;
                })
            }
        })
        // console.log(newGraph)
        for (let i = 0, len = keys.length; i < len; i++) {
            let findKey = "";
            for (let key in newGraph) {
                if (newGraph[key].inDegree === 0) {
                    findKey = key;
                    newGraph[key].successors.forEach(successor => {
                        newGraph[successor].inDegree -= 1;
                    })
                    delete newGraph[key];
                    // console.log(newGraph)
                    break;
                }
            }
            if (findKey) {
                res.push(findKey);
                findKey = "";
            } else {
                throw new Error("存在环!");
            }
        }
        return res;
    }
    initialFormdata() {
        this.topologicalOrder.forEach(key => {
            this.updateFormdata(this.dependencyGraph[key].successors)
        })
    }
    insertByTopologicalOrder(successor, queue) {
        let index = 0;
        for (let i = 0; i < queue.length; i++) {
            const currentOrder = this.topologicalOrder.indexOf(queue[i].target);
            const order = this.topologicalOrder.indexOf(successor.target)
            if (order < currentOrder) {
                break;
            } else if (order > currentOrder) {
                index++;
            } else {
                return;
            }
        }
        queue.splice(index, 0, successor);
    }
    getSuccessors(successors = [], queue) {
        // console.log(successors)
        for (let successor of successors) {
            // console.log(successor)
            this.insertByTopologicalOrder(successor, queue);
            this.getSuccessors(this.dependencyGraph[successor.target].successors, queue);
        }
    }
    updateFormdata(successors) {
        const queue = [];
        this.getSuccessors(successors, queue);
        queue.forEach(denpendency => {
            const { denpendencies, target, callback } = denpendency;
            const deps = denpendencies.map(d => this.getDataByPath(d));
            let flag = true;
            for (let d of deps) {
                if (d === null || d === undefined) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                const value = callback(...denpendencies.map(d => this.getDataByPath(d)))
                this.setDataByPath(target, value);
                this.notify(target);
            }
        })
    }
    setDataByPath(path = "root", value) {
        const paths = path.split(".");
        if (paths.length === 1) this.formdata = value;
        this.formdata = this.formdata ? this.formdata : {};
        let temp = this.formdata;
        const len = paths.length;
        for (let i = 1; i < len; i++) {
            let key = paths[i];
            if ((len - 1) === i) temp[key] = value;
            else {
                if (key in temp) temp = temp[key];
                else {
                    temp[key] = {};
                    temp = temp[key];
                }
            }
        }
    }
    getDataByPath(path) {
        const paths = path.split(".");
        if (paths.length === 1) return this.formdata;
        let temp = this.formdata;
        const len = paths.length;
        for (let i = 1; i < len; i++) {
            let key = paths[i];
            if ((len - 1) === i) return temp[key];
            else {
                temp = temp[key];
                if (!temp) return undefined;
            }
        }
    }
    notify(path) {
        const callbackArray = this.queue[path];
        if (callbackArray) {
            callbackArray.forEach(item => {
                const { paths, callback } = item;
                callback(paths.map(path => this.getDataByPath(path)))
            })
        }
    }

    //外部根据path更改值的方法
    publish(path, value) {
        // console.log(`[publish] ${path}=${value}`);
        this.setDataByPath(path, value);
        // console.log(this.formdata);
        this.notify(path);
        if (this.dependencyGraph[path]) {
            this.updateFormdata(this.dependencyGraph[path].successors);
        }
    }
    //外部根据path订阅值更新的方法
    subscribe(paths, callback) {
        paths.forEach(path => {
            if (!this.queue[path]) {
                this.queue[path] = [];
            }
            this.queue[path].push({ callback, paths });
        })

        // console.log(this.queue);
    }
}
 */