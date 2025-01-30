'use client'

import { Button, Form, Input } from 'antd'
import { toast } from 'react-toastify'
import { useEnvironmentVariables } from '@/components/power-plants/manage/EnvironmentVariablesProvider'

interface RegisterFormProps {
  onRegisterSuccess: () => void
}

export default function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const [form] = Form.useForm()
  const { DATA_API } = useEnvironmentVariables()

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      const response = await fetch(`${DATA_API}/users/register`, {
        method: 'POST',
        body: JSON.stringify({ username: values.name, email: values.email, password: values.password }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        toast('Register successfull')
        onRegisterSuccess()
      } else {
        toast('Register failed')
      }
    } catch (error) {
      toast('Register failed')
    }
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleSubmit}>
      <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please enter your name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Email' name='email' rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please enter your password!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' block>
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}
