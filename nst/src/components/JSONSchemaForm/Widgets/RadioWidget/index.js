import React from "react";

export default class RadioWidget extends React.PureComponent {
    constructor(props) {
        super(props);
        this.schema = this.props.schema;
        this.formdata = this.props.formdata;
        this.path = this.props.path;
        this.setFormdata = this.props.setFormdata
        this.title = this.props.title;
        this.state = { formdata: this.formdata ? this.formdata : '' };
    }
    render() {
        console.log("RadioWidget render");
        console.log(this.schema)
        return (
            <div>
                <p>{this.title}</p>
                {this.schema.enum ?
                    this.schema.enum.map((element) => {
                        const key = `${this.path}.${element}`;
                        const checked = this.state.formdata === element ? true : false;
                        return (
                            <div
                                key={key}
                            >
                                <input
                                    type="radio"
                                    id={key}
                                    name={`${this.path}`}
                                    value={element}
                                    checked={checked}
                                    onChange={(e) => {
                                        // console.log(e.target.value);
                                        this.setState({ formdata: e.target.value })
                                        this.setFormdata(this.path, e.target.value)
                                    }}
                                ></input>
                                <label htmlFor={key}>{element}</label>
                            </div>
                        )
                    }) : null}
            </div>
        )
    }
}