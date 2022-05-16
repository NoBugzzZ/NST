import React, { useContext } from "react"
import PathContext from "../Context"
import ObjectField from "../ObejctField"
import Field from "../Field"

export default function ArrayField({ name, children, component: Component }) {
    const context = useContext(PathContext)
    console.log({...children},{ObjectField,Field})
    const { type } = children;
    let newChildren = null;
    if (type === ObjectField) {
        newChildren = children.props.children;
    } else if (type === Field) {
        newChildren = children;
    } else {
        throw new Error(`[TYPE ERROR] ${type.name}`)
    }
    return (
        <PathContext.Provider value={{
            path: name ? `${context.path}.${name}` : context.path,
        }}>
            {Component ?
                <Component
                    formdata={[
                        { "myname": "zzz", "age": 18 },
                        { "myname": "ttt", "age": 20 }
                    ]}
                >
                    {newChildren}
                </Component>
                : <>{newChildren}</>
            }
        </PathContext.Provider>
    )
}