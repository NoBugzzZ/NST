import { useContext } from "react"
import { PathContext } from "../../MyForm"
import './index.css'

export default function List({ children, formdata }) {
  console.log(children, formdata)
  const pathContext = useContext(PathContext);
  return (
    <div
      className="list"
    >
      {formdata ?
        formdata.map((_, i) => {
          return (
            <PathContext.Provider value={{
              path: `${pathContext.path}.[${i}]`
            }}
              key={i}
            >
              {children}
            </PathContext.Provider>
          )
        }) : null
      }
    </div>
  )
}