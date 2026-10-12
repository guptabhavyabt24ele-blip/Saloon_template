import { compare } from 'bcryptjs';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const configuredPassword = process.env.ADMIN_PASSWORD;

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || !password || !configuredEmail || !configuredPassword || email !== configuredEmail) {
          return null;
        }

        const validPassword = configuredPassword.startsWith('$2')
          ? await compare(password, configuredPassword)
          : password === configuredPassword;

        if (!validPassword) {
          return null;
        }

        return { id: email, email, name: 'Salon Owner', role: 'SALON_OWNER' };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? 'SALON_OWNER';
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id ?? '';
        session.user.role = (token.role as string | undefined) ?? 'SALON_OWNER';
      }
      return session;
    }
  }
};

export async function getAuthSession() {
  return getServerSession(authOptions);
}

export async function requireAdminSession() {
  const session = await getAuthSession();
  if (!session?.user || session.user.role !== 'SALON_OWNER') return null;
  return session;
}
