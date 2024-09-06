import axios from "axios";
import NextAuth, { RequestInternal, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            authorize: (credentials, req) => {
                if (credentials?.["username"] === "admin" && credentials.password === "1404") {
                    return {
                        id: "1",
                        name: "Franco Alfano",
                        email: "franco@gmail.com"
                    } as User
                }
                return null
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user
            }
            return token
        },
        session: ({ session, token }) => {
            if (token) {
                session.user = token.user
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
});