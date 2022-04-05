import React from "react";

export default class ArrayTableWidget extends React.PureComponent {
    constructor(props) {
        super(props);
        this.schema = this.props.schema;
        this.formdata = this.props.formdata ? this.props.formdata : [];
        this.path = this.props.path;
        this.setFormdata = this.props.setFormdata;
        this.register=this.props.register;
        this.state = { formdata: ["1"] };
    }
    render() {
        console.log("ArrayTableWidget render");
        console.log(this.schema, this.state);
        return (
            <div>
                ArrayTableWidget
                {
                    this.state.formdata.map((element, index) => {
                        const SchemaField = this.register.field.SchemaField;
                        console.log(element, index)
                        return (
                            <SchemaField
                                key={index}
                                schema={this.schema}
                                formdata={this.state.formdata[index]}
                                register={this.register}
                                path={`${this.path}[${index}]`}
                                setFormdata={this.setFormdata}
                            />
                        )
                    })
                }
            </div>
        )
    }
}