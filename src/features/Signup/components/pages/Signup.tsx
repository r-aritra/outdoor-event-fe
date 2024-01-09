import { useTranslation } from 'react-i18next';
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
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpStatusCode } from 'axios';
import { useRegisterUser, useSendOTP, useValidateOTP } from '../../../../models/api';
import showNotification from '../../../../utils/appNotification';
import { SignupValidation } from '../../SignupValidation';

const Signup: React.FC = () => {
  const { t } = useTranslation();

  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      otp: '',
    },

    validate: zodResolver(SignupValidation()),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });

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
        onSuccess: () => {
          sendOTPMutation.mutate(
            {
              data: { email: data.email, device_id: '1234321' },
            },
            {
              onSuccess: () => {
                showNotification({
                  type: 'success',
                  title: 'Successful',
                  message: 'OTP has been send to your email',
                });
                setShowOtpInput(true);
              },
              onError: (sendOTPError) => {
                showNotification({
                  type: 'error',
                  title: 'Send OTP error:',
                  message: sendOTPError.message,
                });
              },
            },
          );
        },
        onError: (error) => {
          if (error.response) {
            if (error.response.status === HttpStatusCode.Conflict)
              showNotification({
                type: 'error',
                title: 'User exist',
                message: 'User already exist try another one',
              });
            else
              showNotification({
                type: 'error',
                title: 'Network or other error:',
                message: error.message,
              });
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
        onSuccess: () => {
          navigate('/login', { state: { email: data.email } });
        },
        onError: (error) => {
          if (error.response) {
            if (error.response.status === HttpStatusCode.Unauthorized)
              showNotification({
                type: 'error',
                title: 'Opp..',
                message: 'OTP is not valid',
              });
            else if (error.response.status === 410)
              showNotification({
                type: 'error',
                title: 'Opp..',
                message: 'OTP has been expired..',
              });
            else
              showNotification({
                type: 'error',
                title: 'Network or other error:',
                message: error.message,
              });
          }
        },
      },
    );
  };

  return (
    <Flex justify="center" align="center" mih={'100vh'}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          {t('signup.welcome')}
        </Text>

        <Divider my="lg" />

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Stack>
            <TextInput
              required
              label={t('signup.nameLabel')}
              data-testid="name-input"
              placeholder={t('signup.namePlaceholder')}
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              error={form.errors.name && 'Enter your name'}
              radius="md"
            />

            <TextInput
              required
              label={t('signup.emailLabel')}
              data-testid="email-input"
              placeholder={t('signup.emailPlaceholder')}
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && t('signup.invalidEmailError')}
              radius="md"
            />

            <PasswordInput
              required
              label={t('signup.passwordLabel')}
              data-testid="password-input"
              placeholder={t('signup.passwordPlaceholder')}
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={form.errors.password && t('signup.invalidPasswordError')}
              radius="md"
            />

            {showOtpInput && (
              <TextInput
                required
                label={t('signup.otpLabel')}
                placeholder={t('signup.otpPlaceholder')}
                data-testid="OTP-input"
                value={form.values.otp}
                onChange={(event) => form.setFieldValue('otp', event.currentTarget.value)}
                error={form.errors.otp && t('signup.invalidOTPError')}
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
              {t('signup.loginPrompt')}
            </Anchor>

            {showOtpInput ? (
              <Button
                type="button"
                onClick={handleOtpSubmit}
                radius="xl"
                data-testid="button-validation"
              >
                {t('signup.validateOTPButton')}
              </Button>
            ) : (
              <Button type="submit" radius="xl" data-testid="button-signup">
                {t('signup.registerButton')}
              </Button>
            )}
          </Group>
        </form>
      </Paper>
    </Flex>
  );
};

export default Signup;
