import React, { useContext } from "react"
import PathContext from "../Context"
import ObjectField from "../ObejctField"
import Field from "../Field"

export default function ArrayField({ name, children, component: Component }) {
    const path = useContext(PathContext)
    // console.log("[array]",React.Children.toArray(children))
    const { type } = children;
    // console.log(children)
    let newChildren = null;
    if (type === ObjectField) {
        // console.log("ObjectField");
        newChildren = children.props.children;
    } else if (type === Field) {
        // console.log("Field");
        newChildren = children;
    } else {
        throw new Error(`[TYPE ERROR] ${type.name}`)
    }
    return (
        <PathContext.Provider value={name ? `${path}.${name}` : path}>
            {Component ?
                <Component>
                    {newChildren}
                </Component>
                : <>{newChildren}</>
            }
        </PathContext.Provider>
    )
}