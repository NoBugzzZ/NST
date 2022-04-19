import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Paper, JSONSchemaForm } from "../components"
import { getForm, getFormdata } from "../requests"

export default function Form() {
  const [data, setData] = useState(null);
  let params = useParams();
  useEffect(() => {
    console.log(`form/${params.formId}`)
    getForm(params.formId).then((schema) => {
      getFormdata(params.formId).then(formdata => {
        setData({
          schema:schema.schema,
          uischema:schema.uischema,
          formdata
        });
      }).catch(e=>{
        console.log(e);
        setData({
          schema:schema.schema,
          uischema:schema.uischema,
        });
      })

    })
  }, [params])
  return (
    <Paper>
      {/* {JSON.stringify(schema)} */}
      <JSONSchemaForm
        schema={data?.schema}
        uischema={data?.uischema}
        formdata={data?.formdata} />
    </Paper>
  )
}