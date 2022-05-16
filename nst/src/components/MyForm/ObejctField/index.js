import React, { useContext } from "react"
import PathContext from "../Context"

export default function ObjectField({ name, children, component: Component }) {
    const context = useContext(PathContext);
    // console.log("[object]",children )
    return (
        <PathContext.Provider value={{
            path: name ? `${context.path}.${name}` : context.path,
        }}>
            {Component
                ? (
                    <Component>
                        {children}
                    </Component>
                )
                : <>{children}</>
            }
        </PathContext.Provider>
    )
}