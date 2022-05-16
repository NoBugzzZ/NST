import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Paper, JSONSchemaForm, JSForm } from "../components"
import { getForm, getFormdata } from "../requests"
import { ObjectForm, MatrixForm, ArrayForm } from "../components/Form"
import { ObjectField, StringField, ArrayField, Field } from "../components/MyForm"
import { StringInput, Card, Table } from "../components/FormComponents"

export default function Form() {
  // const [data, setData] = useState(null);
  // let params = useParams();
  // useEffect(() => {
  //   // console.log(`form/${params.formId}`)
  //   getForm(params.formId).then((schema) => {
  //     getFormdata(params.formId).then(formdata => {
  //       setData({
  //         schema: schema.schema,
  //         uischema: schema.uischema,
  //         formdata
  //       });
  //     }).catch(e => {
  //       // console.log(e);
  //       setData({
  //         schema: schema.schema,
  //         uischema: schema.uischema,
  //       });
  //     })

  //   })
  // }, [params])
  // console.log("render")

  console.log(window)

  return (
    <Paper>
      <ObjectField
        component={Card}
      >
        <Field
          name="myname"
          title="name"
          component={StringInput}
        />
        <Field
          name="age"
          title="age"
          component={StringInput}
        />
        <ObjectField
          name="location"
          component={Card}
        >
          <Field
            name="latitude"
            title="latitude"
            component={StringInput}
          />
          <Field
            name="longitute"
            title="longitute"
            component={StringInput}
          />
        </ObjectField>
      </ObjectField>

      <ArrayField
        component={Table}
      >
        <ObjectField>
          <Field
            name="myname"
            component={StringInput}
          />
          <Field
            name="age"
            component={StringInput}
          />
        </ObjectField>
      </ArrayField>
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

      {/* <ObjectForm
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
      <hr />
      <ArrayForm
        schema={{
          "type": "array",
          "items": {
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
          }
        }}
        formdata={[
          { lastname: "z", firstname: "t", name: "tz" },
          { lastname: "z", firstname: "t", name: "tz" },
        ]}
      />
      <hr />
      <MatrixForm
        formdata={[
          ["", "col1", "col2", "col3"],
          ["row1", "1-1", "1-2", "1-3"],
          ["row2", "2-1", "2-2", "2-3"],
        ]}
      /> */}
    </Paper>
  )
}