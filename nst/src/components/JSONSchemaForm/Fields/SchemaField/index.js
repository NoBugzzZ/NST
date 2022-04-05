import React from "react";

export default class SchemaField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.schema=this.props.schema;
    this.formdata=this.props.formdata;
    this.register=this.props.register;
    this.path=this.props.path
    this.setFormdata=this.props.setFormdata;
  }
  getRenderField() {
    const { type } = this.schema;
    let Field = null;
    switch (type) {
      case "object":
        Field = this.register.field.ObjectField;
        break;
      case "string":
        Field = this.register.field.StringField;
        break;
      default:
        break;
    }
    return (
      <Field 
        schema={this.schema}
        formdata={this.formdata}
        register={this.register}
        path={this.path}
        setFormdata={this.setFormdata}
      />
    )
  }
  render() {
    console.log("SchemaField render");
    return (
      <>
        {
          this.getRenderField()
        }
      </>

    )
  }
}