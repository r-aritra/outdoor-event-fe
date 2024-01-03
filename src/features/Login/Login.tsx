import { useTranslation } from 'react-i18next';
import {
  Anchor,
  Button,
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

function Login() {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },
    validate: {
      email: (val: string) =>
        /^\S+@\S+$/.test(val) ? null : t('login.invalidEmailError'),
      password: (val: string) =>
        val.length <= 6 ? t('login.invalidPasswordError') : null,
    },
  });

  const handleSubmit = async () => {
    setVisible(true);
    const data = form.values;
    console.log(data);
    navigate('/');
    setVisible(false);
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
          {t('login.welcome')}
        </Text>

        <Divider my="lg" />

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Stack>
            <TextInput
              required
              data-testid="email-input"
              label={t('login.emailLabel')}
              placeholder={t('login.emailPlaceholder')}
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && t('login.invalidEmailError')}
              radius="md"
            />

            <PasswordInput
              required
              data-testid="password-input"
              label={t('login.passwordLabel')}
              placeholder={t('login.passwordPlaceholder')}
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={form.errors.password && t('login.invalidPasswordError')}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={() => navigate('/signup')}
            >
              {t('login.registerPrompt')}
            </Anchor>
            <Button type="submit" radius="xl" data-testid="button-login">
              {t('login.loginButton')}
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}

export default Login;
