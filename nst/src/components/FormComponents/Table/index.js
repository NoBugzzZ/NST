import React, { useContext } from "react"
import './index.css'
import { PathContext } from "../../MyForm";

export default function Table({ children, formdata = [] }) {
  // console.log(children, formdata)
  const pathContext = useContext(PathContext);
  const newChildren = React.Children
    .toArray(children);
  const getHead = () => {
    const res = newChildren
      .map((child, index) => (
        <th
          key={index}
        >
          {child?.props?.name}
        </th>
      )
      );
    return <tr>{res}</tr>;
  }
  const getBody = () => {
    const res = formdata.map((_, i) => {
      return (
        <PathContext.Provider value={{
          path: `${pathContext.path}.[${i}]`
        }}
          key={i}
        >
          <tr>
            {
              newChildren.map((child, index) => (
                <td
                  key={index}
                >
                  {child}
                </td>
              ))
            }
          </tr>
        </PathContext.Provider>
      )
    });
    return res;
  }
  return (
    <table
      className="table"
    >
      <thead>
        {getHead()}
      </thead>
      <tbody>
        {getBody()}
      </tbody>
    </table>

  )
}