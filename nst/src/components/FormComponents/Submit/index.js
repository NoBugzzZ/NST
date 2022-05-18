import './index.css'

export default function Submit({onClick}){
  return(
    <button
      className='submit'
      onClick={()=>{
        onClick();
      }}
    >submit</button>
  )
}