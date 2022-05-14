import React from "react"

export default function Table({ children }) {
  console.log(children)
  const getHead = () => {
    const res = React.Children
      .toArray(children)
      .map((child, index) => {
        return (
          <div
            key={index}
          >
            {child?.props?.name}
          </div>
        )
      });
    return res;
  }


  return (
    <div>
      {getHead()}
    </div>
  )
}