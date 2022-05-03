import React from "react"
import StringWidget from "../StringWidget"

export default class StringField extends React.Component {
  render() {
    return (
      <>
        <h4>
          {this.props.title}
        </h4>
        <StringWidget 
          formdata="data"
        />
      </>
    )
  }
}