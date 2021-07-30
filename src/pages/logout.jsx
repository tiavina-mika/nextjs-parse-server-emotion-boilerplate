import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { AUTH_API } from '../api/api';
import { clearIsAuthIntoLocalStorage } from '../utils/utils';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      const response = await AUTH_API.logout();
      if (response.data.success) {
        clearIsAuthIntoLocalStorage();
      }
      router.push('/');
    };

    logout();
  }, [router]);

  return null;
};

export default Logout;
