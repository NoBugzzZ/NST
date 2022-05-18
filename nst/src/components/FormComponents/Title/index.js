import React from 'react'
import './index.css'

const Title=React.memo(function({ title }) {
  return (
    <>
      {title ? (
        <span
          className="field-title"
        >{title}</span>
      )
        : null}
    </>
  )
})

export default Title;