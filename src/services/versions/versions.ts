import axios from "axios"
import { GetVersionsResponse } from "./interfece";

export const getVersions = async (): Promise<GetVersionsResponse | undefined> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/versions`)
        return response.data
    } catch (err) {
        console.log(err);
    }
    return
}