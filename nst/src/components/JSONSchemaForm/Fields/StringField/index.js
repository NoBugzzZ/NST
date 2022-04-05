import React from "react";
import { getDefaultTitle } from "../../utils";

export default class StringField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.schema = this.props.schema;
    this.formdata = this.props.formdata;
    this.register = this.props.register;
    this.path=this.props.path;
    this.setFormdata=this.props.setFormdata;
    this.title=this.schema.title?this.schema.title:getDefaultTitle(this.path);
  }
  render() {
    console.log("StringField render")
    const { component } = this.schema;
    const Widget = this.register.widget[component];
    return (
      <Widget
        schema={this.schema}
        formdata={this.formdata}
        path={this.path}
        setFormdata={this.setFormdata}
        title={this.title}
      />
    )
  }
}