import { NextApiRequest, NextApiResponse } from "next";

export interface HandleMethodRequest {
    GET?: (() => ResponseData | void) | (() => Promise<ResponseData | void>)
    POST?: (() => ResponseData | void) | (() => Promise<ResponseData | void>)
    PUT?: (() => ResponseData | void) | (() => Promise<ResponseData | void>)
    DELETE?: (() => ResponseData | void) | (() => Promise<ResponseData | void>)
} 

export interface ResponseData {
    status: number,
    json: any
}

export const statusOk = (msg: string): ResponseData => {
    return {
        status: 200,
        json: {
            message: msg
        }
    }
}

export const statusAccepted = (msg: string): ResponseData => {
    return {
        status: 202,
        json: {
            message: msg
        }
    }
}

export const sendJSON = (json: any): ResponseData => {
    return {
        status: 200,
        json
    }
}

export const internalServerError = (msg: string, err: Error | unknown): ResponseData => {
    return {
        status: 500,
        json: {
            msg: msg,
            error: err
        }
    }
}

export const badRequestError = (msg: string, err: Error | unknown): ResponseData => {
    return {
        status: 400,
        json: {
            msg: msg,
            error: err
        }
    }
}

export const notFoundError = (msg: string, err: Error | unknown): ResponseData => {
    return {
        status: 404,
        json: {
            msg: msg,
            error: err
        }
    }
}

export const methodNotAllowedError = (msg: string, err: Error | unknown): ResponseData => {
    return {
        status: 405,
        json: {
            msg: msg,
            error: err
        }
    }
}

