import React from "react";
import { getDefaultTitle } from "../../utils";

export default class ArrayField extends React.PureComponent {
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
        console.log("ArrayField render");
        // console.log(this.schema,this.formdata,this.path,this.title)
        const {component}=this.schema;
        const Widget=this.register.widget[component];
        return (
            <div>
                <p>{this.title}</p>
                <hr />
                <Widget
                    schema={this.schema.items}
                    formdata={this.formdata}
                    path={this.path}
                    setFormdata={this.setFormdata}
                    register={this.register}
                />
            </div>
        )
    }
}