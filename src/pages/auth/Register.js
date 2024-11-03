import React, { useState } from 'react'
import { Button, Checkbox, Col, Form, Image, Input, Row, Typography } from 'antd'

import { auth, firestore } from '../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

// import { useAuthContext } from '../../context/AuthContext'

import RegisterImage from '../../assets/registerImg.png'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

const {Title,Text} = Typography
const initialState = {firstName : "", lastName : "", email : "", password : ""}
export default function Register() {
    const [state,setState] = useState(initialState)
    const {dispatch} = useAuthContext()
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = e => setState(s => ({...s,[e.target.name] : e.target.value}))

    const handleSubmit = e => {
        e.preventDefault()
        let {firstName,email,password} = state
        firstName = firstName.trim()
        if (firstName.length <= 3) {
            return window.toastify("Please Enter Correct Name",'error')
        }
        // if (!window.isEmail(email)) {
        //     return window.toastify("Please Enter Correct Email",'error')
        // }
        if (password.length <= 5) {
            return window.toastify("Please Enter Password must be 6 character",'error')
        }
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            createUserProfile(user)

            // ...
        })
        .catch((error) => {
            setIsLoading(false)
            switch (error.code) {
                case 'auth/email-already-in-use':
                    window.toastify("Email Already Exit",'error')
                    break;
                    default:
                    window.toastify("Invalid Email or Password",'error')
                    break;
            }
            // ..
        });

        const createUserProfile = async (userCredential) => {
            const {uid} = userCredential
            const {firstName,lastName,email} = state
            const user = {
                firstName, lastName, fullName : firstName + " " + lastName, email, uid, status : "active", roles : ['customer'], isverified : false, createAt : serverTimestamp()
            }
            const userData = await setDoc(doc(firestore, "users", uid), user)
            dispatch({type : "SET_LOGGED_IN", payload : {userData}})
            window.toastify("User Successfully Register",'success')
            setIsLoading(false)
            navigate('/')
        }
    } 

  return (
    <>
      <Row>
        <Col sm={24} md={12} lg={16} className='d-none d-md-block' >
            <Image src={RegisterImage} width='100%' height='100vh' className='object-fit-cover' preview={false} />
        </Col>
        <Col sm={24} md={12} lg={8} className='d-flex  align-items-center align-items-md-start flex-column p-4 p-md-5'>
            <Title level={3}>Create New Account</Title>
            <Text className='text-muted mb-2'>Please enter details</Text>
            <Form layout={'vertical'} className='w-75' onSubmitCapture={handleSubmit} >
                <Form.Item label="FirstName">
                    <Input name='firstName' type='text' onChange={handleChange} className='form-control'  />
                </Form.Item>
                <Form.Item label="LastName">
                    <Input name='lastName' type='text' onChange={handleChange} className='form-control' />
                </Form.Item>
                <Form.Item label="Email">
                    <Input name='email' type='email' onChange={handleChange} className='form-control' />
                </Form.Item>
                <Form.Item label="Password">
                    <Input type='password' name='password' onChange={handleChange} className='form-control' />
                </Form.Item>

                <Form.Item>
                <Checkbox><Text strong>I agree to the Terms & Condition</Text></Checkbox>
                </Form.Item>

                <Form.Item>
                <Button type="primary" size='large' block htmlType="submit" loading={isLoading}>Register</Button>
                </Form.Item>
            </Form>
        </Col>
      </Row>
    </>
  )
}
