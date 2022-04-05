import React from "react";
import { getRegister, setDataToPath } from "./utils";

export default class JSONSchemaForm extends React.Component {
  constructor(props) {
    super(props);
    this.register = getRegister();
  }

  getDefaultState({ schema }) {
    const defaultState = {};
    defaultState.schema = schema ? schema : null;
    return defaultState;
  }

  setFormdata(path, value) {
    this.formdata = setDataToPath(this.formdata, path, value);
    // console.log(this.formdata);
  }

  render() {
    console.log("JSONSchemaForm render",this.props);
    this.formdata = this.props.formdata ? this.props.formdata : undefined;
    const SchemaField = this.register.field.SchemaField;
    return (
      <>
        {this.props.schema ?
          <div>
            <SchemaField
              schema={this.props.schema}
              formdata={this.formdata}
              register={this.register}
              path="root"
              setFormdata={this.setFormdata.bind(this)}
            />
            <button
              onClick={() => {
                alert(JSON.stringify(this.formdata));
              }}
            >Submit</button>
          </div>
          : null
        }
      </>

    )
  }
}