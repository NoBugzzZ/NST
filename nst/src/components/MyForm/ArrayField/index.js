import React, { useContext } from "react"
import PathContext from "../Context"
import ObjectField from "../ObejctField"

export default function ArrayField({ name, children, component: Component }) {
    const path = useContext(PathContext)
    console.log("[array]",children)
    const {type}=children;
    if(type===ObjectField){
        console.log("ObjectField")
    }
    return (
        <Component>
            <PathContext.Provider value={name ? `${path}.${name}` : path}>
                { children }
            </PathContext.Provider>
        </Component>
    )
}