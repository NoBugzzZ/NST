import React from "react";
import { getDefaultTitle } from "../../utils";

export default class ObjectField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.schema = this.props.schema;
    this.formdata = this.props.formdata;
    this.register = this.props.register;
    this.path = this.props.path;
    this.setFormdata = this.props.setFormdata;
    this.title=this.schema.title?this.schema.title:getDefaultTitle(this.path);
  }

  render() {
    console.log("ObjectField render");
    return (
      <div>
        <p>{this.title}</p>
        <hr />
        {
          Object.keys(this.schema.properties).map(key => {
            const SchemaField = this.register.field.SchemaField;
            return (
              <SchemaField
                key={key}
                schema={this.schema.properties[key]}
                formdata={this.formdata ? this.formdata[key] : undefined}
                register={this.register}
                path={`${this.path}.${key}`}
                setFormdata={this.setFormdata}
              />
            )
          })
        }
      </div>
    )
  }
}