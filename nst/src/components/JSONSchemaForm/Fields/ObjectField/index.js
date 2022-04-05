import React from "react";

export default class ObjectField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.schema = this.props.schema;
    this.formdata = this.props.formdata;
    this.register = this.props.register;
    this.path=this.props.path;
    this.setFormdata=this.props.setFormdata;
  }
  render() {
    console.log("ObjectField render", this.schema, this.formdata, this.register);
    return (
      <div>
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