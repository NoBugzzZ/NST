import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Paper, JSONSchemaForm } from "../components"
import { getForm, getFormdata } from "../requests"

export default function Form() {
  const [schema, setSchema] = useState(null);
  const [formdata, setFormdata] = useState(null);
  let params = useParams();
  useEffect(() => {
    console.log(`form/${params.formId}`)
    getForm(params.formId).then(data => {
      getFormdata(params.formId).then(formdata => {
        setSchema(data);
        setFormdata(formdata);
      })

    })
  }, [params])
  return (
    <Paper>
      {/* {JSON.stringify(schema)} */}
      <JSONSchemaForm schema={schema} formdata={formdata}/>
    </Paper>
  )
}