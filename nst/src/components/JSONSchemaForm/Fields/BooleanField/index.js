import React from "react";
import { getDefaultTitle } from "../../utils";
// import { getEvent } from "../../../../event/Event";

export default class BooleanField extends React.Component {
  render() {
    // this.cusEvent=getEvent();
    // console.log(`[render]`,this.props.path);
    const { component } = this.props.uischema;
    const Widget = this.props.register.widget[component];
    const title = this.props.schema.title ?
      this.props.schema.title :
      getDefaultTitle(this.props.path);
    return (
      <>
        <p
          style={{
            fontSize:"18px"
          }}
        >
          {title}
        </p>
        <Widget
          schema={this.props.schema}
          uischema={this.props.uischema}
        //   formdata={this.props.formdata}
          path={this.props.path}
        //   setFormdata={this.props.setFormdata}
        // title={this.title}
        />
      </>

    )
  }
}