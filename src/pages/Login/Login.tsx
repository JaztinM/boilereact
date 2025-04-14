import { useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'

import { axios, axiosInstance } from '@/libs'
import { ADD_TOKEN, DELETE_TOKEN, GET_TOKEN, GET_TOKENS, UPDATE_TOKEN } from '@/pgSchemas'
import { LOGIN_USER } from '@/pgSchemas'

import classes from './Login.module.css'

export function Login() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const setUserInfoFunction = (info: string, data: string) => {
    setUserInfo({
      ...userInfo,
      [info]: data,
      name: userInfo.email,
    })
  }

  const { data, loading, error } = useQuery(GET_TOKENS, {
    variables: { limit: 10, offset: 0 },
  })

  const [addToken, { loading: addTokenLoading, error: addTokenError }] = useMutation(ADD_TOKEN, {
    refetchQueries: ['GetTokens'], // Refresh token list after adding
  })

  const [loginUser, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_USER)

  console.log(data, loading, error)

  const Submit = async () => {
    console.log(userInfo)
    await loginUser({
      variables: {
        email: userInfo.email,
        password: userInfo.password,
      },
    })
      .then(async (res) => {
        await addToken({
          variables: {
            name: 'XRP',
            price: 123,
            description: 'xrp army here',
          },
        })
      })
      .catch((err) => {})
  }
  console.log(addToken, addTokenLoading, addTokenError)

  return (
    <Box className={classes.wrapper}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.form}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            onChange={(e) => setUserInfoFunction('email', e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            onChange={(e) => setUserInfoFunction('password', e.target.value)}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={Submit}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login
