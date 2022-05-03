import React from "react";
import MatrixWidget from "../MatrixWidget";

export default class MatrixForm extends React.Component{
  render(){
    return(
      <MatrixWidget
        matrix={this.props.formdata}
      />
    )
  }
}