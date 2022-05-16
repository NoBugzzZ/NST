import { useContext } from "react"
import PathContext from "../Context";
import './index.css'

export default function Field({
  title,
  name,
  component: Component,

}) {
  const context = useContext(PathContext)
  console.log(`field ${context.path}.${name}`)
  return (
    <>
      {title ? (
        <span
          className="field-title"
        >{title}</span>
      )
        : null}
      <Component formdata={null} />
    </>
  )
}