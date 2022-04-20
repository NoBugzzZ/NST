import React from "react";
import { getDefaultTitle, getFontSize } from "../../utils";

export default class ArrayField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { formdata: this.props.cusevent.getDataByPath(this.props.path) }
        // console.log(`[construct] ArrayField`)
    }
    setFormdata(value) {
        console.log(value)
        // this.setState({ formdata: value })
        // this.props.cusevent.publish(this.props.path, value);
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
        // console.log(`[render]`, this.props.path);
        // console.log(this.schema,this.formdata,this.path,this.title)
        const { component } = this.props.uischema;
        const Widget = this.props.register.widget[component];
        const title = this.props.schema.title ?
            this.props.schema.title :
            getDefaultTitle(this.props.path);
        const fontSize = getFontSize(this.props.path);
        return (
            <div>
                <p
                    style={{
                        fontWeight: "bold",
                        fontSize: `${fontSize}px`,
                    }}
                >{title}</p>
                <hr />
                <Widget
                    schema={this.props.schema.items}
                    uischema={this.props.uischema["items"]}
                    formdata={this.state.formdata}
                    path={`${this.props.path}.items`}
                    setFormdata={this.setFormdata.bind(this)}
                    register={this.props.register}
                />
            </div>
        )
    }
}


// import React from "react";
// import { getDefaultTitle, getFontSize } from "../../utils";

// export default class ArrayField extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { formdata: this.props.cusevent.getDataByPath(this.props.path) }
//     }
//     setFormdata(value) {
//         console.log(value)
//         this.setState({ formdata: value })
//         this.props.cusevent.publish(this.props.path, value);
//         // this.setState({
//         //   formdata:value
//         // })
//     }

//     componentDidMount() {
//         console.log("[componentDidMount]", this.props.path);
//         this.props.cusevent.subscribe([this.props.path], (values) => {
//             console.log("[subscribe]", values);
//             this.setState({ formdata: values[0] })
//         })
//     }
//     componentDidUpdate() {
//         console.log("[componentDidUpdate]", this.props.path);
//     }
//     render() {
//         console.log(`[render]`, this.props.path);
//         // console.log(this.schema,this.formdata,this.path,this.title)
//         const { component } = this.props.uischema;
//         const Widget = this.props.register.widget[component];
//         const title = this.props.schema.title ?
//             this.props.schema.title :
//             getDefaultTitle(this.props.path);
//         const fontSize = getFontSize(this.props.path);
//         return (
//             <div>
//                 <p
//                     style={{
//                         fontWeight: "bold",
//                         fontSize: `${fontSize}px`,
//                     }}
//                 >{title}</p>
//                 <hr />
//                 <Widget
//                     schema={this.props.schema.items}
//                     uischema={this.props.uischema["items"]}
//                     formdata={this.state.formdata}
//                     path={this.props.path}
//                     setFormdata={this.setFormdata.bind(this)}
//                     register={this.props.register}
//                 />
//             </div>
//         )
//     }
// }