import { auth, firestore } from "@/config/firebase"
import { Button, Col, Form, Input, Row, Typography } from "antd"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const { Title, Paragraph } = Typography

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Register = () => {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()


  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = () => {
    let { fullName, email, password, confirmPassword } = state
    if (!window.isValidEmail(email)) {
      return window.toastify("Please enter a valid email", "error")
    }
    if (password !== confirmPassword) {
      return window.toastify("Password and Confirm Password must be same", "error")
    }

    const user = {
      fullName, email, password,
      status: "active",
      role: "customer",
      createdAt: serverTimestamp(),
    }

    setIsProcessing(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const authUser = userCredential.user;
        user.id = authUser.uid
        createProfile(user)
        window.toastify('User registered successfully', 'success')
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          window.toastify('Email already in use', 'error')
        }
        else {
          window.toastify('Something went wrong', 'error')
          setIsProcessing(false)
        }
      })
  }

  const createProfile = async (user) => {
    try {
      await setDoc(doc(firestore, "users", user.id), user)
      window.toastify("User profile created.", "success")
    } catch (error) {
      console.error('error', error)
      window.toastify("User profile not created.", "error")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-700 to-violet-500 px-4">
      <div className="p-4 rounded-lg bg-white w-full max-w-md py-5">

        <Title level={1} className="text-center">
          Register
        </Title>
        <Paragraph className="text-center" style={{ marginBottom: "0" }}>
          Already have an account? <Link to="/auth/login">Login</Link>
        </Paragraph>
        <Form layout="vertical">
          <Row>
            <Col span={24} className="mt-3">
              <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: "Please enter your full name" }, { min: 3, message: "Full Name must be at least 3 characters" }]}>
                <Input
                  name="fullName"
                  placeholder="Full Name"
                  size="large"
                  type="text"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Please enter a valid email" }]}>
                <Input
                  name="email"
                  placeholder="Email"
                  size="large"
                  type="email"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }, { min: 6, message: "Password must be at least 6 characters" }]}>
                <Input.Password
                  name="password"
                  placeholder="Password"
                  size="large"
                  type="password"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: "Please confirm your password" }]}>
                <Input.Password
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  size="large"
                  type="password"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button type="primary" loading={isProcessing} htmlType="submit" block size="large" onClick={handleRegister}>
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )

}

export default Register