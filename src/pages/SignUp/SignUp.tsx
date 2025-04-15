import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
    Divider,
    Group,
    PinInput,
    Select,
    Flex,
    useMantineColorScheme,
} from '@mantine/core'
import { GoogleLogin } from '@react-oauth/google'
import { FaChevronLeft } from 'react-icons/fa'
import { IoLogoGoogle } from 'react-icons/io'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

import { REGISTER_USER } from '@/pgSchemas'

import classes from './SignUp.module.css'

export function SignUp() {
    const navigate = useNavigate()
    const { colorScheme } = useMantineColorScheme()
    const isDark = colorScheme === 'dark'

    // Theme colors
    const primaryColor = isDark ? '#BB86FC' : '#000'
    const bgColor = isDark ? '#121212' : '#fff'
    const disabledBgColor = isDark ? '#2c2c2c' : '#e0e0e0'
    const disabledTextColor = isDark ? '#6c6c6c' : '#a0a0a0'
    const inputBgColor = isDark ? '#2c2c2c' : '#fff'
    const borderColor = isDark ? '#444' : '#ccc'
    const cardBgColor = isDark ? '#1e1e1e' : '#fff'
    const textColor = isDark ? '#e0e0e0' : '#000'
    const dimmedTextColor = isDark ? '#aaa' : undefined

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        phone: '',
        username: '',
    })
    const [countryCode, setCountryCode] = useState('+1')
    const [currentStep, setCurrentStep] = useState(1)
    const [fieldsComplete, setFieldsComplete] = useState(false)
    const [otp, setOtp] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [usernameOptions] = useState(['tony stark', 'bruce wayne', 'steve rogers'])

    // Add country codes data
    const countryCodes = [
        { value: '+1', label: '+1 (US/Canada)' },
        { value: '+44', label: '+44 (UK)' },
        { value: '+91', label: '+91 (India)' },
        { value: '+61', label: '+61 (Australia)' },
        { value: '+33', label: '+33 (France)' },
        { value: '+49', label: '+49 (Germany)' },
        { value: '+86', label: '+86 (China)' },
        { value: '+81', label: '+81 (Japan)' },
        { value: '+55', label: '+55 (Brazil)' },
        { value: '+52', label: '+52 (Mexico)' },
    ]

    // Get full phone number with country code
    const getFullPhoneNumber = () => {
        return `${countryCode}${userInfo.phone}`;
    }

    // Check if fields are filled based on current step
    useEffect(() => {
        if (currentStep === 1) {
            setFieldsComplete(userInfo.email.trim() !== '' && userInfo.password.trim() !== '')
        } else if (currentStep === 2) {
            // In step 2, we need a phone number to proceed (minimum 6 digits)
            setFieldsComplete(userInfo.phone ? userInfo.phone.length >= 6 : false)
        } else if (currentStep === 3) {
            // In step 3, OTP is required
            setFieldsComplete(otp.length === 6)
        } else if (currentStep === 4) {
            // In step 4, username is required
            setFieldsComplete(userInfo.username.trim() !== '')
        }
    }, [userInfo.email, userInfo.password, userInfo.phone, userInfo.username, currentStep, otp])

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        variables: {
            input: {
                email: userInfo.email,
                password: userInfo.password,
                phone: getFullPhoneNumber(),
                username: userInfo.username
            }
        },
        onCompleted: () => {
            navigate('/')
        },
        onError: (error) => {
            console.error('Registration error:', error)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        registerUser()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({ ...prev, [name]: value }))
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        } else {
            navigate(-1)
        }
    }

    const handleNextStep = () => {
        if (currentStep === 1) {
            setCurrentStep(2)
        } else if (currentStep === 2 && userInfo.phone && userInfo.phone.length >= 6) {
            // Auto-send OTP when advancing to verification step
            handleSendOtp()
            setCurrentStep(3)
        } else if (currentStep === 3) {
            setCurrentStep(4)
            console.log('OTP verified:', otp)
        } else if (currentStep === 4) {
            setCurrentStep(5)
            console.log('Username selected:', userInfo.username)
        } else if (currentStep === 5) {
            handleSubmit(new Event('submit') as unknown as React.FormEvent)
        }
    }

    const handleSendOtp = () => {
        // Simulate sending OTP
        console.log('Sending OTP to:', getFullPhoneNumber())
        setOtpSent(true)
    }

    const handleGoogleSuccess = (credentialResponse: any) => {
        console.log('Google login success:', credentialResponse)
        // Implement Google login logic here
    }

    const handleGoogleError = () => {
        console.error('Google login failed')
    }

    const handleOtpChange = (value: string) => {
        setOtp(value)
    }

    const handleUsernameSelect = (username: string) => {
        setUserInfo(prev => ({ ...prev, username }))
    }

    const handleRandomUsername = () => {
        const randomIndex = Math.floor(Math.random() * usernameOptions.length)
        setUserInfo(prev => ({ ...prev, username: usernameOptions[randomIndex] }))
    }

    // Render button with theme-aware styles
    const renderThemedButton = (isEnabled: boolean, onClick: () => void, buttonText: string) => (
        <Button
            fullWidth
            mt="md"
            style={{
                borderRadius: '25px',
                height: '44px',
                background: isEnabled ? primaryColor : disabledBgColor,
                color: isEnabled ? (isDark ? '#000' : '#fff') : disabledTextColor,
                textTransform: 'lowercase',
                cursor: isEnabled ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
            }}
            onClick={onClick}
            disabled={!isEnabled}
        >
            {buttonText}
        </Button>
    )

    // Render step content based on current step
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className={classes.formGroup}>
                            <Text size="xs" c={dimmedTextColor} mb={5}>
                                email address
                            </Text>
                            <TextInput
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                className={classes.input}
                                classNames={{ input: classes.inputElement }}
                                variant="unstyled"
                                styles={{
                                    input: {
                                        backgroundColor: inputBgColor,
                                        color: textColor
                                    }
                                }}
                                required
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <Text size="xs" c={dimmedTextColor} mb={5}>
                                password
                            </Text>
                            <PasswordInput
                                name="password"
                                value={userInfo.password}
                                onChange={handleChange}
                                className={classes.input}
                                classNames={{ input: classes.inputElement }}
                                variant="unstyled"
                                styles={{
                                    input: {
                                        backgroundColor: inputBgColor,
                                        color: textColor
                                    }
                                }}
                                required
                            />
                        </div>
                    </>
                )
            case 2:
                return (
                    <>
                        <div className={classes.formGroup}>
                            <Text size="xs" c={dimmedTextColor} mb={5}>
                                phone number
                            </Text>
                            <PhoneInput
                                defaultCountry="ph"
                                value={userInfo.phone}
                                onChange={(phone) => setUserInfo(prev => ({ ...prev, phone }))}
                                inputStyle={{
                                    width: '100%',
                                    height: '36px',
                                    fontSize: '14px',
                                    backgroundColor: inputBgColor,
                                    color: textColor,
                                    borderColor: borderColor,
                                }}
                            />
                        </div>

                        {renderThemedButton(
                            Boolean(userInfo.phone && userInfo.phone.length >= 6),
                            () => {
                                if (userInfo.phone && userInfo.phone.length >= 6) {
                                    handleSendOtp();
                                    setCurrentStep(3);
                                }
                            },
                            otpSent ? 'resend code' : 'send code'
                        )}
                    </>
                )
            case 3:
                return (
                    <div className={classes.formGroup}>
                        <Text size="xs" c={dimmedTextColor} mb={5}>
                            verification code
                        </Text>
                        <Text size="xs" c={dimmedTextColor} mb={15}>
                            Enter the 6-digit code sent to your phone
                        </Text>
                        <div style={{
                            padding: '20px',
                            backgroundColor: isDark ? '#282828' : '#f5f5f5',
                            borderRadius: '8px',
                            marginBottom: '15px'
                        }}>
                            <PinInput
                                length={6}
                                value={otp}
                                onChange={handleOtpChange}
                                style={{
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    gap: '8px'
                                }}
                                styles={{
                                    input: {
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: '4px',
                                        width: '42px',
                                        height: '48px',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        backgroundColor: inputBgColor,
                                        color: textColor
                                    }
                                }}
                                type="number"
                                inputMode="numeric"
                                autoFocus={true}
                                placeholder="0"
                                size="lg"
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Anchor size="xs" onClick={() => handleSendOtp()}>
                                Resend code
                            </Anchor>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className={classes.formGroup}>
                        <Text size="xl" fw={700} mb={10} c={textColor}>
                            what name shall we call you?
                        </Text>
                        <Text size="sm" c={dimmedTextColor} mb={20}>
                            generate your alias name. we will not generate the same alias name as your real name.
                        </Text>

                        <div className={classes.formGroup} style={{ marginBottom: '20px' }}>
                            <Text size="xs" c={dimmedTextColor} mb={5}>
                                custom username
                            </Text>
                            <TextInput
                                name="username"
                                value={userInfo.username}
                                onChange={handleChange}
                                className={classes.input}
                                classNames={{ input: classes.inputElement }}
                                variant="unstyled"
                                placeholder="enter your own username"
                                styles={{
                                    input: {
                                        backgroundColor: inputBgColor,
                                        color: textColor
                                    }
                                }}
                            />
                        </div>

                        <Text size="xs" c={dimmedTextColor} mb={10}>
                            or choose from these options:
                        </Text>

                        <div className={classes.usernameOptions}>
                            {usernameOptions.map((name, index) => (
                                <Button
                                    key={index}
                                    variant={userInfo.username === name ? "filled" : "outline"}
                                    onClick={() => handleUsernameSelect(name)}
                                    className={classes.usernameOption}
                                    styles={{
                                        root: {
                                            backgroundColor: userInfo.username === name ?
                                                (isDark ? '#3f3f3f' : '#f0f0f0') :
                                                'transparent',
                                            border: userInfo.username === name ?
                                                `1px solid ${primaryColor}` :
                                                `1px solid ${isDark ? '#444' : '#e0e0e0'}`,
                                            color: textColor,
                                            borderRadius: '30px',
                                            padding: '10px 20px',
                                            marginBottom: '10px',
                                            transition: 'all 0.2s ease'
                                        }
                                    }}
                                >
                                    {name}
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleRandomUsername}
                            fullWidth
                            style={{
                                borderRadius: '30px',
                                marginTop: '15px',
                                marginBottom: '30px',
                                padding: '10px',
                                backgroundColor: isDark ? '#2c2c2c' : '#e0e0e0',
                                color: isDark ? '#aaa' : '#555',
                                border: 'none'
                            }}
                        >
                            randomize
                        </Button>
                    </div>
                )
            case 5:
                return (
                    <div className={classes.formGroup} style={{ textAlign: 'center', padding: '20px 0' }}>
                        <Text size="md" fw={500} ta="center" c={textColor}>
                            All steps completed!
                        </Text>
                        <Text size="sm" c={dimmedTextColor} ta="center" mt={10}>
                            Account creation would continue with additional steps in a real implementation.
                        </Text>
                    </div>
                )
            default:
                return null
        }
    }

    // Get button text based on current step and state
    const getButtonText = () => {
        if (currentStep === 1) return 'next'
        if (currentStep === 2) return 'next'
        if (currentStep === 3) return 'verify'
        if (currentStep === 4) return 'next'
        if (currentStep === 5) return 'continue'
        return 'next'
    }

    return (
        <div className={classes.wrapper} >
            <div className={classes.container}>
                <div className={classes.leftSection} >
                    <div className={classes.logoContainer}>
                        <button className={classes.backButton} onClick={handleBack} style={{
                            color: isDark ? '#e0e0e0' : '#000',
                            position: 'absolute',
                            top: '20px',
                            left: '20px'
                        }}>
                            <FaChevronLeft />
                        </button>
                        <svg width="17" height="40" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg" className={classes.logo}>
                            <path d="M11.6759 28.1842C13.5006 27.486 15.0641 26.2427 16.1551 24.6254L16.7063 29.0354C16.9319 30.8402 15.8491 32.5525 14.1217 33.1223L4.00216 36.4607C2.36397 37.0011 0.983011 38.119 0.112825 39.5995L0.795944 34.4761C0.980285 33.0935 1.90602 31.9225 3.20871 31.4241L11.6759 28.1842Z" fill={isDark ? "#e0e0e0" : "#1A1A1A"} stroke={isDark ? "#e0e0e0" : "#1A1A1A"} stroke-width="0.129032" />
                            <path d="M10.9406 17.7976C12.5791 17.1539 13.913 15.9185 14.6812 14.3403L15.2578 18.0034C15.5373 19.7787 14.5369 21.5077 12.8585 22.1502L4.84106 25.2192C3.38744 25.7756 2.20951 26.8677 1.54271 28.2614L2.16061 23.3756C2.33524 21.9947 3.24961 20.8193 4.54505 20.3103L10.9406 17.7976Z" fill={isDark ? "#e0e0e0" : "#1A1A1A"} stroke={isDark ? "#e0e0e0" : "#1A1A1A"} stroke-width="0.129032" />
                            <path d="M8.9149 9.09467C10.8358 8.41018 12.3715 6.94279 13.1448 5.06352L13.6814 7.8914C14.0159 9.654 13.0742 11.4109 11.4212 12.1082L6.55219 14.1622C4.90935 14.8552 3.55262 16.0819 2.69761 17.6384L3.26615 13.3081C3.45219 11.8911 4.41627 10.6977 5.7625 10.218L8.9149 9.09467Z" fill={isDark ? "#e0e0e0" : "#1A1A1A"} stroke={isDark ? "#e0e0e0" : "#1A1A1A"} stroke-width="0.129032" />
                            <rect x="5.84766" width="5.16129" height="5.16129" rx="2.58065" fill={isDark ? "#e0e0e0" : "#1A1A1A"} />
                        </svg>
                        <h1 className={classes.title} style={{ color: isDark ? '#e0e0e0' : '#1A1A1A' }}>LightHouse</h1>
                        <p className={classes.subtitle} style={{ color: isDark ? '#aaa' : 'inherit' }}>
                            A space for everyone in every place
                        </p>
                    </div>
                </div>

                <div className={classes.rightSection}>
                    <div className={classes.formContainer}>
                        <Text size="xs" c={dimmedTextColor} mb={10}>
                            step {currentStep} of 5
                        </Text>
                        <Text size="lg" fw={700} mb={5} c={textColor}>
                            create an account
                        </Text>
                        <Text size="sm" mb={15} c={textColor}>
                            {currentStep === 1 ? 'sign up with email' :
                                currentStep === 2 ? 'add your phone' :
                                    currentStep === 3 ? 'verify your phone' :
                                        currentStep === 4 ? 'choose your alias' :
                                            'finishing up'}
                        </Text>

                        {currentStep === 1 && (
                            <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                                <Text size="xs" c={dimmedTextColor}>
                                    already have an account?
                                </Text>
                                <Anchor component={Link} to="/login" size="xs">
                                    sign in
                                </Anchor>
                            </div>
                        )}

                        <form onSubmit={(e) => {
                            e.preventDefault()
                            if (fieldsComplete) {
                                if (currentStep === 2) {
                                    // Don't auto-advance on form submit for step 2
                                    return;
                                } else if (currentStep === 5) {
                                    // Final step - submit the form
                                    handleSubmit(e);
                                } else {
                                    handleNextStep()
                                }
                            }
                        }}>
                            {renderStepContent()}

                            {(currentStep !== 2) && (
                                <Button
                                    fullWidth
                                    mt="md"
                                    style={{
                                        borderRadius: '25px',
                                        height: '44px',
                                        background: fieldsComplete ? primaryColor : disabledBgColor,
                                        color: fieldsComplete ? (isDark ? '#000' : '#fff') : disabledTextColor,
                                        textTransform: 'lowercase',
                                        cursor: fieldsComplete ? 'pointer' : 'not-allowed',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onClick={() => {
                                        if (fieldsComplete) {
                                            handleNextStep()
                                        }
                                    }}
                                    disabled={!fieldsComplete}
                                    type={currentStep === 5 ? "submit" : "button"}
                                >
                                    {getButtonText()}
                                </Button>
                            )}
                        </form>

                        {currentStep === 1 && (
                            <>
                                <Divider
                                    label="or"
                                    labelPosition="center"
                                    my="md"
                                    className={classes.divider}
                                    color={isDark ? "dark" : "gray"}
                                />

                                <div className={classes.oauthButtons}>
                                    <Button
                                        fullWidth
                                        leftSection={
                                            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                        }
                                        className={classes.oauthButton}
                                        style={{
                                            borderRadius: '25px',
                                            textTransform: 'lowercase',
                                            height: '44px',
                                            marginBottom: '10px',
                                            borderColor: isDark ? '#444' : '#e0e0e0',
                                            color: textColor,
                                            backgroundColor: isDark ? '#2c2c2c' : '#fff'
                                        }}
                                        variant="default"
                                    >
                                        continue with Google
                                    </Button>

                                    <Button
                                        fullWidth
                                        leftSection={
                                            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.58 1.5-1.3 2.95-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.27 2.18-1.66 4.19-3.74 4.25z" fill={isDark ? "#e0e0e0" : "#000"} />
                                            </svg>
                                        }
                                        className={classes.oauthButton}
                                        style={{
                                            borderRadius: '25px',
                                            textTransform: 'lowercase',
                                            height: '44px',
                                            borderColor: isDark ? '#444' : '#e0e0e0',
                                            color: textColor,
                                            backgroundColor: isDark ? '#2c2c2c' : '#fff'
                                        }}
                                        variant="default"
                                    >
                                        continue with Apple
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
