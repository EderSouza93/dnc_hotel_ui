import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/api";
import { decodeJwt } from "jose";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'E-mail', type: 'email' },
                password: { label: 'Senha', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials) throw new Error("no credentials");

                const { data } = await axios.post("/auth/login", {
                    email: credentials?.email,
                    password: credentials?.password,
                });

                const accessToken = data.access_token;

                const { sub: id } = decodeJwt(accessToken)
                if (!id) throw new Error("token sem sub");

                const { data: user } = await axios.get(`/users/${id}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                return {
                    ...user,
                    accessToken,
                    image: user.avatar,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) return {...token, ...user};
            return token
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
    pages: { signIn: '/login' },

    session: { strategy: "jwt"},
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }