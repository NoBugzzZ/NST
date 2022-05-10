import { useEffect, useState } from "react"

export default function StringField({
  title,
  name,
  ancient = "",
  component:Component,
}) {
  // console.log(`[string] ${ancient} ${name} ${title}`)

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