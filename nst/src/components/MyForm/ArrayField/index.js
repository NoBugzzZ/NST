import React from "react"

export default function ArrayField({ ancient = "", name="",children }) {
    console.log(children)
    return (
        <>
            {React.Children.map(children,child=>{
                // console.log(child.props)
                return React.cloneElement(child,{
                    ancient:`${ancient}.${name}`
                })
            })}
        </>
    )
}