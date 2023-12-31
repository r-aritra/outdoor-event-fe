import { useTranslation } from 'react-i18next';
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
      otp: '',
    },
    validate: {
      email: (val: string) =>
        /^\S+@\S+$/.test(val) ? null : t('page.signup.invalidEmailError'),
      password: (val: string) =>
        val.length <= 6 ? t('page.signup.invalidPasswordError') : null,
    },
  });

  const handleSubmit = async () => {
    setVisible(true);
    const data = form.values;
    console.log(data);
    setShowOtpInput(true);
    setVisible(false);
  };

  const handleOtpSubmit = () => {
    const data = form.values;
    console.log(data);
    navigate('/');
  };

  return (
    <Flex justify="center" align="center" mih={'100vh'}>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          {t('page.signup.welcome')}
        </Text>

        <Divider my="lg" />

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Stack>
            <TextInput
              label={t('page.signup.nameLabel')}
              data-testid="name-input"
              placeholder={t('page.signup.namePlaceholder')}
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />

            <TextInput
              required
              label={t('page.signup.emailLabel')}
              data-testid="email-input"
              placeholder={t('page.signup.emailPlaceholder')}
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && t('page.signup.invalidEmailError')}
              radius="md"
            />

            <PasswordInput
              required
              label={t('page.signup.passwordLabel')}
              data-testid="password-input"
              placeholder={t('page.signup.passwordPlaceholder')}
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={form.errors.password && t('page.signup.invalidPasswordError')}
              radius="md"
            />

            <Checkbox
              label={t('page.signup.vendorRegisterLabel')}
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />

            {showOtpInput && (
              <TextInput
                required
                label={t('page.signup.otpLabel')}
                placeholder={t('page.signup.otpPlaceholder')}
                data-testid="OTP-input"
                value={form.values.otp}
                onChange={(event) => form.setFieldValue('otp', event.currentTarget.value)}
                error={form.errors.otp && t('page.signup.invalidOTPError')}
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
              {t('page.signup.loginPrompt')}
            </Anchor>

            {showOtpInput ? (
              <Button
                type="button"
                onClick={handleOtpSubmit}
                radius="xl"
                data-testid="button-validation"
              >
                {t('page.signup.validateOTPButton')}
              </Button>
            ) : (
              <Button type="submit" radius="xl" data-testid="button-signup">
                {t('page.signup.registerButton')}
              </Button>
            )}
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}

export default Signup;
