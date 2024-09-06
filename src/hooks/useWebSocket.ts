import SocketEvent from '@/utils/events';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { LogData } from '../context/serverContext/interfaces';

const useWebSocket = (url: string) => {
    const [logs, setLogs] = useState<LogData[]>([]);
    const [ws, setWs] = useState<Socket | null>(null);
    // const [serverStatus, setServerStatus] = useState<ServerStatus>(ServerStatus.GETTING_STATUS);

    const sendCommand = (command: string) => {
        if (!ws) {
            console.error('ws not found on send command')
        }
        ws?.emit(SocketEvent.EXECUTE_COMMAND, command);
    }

    // Para iniciar el servidor
    const startServer = () => {
        if (!ws) {
            console.error('ws not found on start server')
        }
        ws?.emit(SocketEvent.START_SERVER);
    }

    // Para detener el servidor
    const stopServer = () => {
        console.log("STOOOOOOOOOOP");
        if (!ws) {
            console.error('ws not found on stop server')
        }
        ws?.emit(SocketEvent.STOP_SERVER);
    }

    const onLog = (cb: (log: string) => void) => {
        ws?.on(SocketEvent.SERVER_LOG, (log) => {
            cb(log);
        });
    }

    return { 
        logs, 
        sendCommand, 
        startServer, 
        stopServer, 
        onLog, 
        // serverStatus, 
        // setServerStatus, 
        // ServerStatus 
    };
};

export default useWebSocket;
