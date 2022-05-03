import StringWidget from '../StringWidget'
import './index.css'

export default function ArrayWidget(props) {
  console.log(props)
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(props.schema.items.properties).map((element) => {
            return (
              <th
                key={element}
              >
                {element}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {props.formdata.map((row, index) => {
          return (
            <tr
              key={Math.random()}
            >
              {Object.keys(props.schema.items.properties).map((key) => {
                return (
                  <td
                    key={key}
                  >
                    <StringWidget
                      formdata={row[key]}
                    ></StringWidget>
                  </td>
                )
              })}
              <td>
                <button
                onClick={()=>{
                  props.deleteFormdata(index)
                }}
                >delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}