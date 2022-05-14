import { useContext, useEffect, useState } from "react"
import PathContext from "../Context";
import './index.css'

export default function Field({
  title,
  name,
  component: Component,
}) {
  const [formdata, setFormdata] = useState(null);
  // useEffect(() => {
  //   setFormdata(Math.random().toFixed(2))
  // }, [])

  const path = useContext(PathContext)
  console.log(`${path}.${name}`)
  // console.log("[string]")
  return (
    <>
      {title ? (
        <span
          className="field-title"
        >{title}</span>
      )
        : null}
      <Component formdata={formdata} />
    </>
  )
}