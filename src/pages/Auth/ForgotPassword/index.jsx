import { auth } from "@/config/firebase"
import { Button, Col, Form, Input, Row, Typography } from "antd"
import { sendPasswordResetEmail } from "firebase/auth"
import React, { useState } from "react"
import { Link } from "react-router-dom"

const { Title, Paragraph } = Typography

const initialState = {
  email: ""
}

const ForgotPassword = () => {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)


  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleForgotPassword = () => {
    let { email } = state
    if (!email) {
      return window.toastify("Please enter your email", "error")
    }

    setIsProcessing(true)

    sendPasswordResetEmail(auth, email, { url: import.meta.env.VITE_CONTINUE_URL })
      .then(() => {
        window.toastify('Password reset email sent successfully', 'success')
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          window.toastify('User not found', 'error')
        } else {
          console.log(error)
          window.toastify('Something went wrong', 'error')
        }
      }).finally(() => {
        setIsProcessing(false)
      })

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-700 to-violet-500 px-4">
      <div className="p-4 rounded-lg bg-white w-full max-w-md py-5">

        <Title level={1} className="text-center">
          Forgot Password
        </Title>
        <Form layout="vertical">
          <Row>
            <Col span={24} className="mt-3">
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
            <Paragraph>Remember Password? <Link to="/auth/login">Login</Link></Paragraph>
            <Col span={24}>
              <Button type="primary" loading={isProcessing} htmlType="submit" block size="large" onClick={handleForgotPassword}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )

}

export default ForgotPassword