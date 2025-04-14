import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {
    Anchor,
    Box,
    Button,
    Container,
    Image,
    Paper,
    Text,
    TextInput,
    Title,
} from '@mantine/core'

import logo from '@/assets/logo.png'
import { REGISTER_USER } from '@/pgSchemas'

import classes from './SignUp.module.css'

export function SignUp() {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    })

    const setUserInfoFunction = (info: string, data: string) => {
        setUserInfo({
            ...userInfo,
            [info]: data,
        })
    }

    const [registerUser, { loading: registerLoading }] = useMutation(REGISTER_USER)

    const handleSubmit = async () => {
        if (userInfo.password !== userInfo.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        try {
            const response = await registerUser({
                variables: {
                    email: userInfo.email,
                    mobile: userInfo.mobile,
                    password: userInfo.password,
                },
            })
            navigate('/login')
        } catch (err) {
            console.error('Registration error:', err)
        }
    }

    const handleBackClick = () => {
        navigate('/')
    }

    return (
        <div className={classes.wrapper}>
            <button className={classes.backButton} onClick={handleBackClick}>
                ←
            </button>

            <div className={classes.container}>
                <div className={classes.leftSection}>
                    <div className={classes.logoContainer}>
                        <img src={logo} alt="Lighthouse Logo" className={classes.logo} />
                        <h1 className={classes.title}>LightHouse</h1>
                        <p className={classes.subtitle}>
                            A space for everyone in every place
                        </p>
                    </div>
                </div>

                <div className={classes.rightSection}>
                    <div className={classes.formContainer}>
                        <h2 className={classes.formTitle}>Create Account</h2>

                        <div className={classes.formGroup}>
                            <TextInput
                                placeholder="Email address"
                                type="email"
                                classNames={{ root: classes.input, input: classes.inputElement }}
                                onChange={(e) => setUserInfoFunction('email', e.target.value)}
                                variant="filled"
                                required
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <TextInput
                                placeholder="Mobile number"
                                type="tel"
                                classNames={{ root: classes.input, input: classes.inputElement }}
                                onChange={(e) => setUserInfoFunction('mobile', e.target.value)}
                                variant="filled"
                                required
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <TextInput
                                placeholder="Password"
                                type="password"
                                classNames={{ root: classes.input, input: classes.inputElement }}
                                onChange={(e) => setUserInfoFunction('password', e.target.value)}
                                variant="filled"
                                required
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <TextInput
                                placeholder="Confirm password"
                                type="password"
                                classNames={{ root: classes.input, input: classes.inputElement }}
                                onChange={(e) => setUserInfoFunction('confirmPassword', e.target.value)}
                                variant="filled"
                                required
                            />
                        </div>

                        <Button
                            fullWidth
                            className={classes.signUpButton}
                            onClick={handleSubmit}
                            loading={registerLoading}
                        >
                            Sign up
                        </Button>

                        <div className={classes.loginContainer}>
                            <Text size="sm" c="dimmed">
                                Already have an account?{' '}
                                <Anchor component="button" className={classes.loginLink} onClick={() => navigate('/login')}>
                                    Sign In
                                </Anchor>
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp 