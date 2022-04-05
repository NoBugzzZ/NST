import React from "react";

export default class StringInputWidget extends React.PureComponent {
  constructor(props) {
    super(props);
    this.schema = this.props.schema;
    this.formdata = this.props.formdata;
    this.path=this.props.path;
    this.setFormdata=this.props.setFormdata
  }
  render() {
    console.log("StringInputWidget render",this.path,this.setFormdata);
    return (
      <div>
        <label htmlFor={this.schema.title}>{this.schema.title}: </label>
        <input name={this.schema.title} 
          onChange={(e)=>{
            this.setFormdata(this.path,e.target.value);
          }}
        ></input>
      </div>
    )
  }
}