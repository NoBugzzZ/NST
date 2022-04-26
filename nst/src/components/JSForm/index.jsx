import React from "react";
import { constructForm, constructCells, getRegister } from "./utils";

export default class JSForm extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {};
    }

    static getDerivedStateFromProps(props) {
        const form = props.schema ? constructForm(props) : {};
        const cells = constructCells(form, props.uischema);
        const register = getRegister(props.widgets);
        return { form, cells, register }
    }

    changeStyle(display){

    }

    render() {
        console.log(this.state)
        return (
            <table
                style={{
                    padding:0
                }}
            >
                <tbody>
                    {this.state.cells.map((row, index) => {
                        return (
                            <tr
                                key={index}
                            >
                                {row.map(cell => {
                                    const Field=this.state.register.fields[cell.field];
                                    return (
                                        <td
                                            key={cell.path}
                                            style={{
                                                padding:0
                                            }}
                                        >
                                            <Field
                                                cell={cell}
                                                register={this.state.register}
                                            >
                                            </Field>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        )
    }
}