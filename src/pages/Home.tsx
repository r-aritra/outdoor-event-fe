import React, { useEffect } from 'react';
import { useRegisterUser } from '../models/api';

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
      console.log(result); // Process the result as needed
    } catch (error) {
      console.error(error); // Handle errors
    }
  };

  return <h1>hellow</h1>;
};

export default Home;
