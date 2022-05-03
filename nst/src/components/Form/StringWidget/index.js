import { useState } from "react"

export default function StringWidget(props) {
  const [value, setValue] = useState(props.formdata)
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    ></input>
  )
}