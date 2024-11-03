import React, { useState } from 'react'
import { Button, Checkbox, Col, Form, Image, Input, Row, Typography } from 'antd'
// import { LikeOutlined } from '@ant-design/icons';
import loginImg from '../../assets/loginImg.png'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useAuthContext } from '../../context/AuthContext'

const {Title,Text} = Typography

const initialState = {email : "", password : ""}
export default function Login() {
  



  const [state,setState] = useState(initialState)
    const [isProcessing,setIsProcessing] = useState(false)
    const {dispatch,isAuthentication} = useAuthContext()
    const navigate = useNavigate()
    console.log('isAuthentication :>> ', isAuthentication);
    const handleChange = e => setState(s => ({...s,[e.target.name] : e.target.value}))

    const handleSubmit = e => {
        e.preventDefault()
        const {email,password} = state
        if (!window.isEmail(email)) {return window.toastify("Invalid Email",'error')}
        if (password.length < 5) {return window.toastify("Please enter at least 6 character Password ",'error')}
        setIsProcessing(true)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('user :>> ', user);
          
          dispatch({type : "SET_LOGGED_IN", payload : {user}})
          window.toastify("Successfully Login",'success')
          setState(initialState)
          navigate('/')
          // ...
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    window.toastify("Invalid Email or Password",'error'); break
                    default:
                    window.toastify("Invalid Email or Password",'error')

            }
        })
        .finally (() => {
            setIsProcessing(false)
        })

      }


  return (
    <>
    <Row>
      <Col sm={24} md={12} lg={16}>
        <Image src={loginImg} width='100%' height='100vh' className='object-fit-cover' preview={false} />
      </Col>  
      <Col sm={24} md={12} lg={8} className='d-flex justify-content-center flex-column ps-4'>
        <Title level={3}>Welcome</Title>
        {/* <ClappingOutlined/> */}
        <Text className='text-muted mb-2'>Please login here</Text>
        <Form layout={'vertical'} className='w-75'>
            <Form.Item label='Email Address'>
              <Input name='email' className='form-control' type='email' onChange={handleChange} />
            </Form.Item>
            <Form.Item label='Password'>
              <Input.Password name='password' className='form-control'  onChange={handleChange} />
            </Form.Item>
          <Form.Item>
            <div className="d-flex justify-content-between">
              <Checkbox>Remember me</Checkbox>
              <Link to='' style={{textDecoration : 'none'}}>Forget Password</Link>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block size='large' loading={isProcessing} htmlType="submit" onClick={handleSubmit}> 
              Login
            </Button>
            <h6 className='mt-3' >Do not have an account?. <Link to='/auth/register'>Register</Link> </h6>
          </Form.Item>
        </Form>
      </Col>  
    </Row> 
    </>
  )
}
