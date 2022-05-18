import { useEffect,useState } from "react";

export default function useField(event, path) {
  const [formdata, setFormdata] = useState();
  useEffect(() => {
    if (event) {
      setFormdata(event.getData(path));
      function callback(value) {
        setFormdata(value);
      }
      event.subscribe([path], callback)
      return () => {
        event.unsubscribe([path], callback)
      }
    }
  }, [event])
  return formdata;
}