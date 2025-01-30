'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { toast } from 'react-toastify'
import { useEnvironmentVariables } from '@/components/power-plants/manage/EnvironmentVariablesProvider'

interface User {
  id: string
  username: string
  email: string
  password: string
  role: string
  enabled: boolean
  authorities: { authority: string }[]
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
}

export default function EditProfileForm() {
  const [editType, setEditType] = useState<'username' | 'password' | 'email' | null>(null)
  const [form] = Form.useForm()
  const { DATA_API } = useEnvironmentVariables()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const response = await fetch(`${DATA_API}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const fetchedUser = await response.json()
          setUser(fetchedUser)
        } else {
          toast('Failed to fetch user')
        }
      } catch (error) {
        toast('Failed to fetch user')
      }
    }
    fetchUserInformation()
  }, [])

  const handleSubmit = async (values: { newValue: string }) => {
    if (!user || !editType) return

    const updatedUser = { ...user, [editType]: values.newValue }
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${DATA_API}/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })
      if (response.ok) {
        console.log('Hier4')
        toast('User edit successful')
        setEditType(null)
      } else {
        console.log('Hier5')
        toast('User edit failed')
      }
    } catch (error) {
      toast('User edit failed')
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {editType ? (
        <>
          <Form form={form} layout='vertical' onFinish={handleSubmit}>
            <Form.Item label={`New ${editType}`} name='newValue' rules={[{ required: true, message: `Please enter your new ${editType}!` }]}>
              <Input />
            </Form.Item>
            <div className='flex justify-between'>
              <Button onClick={() => setEditType(null)} type='default'>
                Back
              </Button>
              <Button type='primary' htmlType='submit'>
                Save Changes
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <>
          <Button onClick={() => setEditType('username')} block>
            Edit Username
          </Button>
          <Button onClick={() => setEditType('password')} block>
            Edit Password
          </Button>
          <Button onClick={() => setEditType('email')} block>
            Edit Email
          </Button>
        </>
      )}
    </div>
  )
}
