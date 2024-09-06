import { NextApiRequest, NextApiResponse } from "next";
import { HandleMethodRequest, methodNotAllowedError, ResponseData } from "./interfaces";

export const handleMethod = async (req: NextApiRequest, res: NextApiResponse, handleMethodRequest: HandleMethodRequest) => {
    const handler: [string, () => ResponseData] | undefined = Object.entries(handleMethodRequest).find(([method, _]: [string, () => ResponseData]) => method === req.method)
    let response = methodNotAllowedError("Method not allowed", new Error("405"))
    if (handler) {
        response = await handler[1]()
        if (!response) return
    } 
    return res.status(response.status).json(response.json)
}