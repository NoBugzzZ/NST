import React from "react";
import ArrayWidget from "../ArrayWidget";

export default class ArrayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formdata: props.formdata };
  }
  // static getDerivedStateFromProps(props) {
  //   // const newFormdata = props.formdata;
  //   // newFormdata.splice(0, 0, Object.keys(props.schema.items.properties))
  //   return {
  //     formdata: props.formdata
  //   }
  // }
  setFormdata = (index, propertyName, value) => {
    this.setState(({ formdata }) => {
      const newFormdata = [...formdata];
      newFormdata[index][propertyName] = value;
      return {
        formdata: newFormdata
      };
    })
  }
  deleteFormdata = (index) => {
    this.setState(({ formdata }) => {
      const newFormdata = [...formdata];
      console.log(index)
      newFormdata.splice(index, 1);
      return {
        formdata: newFormdata,
      };
    })
  }
  addFormdata = () => {
    this.setState(({ formdata }) => {
      const newFormdata = [...formdata];
      newFormdata.push({});
      return {
        formdata: newFormdata
      };
    })
  }
  render() {
    console.log(this.state)
    return (
      <>
        <ArrayWidget
          schema={this.props.schema}
          formdata={this.state.formdata}
          deleteFormdata={this.deleteFormdata}
          setFormdata={this.setFormdata}
        />
        <button
          onClick={this.addFormdata}
        >add</button>
      </>
    )
  }
}