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

    render() {
        console.log(this.state)
        return (
            <table>
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