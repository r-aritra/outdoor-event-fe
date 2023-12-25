import { Button, Flex, Paper, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ResendSchema, ValidateSchema } from '../../utils/validationSchemas';

const Otp: React.FC = () => {
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const snackbar = (massage: string) => {
    notifications.show({
      title: 'Oops...',
      message: massage,
    });
  };

  const handleVerifyOtp = async () => {
    const validatedData = ValidateSchema.parse({
      email: location.state.email,
      otp,
      device_id: localStorage.getItem('device_id') || '',
    });

    const apiUrl = 'http://localhost:3000/v1/api/validate-otp';
    const headers = {
      'Accept-Language': 'en',
    };
    try {
      const response = await axios.post(apiUrl, validatedData, { headers });

      if (response.status === 200) {
        const response = await axios.post(
          'http://localhost:3000/v1/api/verify-user',
          { email: location.state.email },
          { headers },
        );
        if (response.status === 200) navigate('/auth');
      }
    } catch (error: Error) {
      if (error.response && error.response.status === 401) {
        snackbar('Plz enter valid OTP... ');
      } else if (error.response && error.response.status === 410) {
        snackbar('OTP has been expired resend it ');
      } else {
        snackbar(error.massage);
      }
    }
  };

  const handleResendOtp = async () => {
    const headers = {
      'Accept-Language': 'en',
    };

    const validatedData = ResendSchema.parse({
      email: location.state.email,
      device_id: localStorage.getItem('device_id') || '',
    });

    try {
      await axios.post('http://localhost:3000/v1/api/send-otp', validatedData, {
        headers,
      });
      snackbar('otp resend to your email ....');
    } catch (error: Error) {
      if (error.response && error.response.status === 404)
        snackbar('User not found plz enter valid data... ');
      else snackbar(error.massage);
    }
  };

  return (
    <Flex justify="center" align="center" mih={'100vh'}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500} mb={15}>
          OTP verification
        </Text>

        <TextInput
          placeholder="Enter otp..."
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          radius="md"
        />

        <Button radius="l" m={15} onClick={handleVerifyOtp}>
          verify OTP
        </Button>

        <Button radius="l" m={15} onClick={handleResendOtp}>
          Resend OTP
        </Button>
      </Paper>
    </Flex>
  );
};

export default Otp;
