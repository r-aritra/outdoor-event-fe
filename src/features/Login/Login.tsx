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
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../../models/api';
import { HttpStatusCode } from 'axios';
import { LoginValidation } from './LoginValidation';
import showNotification from '../../utils/appNotification';

function Login() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const form = useForm({
    initialValues: {
      email: state ? state.email : '',
      password: '',
      terms: true,
    },
    validate: zodResolver(LoginValidation()),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });

  const loginMutation = useLogin();

  const handleSubmit = () => {
    const data = form.values;

    loginMutation.mutate(
      {
        data: { ...data, device_id: '1234321', device_type: 'web' },
      },
      {
        onSuccess: (responseData) => {
          localStorage.setItem('accessToken', responseData.data.access_token);
          localStorage.setItem('refreshToken', responseData.data.refresh_token);
          navigate('/');
        },
        onError: (error) => {
          if (error.response) {
            if (error.response.status === HttpStatusCode.NotFound)
              showNotification({
                type: 'error',
                title: 'User Not Found',
                message: 'Enter valid data ......',
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
