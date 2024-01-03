import React, { useEffect } from 'react';
import { useRegisterUser } from '../models/api';
import { t } from 'i18next';

const Home: React.FC = () => {
  useEffect(() => {
    handleRegisterUser();
  }, []);

  const registerUserMutation = useRegisterUser();

  const handleRegisterUser = async () => {
    try {
      // Perform registration
      const result = await registerUserMutation.mutateAsync({
        data: {
          email: '19@gmail.com',
          name: '19igmail.com',
          password: '123222123',
        },
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return <h1>{t('home')}</h1>;
};

export default Home;
