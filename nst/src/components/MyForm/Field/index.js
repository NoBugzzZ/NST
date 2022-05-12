import { useEffect, useState } from "react"

export default function Field({
  title,
  name,
  ancient = "",
  component:Component,
}) {
  const [formdata, setFormdata] = useState(null);
  useEffect(() => {
    setFormdata(Math.random().toFixed(2))
  }, [])
  return (
    <>
      {title ? title : null}
      <Component formdata={formdata}/>
    </>
  )
}