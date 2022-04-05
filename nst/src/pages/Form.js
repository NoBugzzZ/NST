import React from "react"
import { useParams } from "react-router-dom"
import { Paper, JSONSchemaForm } from "../components"

const schema = `{
    "type":"object",
    "title":"测试Object",
    "properties":{
      "name":{
        "type":"string",
        "title":"名字",
        "component":"StringInputWidget"
      },
      "department":{
        "type":"string",
        "title":"院系",
        "component":"StringInputWidget"
      },
      "test":{
        "type":"object",
        "title":"测试Object",
        "properties":{
          "name":{
            "type":"string",
            "title":"名字",
            "component":"StringInputWidget"
          },
          "department":{
            "type":"string",
            "title":"院系",
            "component":"StringInputWidget"
          }
          
        }
      }
    }
  }`

export default function Form() {
    let params = useParams()
    console.log(`form/${params.formId}`)
    return (
        <Paper>
            <JSONSchemaForm schema={JSON.parse(schema)} formdata={{}} />
        </Paper>
    )
}