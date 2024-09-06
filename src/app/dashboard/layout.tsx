'use client'
import ServerProvider from "@/context/serverContext/server.component";
import NavBar from "../../components/sideBar/navBar";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <ServerProvider>
            <NavBar/>
            {children}
        </ServerProvider>
    )
}