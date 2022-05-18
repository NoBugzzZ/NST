import React from "react"
// import { useParams } from "react-router-dom"
import { Paper, JSONSchemaForm, JSForm } from "../components"
// import { getForm, getFormdata } from "../requests"
// import { ObjectForm, MatrixForm, ArrayForm } from "../components/Form"
import { ObjectField, StringField, ArrayField, Field, MyForm } from "../components/MyForm"
import { StringInput, Card, Table,List } from "../components/FormComponents"

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

  // console.log(window)

  return (
    <Paper>
      <MyForm
        initialFormdata={{
          "firstname": "zz",
          "lastname": "t",
          "birthday": 1998,
          "detail": {
            "firstname": "zz",
            "lastname": "t",
            "birthday": 1998,
          },
          "table":[
            {"name":"t","age":24},
            {"name":"z","age":24},
          ],
          "list":[
            {"name":"t","age":24},
            {"name":"z","age":24},
          ]
        }}
        mapper={[
          {
            source: [".lastname", ".firstname"],
            target: [".name"],
            expression: (lastname, firstname) => `${lastname} ${firstname}`
          },
          {
            source: [".birthday"],
            target: [".age"],
            expression: (birthday) => new Date().getFullYear() - birthday
          },
          {
            source: [".detail.lastname", ".detail.firstname"],
            target: [".detail.name"],
            expression: (lastname, firstname) => `${lastname} ${firstname}`
          },
          {
            source: [".detail.birthday"],
            target: [".detail.age"],
            expression: (birthday) => new Date().getFullYear() - birthday
          }
        ]}
      >
        <ObjectField
          component={Card}
        >
          <Field
            name="firstname"
            title="firstname"
            component={StringInput}
          />
          <Field
            name="lastname"
            title="lastname"
            component={StringInput}
          />
          <Field
            name="name"
            title="name"
            component={StringInput}
          />
          <Field
            name="birthday"
            title="birthday"
            component={StringInput}
          />
          <Field
            name="age"
            title="age"
            component={StringInput}
          />
          <ObjectField
            name="detail"
            component={Card}
          >
            <Field
              name="firstname"
              title="firstname"
              component={StringInput}
            />
            <Field
              name="lastname"
              title="lastname"
              component={StringInput}
            />
            <Field
              name="name"
              title="name"
              component={StringInput}
            />
            <Field
              name="birthday"
              title="birthday"
              component={StringInput}
            />
            <Field
              name="age"
              title="age"
              component={StringInput}
            />
          </ObjectField>
          <ArrayField
            component={Table}
            name="table"
          >
            <ObjectField>
              <Field
                name="name"
                component={StringInput}
              />
              <Field
                name="age"
                component={StringInput}
              />
            </ObjectField>
          </ArrayField>
          <ArrayField
            component={List}
            name="list"
          >
            <ObjectField>
              <Field
                name="name"
                component={StringInput}
              />
              <Field
                name="age"
                component={StringInput}
              />
            </ObjectField>
          </ArrayField>
        </ObjectField>
      </MyForm>
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