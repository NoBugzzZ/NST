class XEvent {
    constructor(props) {
        const { schema, formdata } = props;
        this.schema = schema;
        this.formdata = formdata;
        this.queue = {};
        this.dependencyQueue = {};
        this.constructDependencyQueue(schema, "root");
        this.initialFormdata()

        // console.log(this.formdata,this.dependencyQueue);
    }
    constructDependencyQueue(schema, path) {
        const { type } = schema;
        if (type === "object") {
            const properties = schema["properties"];
            const childrenKeys = Object.keys(properties)
            childrenKeys.forEach(key => {
                this.constructDependencyQueue(properties[key], `root.${key}`)
            })
        } else if (type !== "array") {
            // console.log(schema, path)
            const denpendency = schema["custom-denpendency"];
            if (denpendency) {
                const { denpendencies, value } = denpendency;
                denpendencies.forEach(d => {
                    if (!this.dependencyQueue[d]) {
                        this.dependencyQueue[d] = [];
                    }
                    this.dependencyQueue[d].push({
                        ...denpendency,
                        target: path,
                        callback: new Function(`
                        return ${value.replace(/\$deps/g, 'arguments')}`),
                    })
                })
            }
        }
    }
    initialFormdata() {
        const queue = this.dependencyQueue;
        for (let key in queue) {
            this.updateFormdata(queue[key]);
        }
    }
    updateFormdata(denpendenciesToSource) {
        denpendenciesToSource.forEach(denpendency => {
            const { denpendencies, target, callback } = denpendency;
            const value = callback(...denpendencies.map(d => this.getDataByPath(d)))
            this.setDataByPath(target, value);
            this.notify(target);
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
                callback(...paths.map(path => this.getDataByPath(path)))
            })
        }
    }

    //外部根据path更改值的方法
    publish(path, value) {
        console.log(`[publish] ${path}=${value}`);
        this.setDataByPath(path, value);
        // console.log(this.formdata);
        this.notify(path);
        this.updateFormdata(this.dependencyQueue[path]);
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
        if (_instance) return _instance;
        const { schema, formdata } = props;
        _instance = new XEvent({ schema, formdata });
        return _instance;
    }
})()

export { getEvent }


// const e = getEvent({
//     schema: {
//         "type": "object",
//         "properties": {
//             "first name": {
//                 "type": "string"
//             },
//             "last name": {
//                 "type": "string"
//             },
//             "name": {
//                 "type": "string",
//                 "custom-denpendency": {
//                     "denpendencies": ["root.first name", "root.last name"],
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
//             }
//         }
//     },
//     formdata: {
//         "first name": "z",
//         "last name": "t",
//         "birthday": 1998
//     }
// })


// e.subscribe(["root.age"], (age) => {
//     console.log(`[subscribe] root.age=${age}`)
// })

// e.subscribe(["root.name"], (name) => {
//     console.log(`[subscribe] root.name=${name}`)
// })

// e.publish("root.birthday",1997)
// e.publish("root.first name","zheng")