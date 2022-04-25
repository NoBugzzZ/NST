import React from "react";
import { getEvent } from "../../event/Event";
import { constructForm } from "./utils";

export default class JSForm extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {};
    }

    static getDerivedStateFromProps(props) {
        console.log(props);
        const form = props.schema?constructForm(props):{};
        return { form }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                form
            </div>
        )
    }
}