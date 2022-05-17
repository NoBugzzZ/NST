import { useEffect, useState } from "react";
import MyEvent from "../../../Mapper";

export default function useForm(mapper=[],initialFormdata){
    const [event,setEvent]=useState();
    useEffect(()=>{
        const e=new MyEvent(mapper,initialFormdata);
        setEvent(e);
    },[initialFormdata,mapper])

    return event;
}