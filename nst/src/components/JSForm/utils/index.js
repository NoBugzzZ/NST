import {
    StringField,
} from "../Fields"
import {
    StringWidget
} from "../Widgets"

function getRegister(widgets) {
    return {
        fields: {
            StringField,
        },
        widgets: {
            ...widgets,
            StringWidget,
        }
    }
}

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
        field: type[0].toUpperCase() + type.slice(1) + "Field",
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

function getDefaultComponent(schema) {
    const { type } = schema;
    if (type) {
        return type[0].toUpperCase() + type.slice(1) + "Widget";
    } else {
        throw new Error(`[TypeError] JSONSchema has no type for ${type}`);
    }
}

function traverseUISchema(form, uischema) {
    for (let path in form) {
        let { component } = getUISchemaByPath(uischema, path);
        component = component ? component : getDefaultComponent(form[path]);
        form[path] = {
            ...form[path],
            widget: component
        }
    }
}

function getUISchemaByPath(uischema = {}, path = '') {
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

function constructCells(form, uischema) {
    const cells = [];
    const { display } = getUISchemaByPath(uischema, "root");
    if (display === "table") {
        for (let [path, value] of Object.entries(form)) {
            if (value.type === "object") continue;
            const { location } = getUISchemaByPath(uischema, path);
            setCellByLocation(cells, {
                path,
                ...value,
            }, location)
        }
    } else {
        for (let [path, value] of Object.entries(form)) {
            if (value.type === "object") continue;
            cells.push([{
                path,
                ...value
            }])
        }
    }
    return cells;
}

function setCellByLocation(cells, cell, location) {
    expandCells(cells, location);
    const { row, col } = location;
    cells[row - 1][col - 1] = cell;
}

function expandCells(cells, location) {
    const { row, col } = location;
    for (let i = cells.length; i < row; i++) {
        cells.push([]);
    }
    for (let i = cells[row - 1].length; i < col; i++) {
        cells[row - 1].push({});
    }
}

export { constructForm, constructCells, getRegister }