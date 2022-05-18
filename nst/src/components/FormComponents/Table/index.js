import React, { useContext } from "react"
import './index.css'
import { PathContext } from "../../MyForm";
import { ObjectField, Field, ArrayField } from "../../MyForm";

export default function Table({ children, formdata = [] }) {
  // console.log(children, formdata)
  const pathContext = useContext(PathContext);

  const { type } = children;
  let newChildren = null;
  if (type === ObjectField) {
    newChildren = children.props.children;
  } else if (type === Field || type === ArrayField) {
    newChildren = children;
  } else {
    throw new Error(`[TYPE ERROR] ${type.name}`)
  }
  const getHead = () => {
    const res = React.Children.toArray(newChildren)
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
              React.Children.toArray(newChildren).map((child, index) => (
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