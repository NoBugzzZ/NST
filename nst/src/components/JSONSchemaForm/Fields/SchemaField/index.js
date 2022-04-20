import React from "react";

export default class SchemaField extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.schema = this.props.schema;
  //   this.formdata = this.props.formdata;
  //   this.register = this.props.register;
  //   this.path = this.props.path
  //   this.setFormdata = this.props.setFormdata;
  // }
  constructor(props){
    super(props);
    console.log("[constructor]", this.props.path);
  }
  componentDidMount() {
    console.log("[componentDidMount]", this.props.path);
  }
  componentDidUpdate(prevProps, prevState, snaphot) {
    console.log("[componentDidUpdate]", this.props.path)
  }
  getRenderField() {
    const { type } = this.props.schema;
    let Field = null;
    switch (type) {
      case "object":
        Field = this.props.register.field.ObjectField;
        break;
      case "string":
        Field = this.props.register.field.StringField;
        break;
      case "array":
        Field = this.props.register.field.ArrayField;
        break;
      case "number":
        Field = this.props.register.field.NumberField;
        break;
      case "boolean":
        Field = this.props.register.field.BooleanField;
        break;
      case "null":
        Field = this.props.register.field.NullField;
        break;
      default:
        break;
    }
    return (
      <Field
        schema={this.props.schema}
        uischema={this.props.uischema}
        // formdata={this.props.formdata}
        register={this.props.register}
        cusevent={this.props.cusevent}
        path={this.props.path}
        // setFormdata={this.props.setFormdata}
      />
    )
  }
  render() {
    console.log("[render]", this.props.path)
    return (
      <>
        {
          this.getRenderField()
        }
      </>

    )
  }
}