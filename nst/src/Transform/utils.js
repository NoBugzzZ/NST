var _ = require("lodash");

function constructSchemaWithUI(schema, uischema) {
    const res = _.cloneDeep(schema);
    attachUischema(res,uischema);
    return res;
}

function attachUischema(schema,uischema){
    const { type } = schema;
    if (type === "object") {
        const properties=schema["properties"]
        for(let key in properties){
            attachUischema(properties[key],uischema[key]);
        }
    } else if (type === "array") {
        attachUischema(schema["items"],uischema["items"]);
    } else {
        if (!schema["x-context"]) {
            schema["x-context"] = {};
        }
        schema["x-context"] = { ...schema["x-context"], ...uischema["ui:location"] }
    }
}

export {
    constructSchemaWithUI
}