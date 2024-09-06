import type { NextApiRequest, NextApiResponse } from 'next';
import { handleMethod } from '@/utils/handleMethod';
import { internalServerError, ResponseData, sendJSON, statusOk } from '@/utils/interfaces';
import { execCommand } from '@/utils/execCommand';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await handleMethod(req, res, {
    GET: async () => {
      try {
        const response = await execCommand('docker inspect minecraft-server')
        const info : any = JSON.parse(response.stdout)[0]
        return sendJSON({ status: info?.State.Running ? "Running" : "Stopped" });
      } catch(error) {
        return internalServerError("Error checking server status", error);
      }
    }
  })
}