import React from "react"
import { useParams } from "react-router-dom"

export default function Form(){
    let params=useParams()
    return (
        <div>
            form+{params.formId}
        </div>
    )
}