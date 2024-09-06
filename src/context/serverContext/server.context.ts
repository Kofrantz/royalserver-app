import { LogData, ServerContextInterface, ServerStatus } from "./interfaces";
import { createContext, useContext } from "react";

export const ServerContext = createContext<ServerContextInterface>({
    // default states
    logs: [],
    serverStatus: ServerStatus.GETTING_STATUS,
    // default functions
    // setLogs: () => {
    //     /* Nothing to do*/
    // },
})

export const useServerContext = (): ServerContextInterface => {
    const store = useContext(ServerContext);
    return store;
};