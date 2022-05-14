import React from "react";
import './index.css'

export default function Card({ children }) {
  // console.log(children, React.Children.toArray(children))
  return (
    <div
      className="card"
    >
      {React.Children.toArray(children).map((child, index) => (
        <div
          className="card-item"
          key={index}
        >
          {child}
        </div>
      ))}
    </div>
  )
}