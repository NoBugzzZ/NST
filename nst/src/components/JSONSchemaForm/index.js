import React from "react";
import "./index.css"
import { getRegister, setDataToPath } from "./utils";
import { getEvent } from "../../event/Event";

export default class JSONSchemaForm extends React.Component {
  constructor(props) {
    super(props);
    this.register = getRegister();
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    console.log(`[getDerivedStateFromProps] `, props, state);
    return null;
  }

  componentDidMount() {
    console.log(`[componentDidMount]`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(`[shouldComponentUpdate]`, nextProps, nextState);
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(`[getSnapshotBeforeUpdate]`, prevProps, prevState);
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(`[componentDidUpdate]`, prevProps, prevState, snapshot);
  }

  componentWillUnmount() {
    console.log(`[componentWillUnmount]`)
  }

  setFormdata(path, value) {
    // this.formdata = setDataToPath(this.formdata, path, value);
    console.log(path, value);
  }

  render() {
    console.log("JSONSchemaForm render", this.props);
    // this.formdata = this.props.formdata ? this.props.formdata : undefined;
    this.cusEvent = this.props.schema && this.props.formdata ? getEvent({
      schema: this.props.schema,
      formdata: this.props.formdata
    }) : null;
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