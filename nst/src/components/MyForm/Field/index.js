import { useContext, useEffect, useState } from "react"
import { PathContext, EventContext } from "../Context";
import useField from "../Hook/useField";
import { Title } from "../../FormComponents";

export default function Field({
  title,
  name,
  component: Component,
  type,
}) {
  const { path } = useContext(PathContext);
  const { event } = useContext(EventContext);
  // const [formdata, setFormdata] = useState();
  // useEffect(() => {
  //   // console.log(event)
  //   if (event) {
  //     // console.log(`${path}.${name}`,event,event.formdata)
  //     setFormdata(event.getData(`${path}.${name}`));
  //     function callback(value) {
  //       console.log(`[${path}.${name}] `, value)
  //       setFormdata(value);
  //     }
  //     event.subscribe([`${path}.${name}`], callback)
  //     return () => {
  //       event.unsubscribe([`${path}.${name}`], callback)
  //     }
  //   }
  // }, [event])
  const formdata=useField(event,`${path}.${name}`);
  // console.log(`[${path}.${name}] ${formdata}`)
  // console.log(`${path}.${name}`,formdata)
  return (
    <>
      <Title title={title}/>
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