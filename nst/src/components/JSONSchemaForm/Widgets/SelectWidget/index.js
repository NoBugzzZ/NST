import React from "react";

export default class SelectWidget extends React.PureComponent {
  render() {
    const { enum: options } = this.props.schema;
    return (
      <div>
        <select
          name={this.props.path}
          value={this.props.formdata ? this.props.formdata : ""}
          onChange={(e) => {
            console.log(e.target.value);
            this.props.setFormdata(e.target.value);
          }}
        >
          <option
            key=""
            value=""
          >

          </option>
          {options ? options.map(opt => {
            return (
              <option
                key={opt}
                value={opt}
              >
                {opt}
              </option>
            )
          }) : null}
        </select>
      </div>
    )
  }
}