import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwtDecode from 'jwt-decode';
import { post } from '@/helper/api';

const providers = [
  CredentialsProvider({
    id: 'login',
    name: 'credentials',
    authorize: async (credentials) => {
      if (credentials.access_token) {
        return {
          access_token: credentials.access_token,
        };
      }
      try {
        const { data: user } = await post('/auth/login', {
          data: {
            email: credentials.email,
            password: credentials.password,
          },
        });
        user.email = credentials.email;
        return user;
      } catch (err) {
        if (err?.response?.data) {
          throw new Error(JSON.stringify(err.response.data));
        }
        throw new Error('Server error');
      }
    },
  }),
];

const pages = {
  signIn: '/login',
};

const callbacks = {
  async jwt({ token, user }) {
    const useToken = token;
    if (user) {
      useToken.accessToken = user.access_token;
    }

    return token;
  },

  async session({ session, token }) {
    const useSession = session;

    if (token?.accessToken) {
      const userToken = await jwtDecode(token.accessToken);
      useSession.accessToken = token.accessToken;
      useSession.user = {
        email: userToken.email,
        active: userToken.active,
      };
    }
    return useSession;
  },
};

const cookies = {
  sessionToken: {
    name: '__session',
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  },
};

export default NextAuth({
  providers,
  pages,
  callbacks,
  cookies,
  secret: process.env.NEXTAUTH_SECRET,
  // colocamos esto un tiempo para saber que problema
  // hay cuando queremos loggearnos y nos tira error
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
});
