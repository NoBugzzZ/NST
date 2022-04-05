import { SchemaField, ObjectField, StringField } from "../Fields";
import { StringInputWidget } from "../Widgets";

export function getRegister() {
  return {
    field: {
      SchemaField,
      ObjectField,
      StringField,
    },
    widget: {
      StringInputWidget,
    }
  }
}

export function setDataToPath(obj, path = "root", value) {
  // console.log(obj, path, value);
  const paths = path.split(".");
  if (paths.length === 1) return value;
  let temp = obj;
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
  return obj;
}