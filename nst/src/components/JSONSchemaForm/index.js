import React from "react";
import "./index.css"
import { getRegister, setDataToPath } from "./utils";
import { getEvent } from "../../event/Event";

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
    // this.formdata = setDataToPath(this.formdata, path, value);
    console.log(path, value);
  }

  render() {
    console.log("JSONSchemaForm render", this.props);
    // this.formdata = this.props.formdata ? this.props.formdata : undefined;
    this.cusEvent = this.props.schema&&this.props.formdata?getEvent({
      schema: this.props.schema,
      formdata: this.props.formdata
    }):null;
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
            <div
              className="form-submit"
            >
              <button
                onClick={() => {
                  alert(JSON.stringify(this.cusEvent.formdata));
                }}
              >Submit</button>
            </div>

          </div>
          : null
        }
      </>

    )
  }
}