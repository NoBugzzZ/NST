import React, { useContext } from "react"
import PathContext from "../Context"
import ObjectField from "../ObejctField"
import Field from "../Field"

export default function ArrayField({ name, children, component: Component }) {
    const path = useContext(PathContext)
    // console.log("[array]",React.Children.toArray(children))
    const { type } = children;
    console.log(children)
    if (type === ObjectField) {
        console.log("ObjectField");
    } else if (type === Field) {
        console.log("Field");
    } else {
        throw new Error(`[TYPE ERROR] ${type.name}`)
    }
    return (
        <PathContext.Provider value={name ? `${path}.${name}` : path}>
            {Component ?
                <Component>
                    {children}
                </Component>
                : <>{ children }</>
            }
        </PathContext.Provider>
    )
}