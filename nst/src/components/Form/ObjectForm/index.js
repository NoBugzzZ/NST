import React from "react"
import StringField from "../StringField"

export default class ObjectForm extends React.Component {
    render() {
        return (
            <div>
                {Object.entries(this.props.schema.properties)
                    .map(([key, value]) => {
                        return (
                            <StringField
                                key={key}
                                title={value.title || key}
                            />
                        )
                    })}
            </div>
        )
    }
}