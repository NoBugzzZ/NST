export default function NumberInput({ formdata, onChange = () => { } }) {
    return (
        <input
            type="number"
            value={formdata ? formdata : ""}
            onChange={(e) => {
                onChange(e.target.value)
            }}
        ></input>
    )
}