import React from "react";

export default class StringField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.schema = this.props.schema;
    this.formdata = this.props.formdata;
    this.register = this.props.register;
    this.path=this.props.path;
    this.setFormdata=this.props.setFormdata;
  }
  render() {
    console.log("StringField render", this.schema, this.formdata, this.register)
    const { component } = this.schema;
    const Widget = this.register.widget[component];
    return (
      <Widget
        schema={this.schema}
        formdata={this.formdata}
        path={this.path}
        setFormdata={this.setFormdata}
      />
    )
  }
}