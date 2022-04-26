import React from "react"

export default class StringField extends React.Component {
    render(){
        const {cell,register}=this.props;
        const Widget=register.widgets[cell.widget]
        return(
            <Widget
            >
            </Widget>
        )
    }
}