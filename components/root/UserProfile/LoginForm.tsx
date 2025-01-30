'use client'

import { Button, Form, Input } from 'antd'
import { useEnvironmentVariables } from '@/components/power-plants/manage/EnvironmentVariablesProvider'
import { toast } from 'react-toastify'
import { setCookie } from 'cookies-next'
import crypto from 'crypto'

interface LoginFormProps {
  onLoginSuccess: () => void
}

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [form] = Form.useForm()
  const { DATA_API } = useEnvironmentVariables()

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      //   const hashedPassword = await hashPassword(values.password)
      const response = await fetch(`${DATA_API}/auth/login?username=${values.username}&password=${values.password}`, {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.text()
        const [jwtToken, userId, isAdmin] = JSON.parse(data)
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('userId', userId)
        localStorage.setItem('isAdmin', isAdmin)
        setCookie('token', jwtToken, {
          httpOnly: false,
          maxAge: 60 * 60 * 24,
          path: '/',
        })
        toast('Login successful')
        onLoginSuccess()
      } else {
        toast('Login failed')
      }
    } catch (error) {
      toast('Login failed')
    }
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleSubmit}>
      <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please enter your Username' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' block>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}
