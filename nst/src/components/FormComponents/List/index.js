import { useContext } from "react"
import { PathContext } from "../../MyForm"

export default function List({ children, formdata }) {
  console.log(children, formdata)
  const pathContext=useContext(PathContext);
  return (
    <>
      {formdata?
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
        }):null
      }
    </>
  )
}