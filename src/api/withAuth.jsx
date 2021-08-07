import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { LOCAL_STORAGE_AUTH_NAME, PATH_NAMES } from '../utils/constants';
import { AUTH_API } from './api';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const run = async () => {
        const currentUser = localStorage.getItem(LOCAL_STORAGE_AUTH_NAME);
        const userData = JSON.parse(currentUser);
        // if no sessionToken was found,then we redirect to "/" page.
        if (!userData || !userData.sessionToken) {
          router.replace('/');
        } else {
          // we call the api that verifies the token.
          const response = await AUTH_API.getCurrentUser();

          // if token was verified we set the state.
          if (response.data.success && response.data.user.sessionToken === userData.sessionToken) {
            setVerified(true);
          } else {
            // If the token was fraud we first remove it from localStorage and then redirect to "/"
            router.push(PATH_NAMES.logout);
          }
        }
      };
      run();
    }, [router]);

    if (verified) {
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
