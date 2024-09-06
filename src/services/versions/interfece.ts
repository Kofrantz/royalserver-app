export interface GetVersionsResponse {
      versions: VersionData[]
}

export interface VersionData {
    id: string,
    type: string,
    url: string,
    time: string,
    releaseTime: string
}

