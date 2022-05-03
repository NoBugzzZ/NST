import StringWidget from "../StringWidget"
import './index.css'

export default function MatrixWidget(props = { matrix: [] }) {
  return (
    <table>
      <tbody>
        {props.matrix.map(function (row = [], rowIndex) {
          return (
            <tr
              key={rowIndex}
            >
              {row.map((cell, colIndex) => {
                return (
                  <td
                    key={colIndex}
                  >
                    {rowIndex === 0 || colIndex === 0
                      ? cell
                      : <StringWidget
                        formdata={cell}
                      />
                    }
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}