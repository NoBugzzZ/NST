function constructForm(props) {
    const form = {};
    traverseSchema(form, props.schema, 'root');
    traverseUISchema(form, props.uischema);
    return form;
}

function traverseSchema(form = {}, schema = {}, path = '') {
    const { type, title } = schema;
    form[path] = {
        type,
        title: title ? title : getDefaultTitle(path),
    }
    switch (type) {
        case 'object':
            for (let [key, value] of Object.entries(schema.properties)) {
                traverseSchema(form, value, `${path}.${key}`);
            }
            break;
        case 'array':
            traverseSchema(form, schema.items, `${path}.items`);
            break;
        case 'number':
        case 'integer':
        case 'string':
        case 'boolean':
        case 'null':
            break;
        default:
            throw new Error(`[TypeError] JSONSchema has no type for ${type}`);
    }
}

function getDefaultTitle(path = "root") {
    const paths = path.split(".");
    return paths[paths.length - 1];
}

function traverseUISchema(form,uischema){
    
}

function getUISchemaByPath(uischema, path) {
    const paths = path.split(".");
    const len = paths.length;
    if (len === 1) return uischema;
    let res = uischema;
    for (let i = 1; i < len; i++) {
        if (!res) break;
        res = res?.[paths[i]]
    }
    return res;
}

export { constructForm }