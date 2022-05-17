import { useContext, useEffect, useState } from "react"
import { PathContext, EventContext } from "../Context";
import './index.css'

export default function Field({
  title,
  name,
  component: Component,
  type,
}) {
  const { path } = useContext(PathContext);
  const { event } = useContext(EventContext);
  const [formdata, setFormdata] = useState();
  useEffect(() => {
    // console.log(event)
    if (event) {
      // console.log(`${path}.${name}`,event,event.formdata)
      setFormdata(event.getData(`${path}.${name}`));
      function callback(value) {
        console.log(`[${path}.${name}] `, value)
        setFormdata(value);
      }
      event.subscribe([`${path}.${name}`], callback)
      return () => {
        event.unsubscribe([`${path}.${name}`], callback)
      }
    }
  }, [event])
  // console.log(`[${path}.${name}] ${formdata}`)
  return (
    <>
      {title ? (
        <span
          className="field-title"
        >{title}</span>
      )
        : null}
      <Component
        formdata={formdata}
        type={type}
        onChange={(value) => {
          if(event){
            event.publish(`${path}.${name}`,value)
          }
        }} />
    </>
  )
}