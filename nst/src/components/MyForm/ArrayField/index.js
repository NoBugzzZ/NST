import React, { useCallback, useContext } from "react"
import { PathContext, EventContext } from "../Context"
import ObjectField from "../ObejctField"
import Field from "../Field"
import useField from "../Hook/useField"

export default function ArrayField({ name, children, component: Component }) {
    const { path } = useContext(PathContext);
    const { event } = useContext(EventContext);
    const newPath = name ? `${path}.${name}` : path;
    const formdata = useField(event, newPath);
    return (
        <PathContext.Provider value={{
            path: newPath
        }}>
            {Component ?
                <Component
                    formdata={formdata}
                >
                    {children}
                </Component>
                : <>{children}</>
            }
        </PathContext.Provider>
    )
}