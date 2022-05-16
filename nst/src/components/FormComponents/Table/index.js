import React from "react"
import './index.css'

export default function Table({ children, formdata = [] }) {
  // console.log(children, formdata)
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
    const res = formdata.map((d,i) => {
      return (
        <tr
          key={i}
        >
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