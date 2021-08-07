import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { AUTH_API } from '../api/api';
import { clearCurrentUserLocalStorage } from '../utils/utils';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      const response = await AUTH_API.logout();
      if (response.data.success) {
        clearCurrentUserLocalStorage();
      }
      router.push('/');
    };

    logout();
  }, [router]);

  return null;
};

export default Logout;
