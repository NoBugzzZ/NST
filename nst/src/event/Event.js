class Event {
    constructor(props) {
        const { schema, formdata } = props;
        this.schema = schema;
        this.formdata = formdata;
        this.queue = {};
        this.dependencyQueue = {};
        this.constructDependencyQueue(schema, "root");
        this.initialFormdata()

        console.log(this.formdata);
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
                        callback: new Function(`return ${value.replace(/\$deps/g, 'arguments')}`),
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
            const value = callback(...denpendencies.map(d => this.getDataFromPath(d)))
            this.setDataToPath(target, value);
            this.notify(target);
        })
    }
    setDataToPath(path = "root", value) {
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
    getDataFromPath(path) {
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
    publish(path, value) {
        console.log(`[publish] ${path}=${value}`)
        this.setDataToPath(path, value);
        // console.log(this.formdata);
        const callbacks = this.queue[path];
        if (callbacks) {
            callbacks.forEach(callback => {
                callback(this.getDataFromPath(path))
            })
        }
        this.updateFormdata(this.dependencyQueue[path])
    }
    subscribe(path, callback) {
        if (!this.queue[path]) {
            this.queue[path] = [];
        }
        this.queue[path].push(callback);
        // console.log(this.queue);
    }
    notify(path) {
        const callbacks = this.queue[path];
        if (callbacks) {
            callbacks.forEach(callback => {
                callback(this.getDataFromPath(path))
            })
        }
    }
}

const e = new Event({
    schema: {
        "type": "object",
        "properties": {
            "first name": {
                "type": "string"
            },
            "last name": {
                "type": "string"
            },
            "name": {
                "type": "string"
            },
            "birthday": {
                "type": "number"
            },
            "age": {
                "type": "number",
                "custom-denpendency": {
                    "denpendencies": ["root.birthday"],
                    "value": "new Date(Date.now()).getFullYear()-$deps[0]"
                }
            }
        }
    },
    formdata: {
        "first name": "z",
        "last name": "t",
        "birthday": 1998
    }
})

e.subscribe("root.age", (value) => {
    console.log(`[subscribe]root.age=${value}`)
})

e.publish("root.birthday", 1997)

// const functionStr='2022-$deps[0]';
// const func=new Function(`return ${functionStr.replace(/\$deps/g,'arguments')}`)

// console.log(func(1))