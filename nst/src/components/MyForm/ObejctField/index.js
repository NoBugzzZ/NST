import React, { useContext, useEffect, useState } from "react"
import PathContext from "../Context"

export default function ObjectField({ name, children, component: Component }) {
    const path = useContext(PathContext);
    // console.log("[object]")
    return (
        <PathContext.Provider value={name ? `${path}.${name}` : path}>
            {Component
                ? (
                    <Component>
                        {children}
                    </Component>
                )
                :<>{ children }</>
            }
        </PathContext.Provider>
    )
}