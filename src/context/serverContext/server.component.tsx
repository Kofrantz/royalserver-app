import { LogData } from "./interfaces";
import { ServerContext } from "./server.context";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ServerStatus } from "./interfaces";
import SocketEvent from "@/utils/events";

type Props = {
    children?: React.ReactNode;
};

const ServerProvider: React.FC<Props> = (props) => {
    const [logs, setLogs] = useState<LogData[]>([])
    const [serverId, setServerId] = useState<string>('')
    const [ws, setWs] = useState<Socket | null>(null);
    const [serverStatus, setServerStatus] = useState<ServerStatus>(ServerStatus.GETTING_STATUS);

    useEffect(() => {
        const socket = io('http://localhost:3001');
        setWs(socket)

        if (serverId) connectToServer(serverId)

        // Limpiar la conexión al desmontar el componente
        return () => {
            socket.off('response');
        };
    }, []);

    const connectToServer = (id: string) => {
        if (ws) {
            ws.emit(SocketEvent.CONNECT_TO_SERVER, id)
            
            ws.on(SocketEvent.LOGS, (logs: LogData[]) => {
                console.log(SocketEvent.LOGS, logs);
                setLogs(logs.reverse())
            });
    
            ws.on(SocketEvent.SERVER_LOG, (log: LogData) => {
                console.log(SocketEvent.SERVER_LOG, log);
                setLogs(prev => [log, ...prev])
            });
        }

    }

    return (
        <ServerContext.Provider
            value={{
                logs,
                serverStatus,
            }}
        >
            {props.children}
        </ServerContext.Provider>
    )
}

export default ServerProvider