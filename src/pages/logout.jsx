import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { AUTH_API } from '../api/api';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await AUTH_API.logout();
      router.push('/');
    };

    logout();
  }, [router]);

  return null;
};

export default Logout;
