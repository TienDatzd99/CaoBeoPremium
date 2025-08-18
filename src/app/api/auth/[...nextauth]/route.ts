// app/api/auth/[...nextauth]/route.ts
import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectMongo();
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Thiếu email hoặc mật khẩu');
          }
          const user = await User.findOne({ email: credentials.email });
          if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
            throw new Error('Email hoặc mật khẩu không đúng');
          }
          return { id: user._id.toString(), email: user.email };
        } catch (error) {
          console.error('Lỗi khi xác thực:', error);
          throw new Error('Xác thực thất bại');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };