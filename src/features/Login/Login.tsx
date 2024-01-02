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
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../../models/api';
import { HttpStatusCode } from 'axios';
import { notifications } from '@mantine/notifications';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const form = useForm({
    initialValues: {
      email: state ? state.email : '',
      password: '',
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

  const loginMutation = useLogin();

  const handleSubmit = async () => {
    const data = form.values;
    console.log(data);

    loginMutation.mutate(
      {
        data: { ...data, device_id: '1234321', device_type: 'web' },
      },
      {
        onSuccess: (responseData) => {
          console.log('Login successful:', responseData);
          navigate('/');
        },
        onError: (error) => {
          if (error.response) {
            if (error.response.status === HttpStatusCode.NotFound)
              showNotification('User Not Found', 'Enter valid data ......');
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
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              size="xs"
              onClick={() => navigate('/signup')}
            >
              {"Don't have an account? Register"}{' '}
            </Anchor>
            <Button type="submit" radius="xl">
              {'Login'}
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}
