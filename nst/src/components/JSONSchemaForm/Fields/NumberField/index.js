import React from "react";
import { getDefaultTitle } from "../../utils";
// import { getEvent } from "../../../../event/Event";

export default class NumberField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formdata: this.props.cusevent.getDataByPath(this.props.path) }
  }
  setFormdata(value) {
    this.setState({ formdata: value })
    this.props.cusevent.publish(this.props.path, value);
    // this.setState({
    //   formdata:value
    // })
  }

  componentDidMount() {
    // console.log("[componentDidMount]", this.props.path);
    this.props.cusevent.subscribe([this.props.path], (values) => {
      console.log("[subscribe]", values);
      this.setState({ formdata: values[0] })
    })
  }
  componentDidUpdate() {
    // console.log("[componentDidUpdate]", this.props.path);
  }
  render() {
    // this.cusEvent=getEvent();
    // console.log(`[render]`, this.props.path, this.props.cusevent.getDataByPath(this.props.path));
    const { component } = this.props.uischema;
    const Widget = this.props.register.widget[component];
    const title = this.props.schema.title ?
      this.props.schema.title :
      getDefaultTitle(this.props.path);
    return (
      <>
        <p
          style={{
            fontSize: "18px"
          }}
        >
          {title}
        </p>
        <Widget
          schema={this.props.schema}
          uischema={this.props.uischema}
          formdata={this.state.formdata}
          path={this.props.path}
          setFormdata={this.setFormdata.bind(this)}
        />
      </>

    )
  }
}