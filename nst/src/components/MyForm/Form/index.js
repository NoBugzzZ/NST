import { PathContext, EventContext } from "../Context";
import useForm from "../Hook/useForm";
import { Submit } from "../../FormComponents";

export default function MyForm({ children, initialFormdata, mapper = [] }) {

    const event = useForm(mapper, initialFormdata);
    // console.log(initialFormdata, mapper, event);
    return (
        <>
            {event
                ? <EventContext.Provider value={{ event }}>
                    <PathContext.Provider value={{ path: "" }}>
                        {children}
                    </PathContext.Provider>
                </EventContext.Provider>
                : <PathContext.Provider value={{ path: "" }}>
                    {children}
                </PathContext.Provider>
            }
            <Submit
                onClick={() => {
                    if (event) {
                        alert(JSON.stringify(event.getData(""), null, 2))
                    }
                }}
            />
        </>
    )
}