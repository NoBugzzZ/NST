import React, { useCallback, useContext } from "react"
import { PathContext, EventContext } from "../Context"
import ObjectField from "../ObejctField"
import Field from "../Field"
import useField from "../Hook/useField"

export default function ArrayField({ name, children, component: Component }) {
    const { path } = useContext(PathContext);
    const { event } = useContext(EventContext);
    const formdata=useField(event,`${path}.${name}`);
    // console.log({...children},{ObjectField,Field})
    // const addFormdata=useCallback(()=>{
    //     if(event){
    //         event.publish(`${path}.${name}`,value)
    //       }
    // },[])
    return (
        <PathContext.Provider value={{
            path: name ? `${path}.${name}` : path,
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