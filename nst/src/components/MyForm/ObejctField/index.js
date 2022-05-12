import React, { useEffect, useState } from "react"

export default function ObjectField({ ancient = "", name="", children }) {
    console.log(`[object] ${ancient} ${name}`)
    const Context=React.createContext({msg:"11"})
    return (
        <Context.Provider value={{msg:"aa"}}>
            {children}
        </Context.Provider>
    )
}