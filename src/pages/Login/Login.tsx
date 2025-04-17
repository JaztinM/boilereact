import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {
  Anchor,
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconUser, IconLock } from '@tabler/icons-react'

import { LOGIN_USER } from '@/pgSchemas'

import classes from './Login.module.css'

export function Login() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const setUserInfoFunction = (info: string, data: string) => {
    setUserInfo({
      ...userInfo,
      [info]: data,
    })
  }

  const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER)

  const handleSubmit = async () => {
    try {
      const response = await loginUser({
        variables: {
          email: userInfo.email,
          password: userInfo.password,
        },
      })
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      navigate('/')
    }
  }

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div className={classes.wrapper}>

      <div className={classes.container}>
        <div className={classes.leftSection}>
          <div className={classes.logoContainer}>
            <svg width="17" height="40" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg" className={classes.logo}>
              <path d="M11.6759 28.1842C13.5006 27.486 15.0641 26.2427 16.1551 24.6254L16.7063 29.0354C16.9319 30.8402 15.8491 32.5525 14.1217 33.1223L4.00216 36.4607C2.36397 37.0011 0.983011 38.119 0.112825 39.5995L0.795944 34.4761C0.980285 33.0935 1.90602 31.9225 3.20871 31.4241L11.6759 28.1842Z" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="0.129032" />
              <path d="M10.9406 17.7976C12.5791 17.1539 13.913 15.9185 14.6812 14.3403L15.2578 18.0034C15.5373 19.7787 14.5369 21.5077 12.8585 22.1502L4.84106 25.2192C3.38744 25.7756 2.20951 26.8677 1.54271 28.2614L2.16061 23.3756C2.33524 21.9947 3.24961 20.8193 4.54505 20.3103L10.9406 17.7976Z" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="0.129032" />
              <path d="M8.9149 9.09467C10.8358 8.41018 12.3715 6.94279 13.1448 5.06352L13.6814 7.8914C14.0159 9.654 13.0742 11.4109 11.4212 12.1082L6.55219 14.1622C4.90935 14.8552 3.55262 16.0819 2.69761 17.6384L3.26615 13.3081C3.45219 11.8911 4.41627 10.6977 5.7625 10.218L8.9149 9.09467Z" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="0.129032" />
              <rect x="5.84766" width="5.16129" height="5.16129" rx="2.58065" fill="#1A1A1A" />
            </svg>
            <h1 className={classes.title}>LightHouse</h1>
            <p className={classes.subtitle}>
              A space for everyone in every place
            </p>
          </div>
        </div>

        <div className={classes.rightSection}>
          <Paper className={classes.formCard} radius="md" withBorder>
            <h2 className={classes.formTitle}>Sign In</h2>

            <div className={classes.formGroup}>
              <label className={classes.label} htmlFor="email">email</label>
              <TextInput
                id="email"
                classNames={{
                  root: classes.inputRoot,
                  input: classes.input,
                }}
                placeholder="john@email.com"
                aria-label="Email"
                leftSection={<IconUser className={classes.userIcon} size={16} />}
                onChange={(e) => setUserInfoFunction('email', e.target.value)}
              />
            </div>

            <div className={classes.formGroup}>
              <label className={classes.label} htmlFor="password">password</label>
              <PasswordInput
                id="password"
                classNames={{
                  root: classes.inputRoot,
                  input: classes.input,
                }}
                placeholder="••••••••••••"
                aria-label="Password"
                leftSection={<IconLock className={classes.lockIcon} size={16} />}
                onChange={(e) => setUserInfoFunction('password', e.target.value)}
              />
              <Link to="/forgot-password" className={classes.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={classes.signInButton}
              disabled={loginLoading}
              onClick={handleSubmit}
            >
              {loginLoading ? 'signing in...' : 'sign in'}
            </button>

            <Text className={classes.signupText}>
              Don't have an account? <Link to="/signup" className={classes.signUpLink}>sign up</Link>
            </Text>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default Login
