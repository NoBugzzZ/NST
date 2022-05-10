export default function StringInput(props){
    return(
        <input defaultValue={props.formdata?props.formdata:""}></input>
    )
}