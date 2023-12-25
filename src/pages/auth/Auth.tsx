import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Flex,
  LoadingOverlay,
} from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { GoogleButton } from './components/GoogleButton'
import { TwitterButton } from './components/TwitterButton'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export function Auth(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register'])
  const [device_id] = useState('12345')
  const [device_type] = useState('android')
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
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
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  })

  const snackbar = (massage : string) => {
    notifications.show({
      title: 'Oops...',
      message: massage,
    })
  }

  const handleSubmit = async () => {
    setVisible(true)
    const data = form.values

    if (type === 'register') {
      const apiUrl = data.terms
        ? 'http://localhost:3000/v1/api/register-vendor'
        : 'http://localhost:3000/v1/api/register-user'

      const headers = {
        'Accept-Language': 'en',
      }

      const datas = {
        name: data.name,
        email: data.email,
        password: data.password,
      }

      try {
        const response = await axios.post(apiUrl, datas, { headers })

        if (response.status === 201) {
          const apiUrl = 'http://localhost:3000/v1/api/send-otp'
          const device_id = Math.floor(
            100000 + Math.random() * 900000,
          ).toString()
          localStorage.setItem('device_id', device_id)
          const response = await axios.post(
            apiUrl,
            { email: data.email, device_id: device_id },
            { headers },
          )
          if (response.status === 200) {
            navigate('/otpVerification', { state: { email: data.email } })
          }
        }
      } catch (error: any) {
        if (error.response && error.response.status === 409) snackbar("User already exists. Please log in.")
        else snackbar(error.massage)
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:3000/v1/api/login',
          {
            email: data.email,
            password: data.password,
            device_id,
            device_type,
          },
        )

        const { access_token, refresh_token } = response.data.data

        const cookies = new Cookies()
        cookies.set('access_token', access_token, { path: '/' })
        cookies.set('refresh_token', refresh_token, { path: '/' })

        const user = jwtDecode(access_token)
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
      } catch (error : any) {
        if (error.response && error.response.status === 404) snackbar("User not found plz enter valid data... ")
        else snackbar(error.massage)
      }
    }
    setVisible(false)
  }

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

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
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
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="register as a vendor"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  )
}
