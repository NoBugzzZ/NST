import React from "react";
import { getRegister, setDataToPath } from "./utils";

export default class JSONSchemaForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.formdata = props.formdata ? props.formdata : {};
    this.register = getRegister();
  }

  getDefaultState({ schema }) {
    const defaultState = {};
    defaultState.schema = schema ? schema : {};
    return defaultState;
  }

  setFormdata(path, value) {
    this.formdata = setDataToPath(this.formdata, path, value);
    console.log(this.formdata);
  }

  render() {
    console.log("JSONSchemaForm render");
    const SchemaField = this.register.field.SchemaField;
    return (
      <SchemaField
        schema={this.state.schema}
        formdata={this.formdata}
        register={this.register}
        path="root"
        setFormdata={this.setFormdata.bind(this)}
      />
    )
  }
}