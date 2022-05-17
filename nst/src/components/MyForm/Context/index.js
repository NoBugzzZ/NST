import { createContext } from "react";
const PathContext = createContext({ path: "" });
const EventContext = createContext({ event: null });

export {
    PathContext,
    EventContext,
};