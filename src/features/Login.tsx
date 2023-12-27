import {
  Anchor,
  Button,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props: PaperProps) {
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
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) =>
        val.length <= 6 ? 'Password should include at least 6 characters' : null,
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
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome back to booking.com
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
            <Anchor component="button" type="button" c="dimmed" size="xs">
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
