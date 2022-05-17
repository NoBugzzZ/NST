import { useContext, useEffect, useState } from "react"
import { PathContext } from "../Context";

export default function StringField({
  title,
  name,
  component: Component,
}) {
  const [formdata, setFormdata] = useState(null);
  // useEffect(() => {
  //   setFormdata(Math.random().toFixed(2))
  // }, [])

  const path = useContext(PathContext)
  // console.log(`${path}.${name}`)
  // console.log("[string]")
  return (
    <>
      {title ? title : null}
      <Component formdata={formdata} />
    </>
  )
}