export default function StringInput({ formdata,onChange=()=>{} }) {
    return (
        <input
            value={formdata ? formdata : ""}
            onChange={(e)=>{
                onChange(e.target.value)
            }}
        ></input>
    )
}