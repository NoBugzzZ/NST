class Event {
    constructor(props) {
        const { schema, formdata } = props;
        this.schema = schema;
        this.formdata = formdata;
        this.queue = {};
        this.dependencyQueue = {};

        console.log(this.schema, this.formdata);
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
        this.setDataToPath(path, value);
        console.log(this.formdata);
        const callbacks = this.queue[path];
        if (callbacks) {
            callbacks.forEach(callback => {
                callback(this.getDataFromPath(path))
            })
        }
    }
    subscribe(path, callback) {
        if (!this.queue[path]) {
            this.queue[path] = [];
        }
        this.queue[path].push(callback);
        console.log(this.queue);
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
                    "value": "2022-$deps[0]"
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

e.subscribe("root.name", (value) => {
    console.log(`root.name=${value}`)
})

e.publish("root.name", "aa")