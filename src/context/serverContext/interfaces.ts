import { Socket } from "socket.io-client";

export interface LogData {
    msg: string
    type: LogType
}

export enum LogType {
    MESSAGE = 'MESSAGE',
    ERROR = 'ERROR',
    CLOSE = 'CLOSE',
}

export enum ServerStatus {
    GETTING_STATUS = 'Getting Status...',
    LOADING = 'Loading...',
    STOPPING = 'Stopping...',
    RUNNING = 'Running',
    STOPPED = 'Stopped',
    FAILED = 'Failed',
    NOT_FOUND = 'Not Found',
}

export interface ServerContextInterface {
    logs: LogData[];
    serverStatus: ServerStatus;
    // setLogs: React.Dispatch<React.SetStateAction<LogData[]>>;
    // ws: Socket | null;
    // wsLogs: React.Dispatch<React.SetStateAction<Socket | null>>;
}