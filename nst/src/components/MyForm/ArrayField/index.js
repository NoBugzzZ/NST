import React, { useContext } from "react"
import { PathContext, EventContext } from "../Context"
import ObjectField from "../ObejctField"
import Field from "../Field"
import useField from "../Hook/useField"

export default function ArrayField({ name, children, component: Component }) {
    const { path } = useContext(PathContext);
    const { event } = useContext(EventContext);
    const formdata=useField(event,`${path}.${name}`);
    // console.log({...children},{ObjectField,Field})
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
            path: name ? `${path}.${name}` : path,
        }}>
            {Component ?
                <Component
                    formdata={formdata}
                >
                    {newChildren}
                </Component>
                : <>{newChildren}</>
            }
        </PathContext.Provider>
    )
}