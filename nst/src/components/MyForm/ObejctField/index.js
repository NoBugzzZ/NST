import React, { useEffect, useState } from "react"

export default function ObjectField({ ancient = "", name="", children }) {
    console.log(`[object] ${ancient} ${name}`)
    return (
        <>
            {React.Children.map(children, child => {
                return React.cloneElement(child, {
                    ancient: `${ancient}.${name}`
                })
            })}
        </>
    )
}