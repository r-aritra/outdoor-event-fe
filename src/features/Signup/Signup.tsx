import {
  Anchor,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUser, useSendOTP, useValidateOTP } from '../../models/api';
import { notifications } from '@mantine/notifications';
import { HttpStatusCode } from 'axios';

export default function Signup() {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      otp: '',
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) =>
        val.length <= 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  const showNotification = (title: string, message: string) => {
    notifications.show({
      title: title,
      message: message,
    });
  };

  const signInMutation = useRegisterUser();
  const sendOTPMutation = useSendOTP();
  const validateOTPMutation = useValidateOTP();

  const handleSubmit = () => {
    const data = form.values;

    signInMutation.mutate(
      {
        data: { name: data.name, email: data.email, password: data.password },
      },
      {
        onSuccess: (signInData) => {
          sendOTPMutation.mutate(
            {
              data: { email: data.email, device_id: '1234321' },
            },
            {
              onSuccess: (sendOTPData) => {
                showNotification('Successful', 'OTP has been send to your email ');
                setShowOtpInput(true);
              },
              onError: (sendOTPError) => {
                showNotification('Send OTP error:', sendOTPError.message);
              },
            },
          );
        },
        onError: (error) => {
          if (error.response) {
            if (error.response.status === HttpStatusCode.Conflict)
              showNotification('User exist', 'User already exist try another one');
            else showNotification('Network or other error:', error.message);
          }
        },
      },
    );
  };

  const handleOtpSubmit = () => {
    const data = form.values;

    validateOTPMutation.mutate(
      {
        data: { email: data.email, otp: data.otp, device_id: '1234321' },
      },
      {
        onSuccess: (validateOTPData) => {
          navigate('/login', { state: { email: data.email } });
        },
        onError: (error) => {
          if (error.response) {
            if (error.response.status === HttpStatusCode.Unauthorized)
              showNotification('Opp..', 'OTP is not valid');
            else if (error.response.status === 410)
              showNotification('Opp..', 'OTP has been expired..');
            else showNotification('Network or other error:', error.message);
          }
        },
      },
    );
  };

  return (
    <Flex justify="center" align="center" mih={'100vh'}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to booking.com
        </Text>

        <Divider my="lg" />

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password && 'Password should include at least 6 characters'
              }
              radius="md"
            />

            {showOtpInput && (
              <TextInput
                required
                label="Enter OTP"
                placeholder="123456"
                value={form.values.otp}
                onChange={(event) => form.setFieldValue('otp', event.currentTarget.value)}
                error={form.errors.otp && 'Invalid OTP'}
                radius="md"
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => navigate('/login')}
              size="xs"
            >
              {'Already have an account? Login'}
            </Anchor>

            {showOtpInput ? (
              <Button type="button" onClick={handleOtpSubmit} radius="xl">
                {'Validate OTP'}
              </Button>
            ) : (
              <Button type="submit" radius="xl">
                {'Register'}
              </Button>
            )}
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}
