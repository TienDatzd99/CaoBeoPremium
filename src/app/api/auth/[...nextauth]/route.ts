import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
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
          if (!user || !user.password || !bcrypt.compareSync(credentials.password, user.password)) {
            throw new Error('Email hoặc mật khẩu không đúng');
          }
          return { 
            id: user._id.toString(), 
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role || 'user'
          };
        } catch (error) {
          console.error('Lỗi khi xác thực:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === 'google') {
        try {
          await connectMongo();
          
          // Kiểm tra xem user đã tồn tại chưa
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            // Tạo user mới với thông tin từ Google
            await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: 'google',
              providerId: user.id,
              emailVerified: new Date(),
              role: 'user'
            });
          }
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
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