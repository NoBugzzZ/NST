import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Paper, JSONSchemaForm, JSForm } from "../components"
import { getForm, getFormdata } from "../requests"
import { ObjectForm, MatrixForm, ArrayForm } from "../components/Form"

export default function Form() {
  const [data, setData] = useState(null);
  let params = useParams();
  useEffect(() => {
    console.log(`form/${params.formId}`)
    getForm(params.formId).then((schema) => {
      getFormdata(params.formId).then(formdata => {
        setData({
          schema: schema.schema,
          uischema: schema.uischema,
          formdata
        });
      }).catch(e => {
        console.log(e);
        setData({
          schema: schema.schema,
          uischema: schema.uischema,
        });
      })

    })
  }, [params])

  return (
    <Paper>
      {/* {JSON.stringify(schema)} */}
      {/* <JSONSchemaForm
        schema={data?.schema}
        uischema={data?.uischema}
        formdata={data?.formdata}
      /> */}

      {/* <JSForm
        schema={data?.schema}
        uischema={data?.uischema}
        formdata={data?.formdata}
      /> */}

      <ObjectForm
        schema={{
          "type": "object",
          "properties": {
            "lastname": {
              "type": "string"
            },
            "firstname": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        }}
      >
      </ObjectForm>
      <hr/>
      <ArrayForm
      schema={{
        "type":"array",
        "items":{
          "type":"object",
          "properties":{
            "lastname": {
              "type": "string"
            },
            "firstname": {
              "type": "string"
            },
            "name": {
              "type": "string"
            }
          }
        }
      }}
      formdata={[
        {lastname:"z",firstname:"t",name:"tz"},
        {lastname:"z",firstname:"t",name:"tz"},
      ]}
      />
      <hr />
      <MatrixForm
        formdata={[
          ["", "col1", "col2", "col3"],
          ["row1", "1-1", "1-2", "1-3"],
          ["row2", "2-1", "2-2", "2-3"],
        ]}
      />
    </Paper>
  )
}