import React from "react";
import { getDefaultTitle, getFontSize } from "../../utils";
import { getEvent } from "../../../../event/Event";

export default class ArrayField extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.schema = this.props.schema;
    //     this.formdata = this.props.formdata;
    //     this.register = this.props.register;
    //     this.path = this.props.path;
    //     this.setFormdata = this.props.setFormdata;
    //     this.title=this.schema.title?this.schema.title:getDefaultTitle(this.path);
    // }
    render() {
        this.cusEvent=getEvent();
        console.log(`[render]`,this.props.path);
        // console.log(this.schema,this.formdata,this.path,this.title)
        const { component } = this.props.uischema;
        const Widget = this.props.register.widget[component];
        const title = this.props.schema.title ?
            this.props.schema.title :
            getDefaultTitle(this.props.path);
        const fontSize = getFontSize(this.props.path);
        return (
            <div>
                <p
                    style={{
                        fontWeight: "bold",
                        fontSize: `${fontSize}px`,
                    }}
                >{title}</p>
                <hr />
                <Widget
                    schema={this.props.schema.items}
                    uischema={this.props.uischema["items"]}
                    // formdata={this.props.formdata}
                    path={this.props.path}
                    // setFormdata={this.props.setFormdata}
                    register={this.props.register}
                />
            </div>
        )
    }
}