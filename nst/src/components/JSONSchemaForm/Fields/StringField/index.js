import React from "react";
import { getDefaultTitle } from "../../utils";
// import { getEvent } from "../../../../event/Event";

export default class StringField extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
    // this.schema = this.props.schema;
    // this.formdata = this.props.formdata;
    // this.register = this.props.register;
    // this.path = this.props.path;
    // this.setFormdata = this.props.setFormdata;
    // this.title = this.schema.title ? this.schema.title : getDefaultTitle(this.path);
  }
  // static getDerivedStateFromProps(props){
  //   console.log(props)
  //   const res={
  //     formdata:props.cusevent.getDataByPath(props.path)
  //   }
  //   console.log("############",res);
  //   return res;
  // }
  setFormdata(value){
    console.log("==========",value)
    this.props.cusevent.publish(this.props.path,value);
    // this.setState({
    //   formdata:value
    // })
  }
  render() {
    // this.cusEvent=getEvent();
    console.log(`[render]`,this.props.path);
    this.props.cusevent.subscribe([this.props.path],(value)=>{
      console.log("[subscribe]",value)
    })
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
          uischema={this.props.schema}
          formdata={this.state.formdata}
          path={this.props.path}
          setFormdata={this.setFormdata.bind(this)}
        // title={this.title}
        />
      </>

    )
  }
}