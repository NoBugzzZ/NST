export default function StringInput({ formdata }) {
    return (
        <input defaultValue={formdata ? formdata : ""}></input>
    )
}