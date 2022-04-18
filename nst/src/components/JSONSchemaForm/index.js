import React from "react";
import "./index.css"
import { getRegister } from "./utils";
import { getEvent } from "../../event/Event";

export default class JSONSchemaForm extends React.PureComponent {
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(`[shouldComponentUpdate]`, nextProps, nextState);
  //   return true;
  // }

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
    this.cusevent=getEvent({
      schema:this.props.schema,
      formdata:this.props.formdata
    });
    console.log(`[render] root`, this.props);
    // this.formdata = this.props.formdata ? this.props.formdata : undefined;
    const SchemaField = this.register.field.SchemaField;
    return (
      <>
        {this.props.schema ?
          <div>
            <SchemaField
              schema={this.props.schema}
              uischema={this.props.uischema}
              // formdata={this.formdata}
              register={this.register}
              cusevent={this.cusevent}
              path="root"
              // setFormdata={this.setFormdata.bind(this)}
            />
            <div
              className="form-submit"
            >
              <button
                onClick={() => {
                  alert(JSON.stringify(this.cusevent.formdata));
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