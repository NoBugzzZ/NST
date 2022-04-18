import React from "react";
import { getDefaultTitle } from "../../utils";
// import { getEvent } from "../../../../event/Event";

export default class StringField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: this.props.cusevent.getDataByPath(this.props.path),
      style: {},
    }
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
  setFormdata(value) {
    console.log("==========", value)
    this.setState({ formdata: value })
    this.props.cusevent.publish(this.props.path, value);
    // this.setState({
    //   formdata:value
    // })
  }

  componentDidMount() {
    console.log("[componentDidMount]", this.props.path);
    // const deps=this.props.schema["custom-denpendency"]?.["denpendencies"];
    // if(deps){
    //   console.log(deps)
    //   this.props.cusevent.subscribe(deps,(value)=>{
    //     console.log("[subscribe]",value);
    //     this.setState({formdata:value})
    //   })
    // }
    this.props.cusevent.subscribe([this.props.path], (values) => {
      console.log("[subscribe]", values);
      this.setState({ formdata: values[0] })
    })

    const styleDeps = this.props.uischema["custom-denpendency"]?.["denpendencies"];
    let styleProperty = this.props.uischema["custom-denpendency"]?.["style"];
    if (styleDeps && styleProperty) {
      // styleProperty=JSON.parse(styleProperty);
      this.props.cusevent.subscribe(styleDeps, (values) => {
        console.log("[style subscribe]", values);
        const style={};
        for (let key in styleProperty){
          console.log(styleProperty[key]);
          const func=new Function(`return ${styleProperty[key].replace(/\$deps/g,'arguments')}`);
          style[key]=func(...values);
        }
        console.log("``````style",style)
        this.setState({style});
      })
    }
  }
  componentDidUpdate() {
    console.log("[componentDidUpdate]", this.props.path);
  }
  render() {
    // this.cusEvent=getEvent();
    console.log(`[render]`, this.props.path);
    const { component } = this.props.uischema;
    const Widget = this.props.register.widget[component];
    const title = this.props.schema.title ?
      this.props.schema.title :
      getDefaultTitle(this.props.path);
    return (
      <>
        <p
          style={{
            fontSize: "18px",
            ...this.state.style,
          }}
        >
          {title}
        </p>
        <Widget
          schema={this.props.schema}
          uischema={this.props.schema}
          formdata={this.state.formdata}
          style={this.state.style}
          path={this.props.path}
          setFormdata={this.setFormdata.bind(this)}
        // title={this.title}
        />
      </>

    )
  }
}