import React, { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
import { Paper, JSONSchemaForm, JSForm } from "../components"
// import { getForm, getFormdata } from "../requests"
// import { ObjectForm, MatrixForm, ArrayForm } from "../components/Form"
import { ObjectField, StringField, ArrayField, Field, MyForm } from "../components/MyForm"
import { StringInput, Card, Table, List, NumberInput } from "../components/FormComponents"
import ReactDataSheet, { Sheet } from '../components/react-datasheet/src/index.js';
// Be sure to include styles at some point, probably during your bootstrapping
import '../components/react-datasheet/src/react-datasheet.css';
import { constructSchemaWithUI, constructSchemaWithAuth, constructGrid, reduceDimension } from "../Transform/utils";

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
  const CELL_OPTION = { width: "100px" }
  const [grid, setGrid] = useState([
    [{ value: 1, ...CELL_OPTION }, { value: 3, ...CELL_OPTION }],
    [{ value: 2, ...CELL_OPTION }, { value: 4, ...CELL_OPTION }],
  ])

  const [table, setTable] = useState([]);

  useEffect(() => {
    setGrid(grid)

    const formdata = {
      "name": "tz",
      "age": "24",
      "password": "123456"
    }

    const schema = {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "age": {
          "type": "number"
        },
        "password": {
          "type": "string"
        }
      }
    }
    const uischema = {
      "name": {
        "ui:location": {
          "row": 1,
          "col": 1,
        }
      },
      "age": {
        "ui:location": {
          "row": 1,
          "col": 2,
        }
      },
      "password": {
        "ui:location": {
          "row": 1,
          "col": 3,
        }
      }
    }

    const authentication = {

      "tz": {
        "name": "rw",
        "age": "r-",
        "password": "--"
      },
      "zz": {
        "name": "rw",
        "age": "rw",
        "password": "r-"
      }
    }

    const schemaWithUi = constructSchemaWithUI(schema, uischema)
    const schemaWithAuth = constructSchemaWithAuth(schemaWithUi, authentication["tz"]);
    console.log(schemaWithAuth);
    const g = constructGrid(schemaWithAuth, formdata);
    console.log(g);
    setGrid(g);


    const highDimension = {
      "2022": {
        "1-1": {
          "南京": 236.6,
          "无锡": 133.9,
          "徐州": 49.1
        },
        "1-2": {
          "南京": 236.1,
          "无锡": 116.0,
          "徐州": 40.1
        }
      },
      "2021": {
        "1-1": {
          "南京": 237.1,
          "无锡": 136.9,
          "徐州": 0
        },
        "1-2": {
          "南京": 237.1,
          "无锡": 127.9,
          "徐州": 0
        }
      }
    }

    const reducedData = reduceDimension(highDimension, 3);
    const reducedDataGrid = reducedData.map(row => {
      return row.map(d => ({ value: d, ...CELL_OPTION }))
    })
    console.log(reducedDataGrid)
    setTable(reducedDataGrid)
  }, [])

  return (
    <Paper>

      <ReactDataSheet
        data={grid}
        valueRenderer={cell => cell.value}
        onCellsChanged={changes => {
          setGrid(prevGrid => {
            const nextGrid = prevGrid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              nextGrid[row][col] = { ...nextGrid[row][col], value };
            })
            return nextGrid;
          })
        }}
      />
      <hr/>
      <ReactDataSheet
        data={table}
        valueRenderer={cell => cell.value}
        onCellsChanged={changes => {
          setTable(prevGrid => {
            const nextGrid = prevGrid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              nextGrid[row][col] = { ...nextGrid[row][col], value };
            })
            return nextGrid;
          })
        }}
      />
      {/* <MyForm
        initialFormdata={{
          "firstname": "zz",
          "lastname": "t",
          "birthday": 1998,
          "detail": {
            "firstname": "zz",
            "lastname": "t",
            "birthday": 1998,
          },
          "table": [
            { "name": "t", "age": 24, "detail": { "name": "zz", "age": 11, "table": [{ "name": "zz", "age": 11 }] } },
            { "name": "t", "age": 24, "detail": { "name": "zz", "age": 11, "table": [{ "name": "zz", "age": 11 }] } },
          ],
          "list": [
            { "name": "t", "age": 24, "detail": { "name": "zz", "age": 11 } },
            { "name": "t", "age": 24, "detail": { "name": "zz", "age": 11 } },
          ],
          "table1": [
            [{ "name": "t", "age": 24 }],
            [{ "name": "t", "age": 24 }]
          ],
          "list1": [
            [{ "name": "t", "age": 24 }],
            [{ "name": "t", "age": 24 }]
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
            component={NumberInput}
          />
          <Field
            name="age"
            title="age"
            component={NumberInput}
          />


          <ObjectField
            name="detail"
            component={Card}
          >
            <Field
              name="name"
              title="name"
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
              <ObjectField
                component={Card}
                name="detail"
              >
                <Field
                  name="name"
                  title="name"
                  component={StringInput}
                />
                <Field
                  name="age"
                  title="age"
                  component={StringInput}
                />
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
              </ObjectField>
            </ObjectField>
          </ArrayField>

          <ArrayField
            component={Table}
            name="table1"
          >
            <ArrayField
              component={Table}
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
          </ArrayField>

          <ArrayField
            component={List}
            name="list"
          >
            <ObjectField
              component={Card}
            >
              <Field
                name="name"
                title="name"
                component={StringInput}
              />
              <Field
                name="age"
                title="age"
                component={StringInput}
              />
              <ObjectField
                component={Card}
                name="detail"
              >
                <Field
                  name="name"
                  title="name"
                  component={StringInput}
                />
                <Field
                  name="age"
                  title="age"
                  component={StringInput}
                />
              </ObjectField>
            </ObjectField>
          </ArrayField>

          <ArrayField
            component={List}
            name="list1"
          >
            <ArrayField
              component={List}
            >
              <ObjectField
                component={Card}
              >
                <Field
                  name="name"
                  title="name"
                  component={StringInput}
                />
                <Field
                  name="age"
                  title="age"
                  component={StringInput}
                />
              </ObjectField>
            </ArrayField>
          </ArrayField>

        </ObjectField>
      </MyForm> */}
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