'use client'

import { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import EditProfileForm from './EditProfileForm'
import { deleteCookie, setCookie } from 'cookies-next'

export default function ProfileManagement() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
      setCookie('token', token, {
        httpOnly: false,
        maxAge: 60 * 60 * 24,
        path: '/',
      })
    }
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowLoginModal(false)
    window.location.reload()
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('isAdmin')
    deleteCookie('token')
    window.location.reload()
  }

  return (
    <div className='flex'>
      <div className='w-[300px] p-5 rounded-xl border-2 border-black flex flex-col gap-5'>
        {isLoggedIn ? (
          <>
            <Button type='primary' danger onClick={handleLogout} className='w-full p-3 rounded-lg text-lg text-center transition-all duration-300 hover:opacity-85'>
              Logout
            </Button>
            <Button onClick={() => setShowEditProfileModal(true)} className='w-full p-3 rounded-lg text-lg text-center transition-all duration-300 hover:opacity-85'>
              Edit Profile
            </Button>
          </>
        ) : (
          <Button type='primary' onClick={() => setShowLoginModal(true)} className='w-full p-3 rounded-lg text-lg text-center transition-all duration-300 hover:opacity-85'>
            Login
          </Button>
        )}

        <Button onClick={() => setShowRegisterModal(true)} className='w-full p-3 rounded-lg text-lg text-center transition-all duration-300 hover:opacity-85'>
          Register
        </Button>
      </div>

      <div className='flex-1 relative'>
        <Modal title='Login' open={showLoginModal} onCancel={() => setShowLoginModal(false)} footer={null} modalRender={(modal) => <div className='p-5'>{modal}</div>}>
          <LoginForm onLoginSuccess={handleLogin} />
        </Modal>

        <Modal title='Register' open={showRegisterModal} onCancel={() => setShowRegisterModal(false)} footer={null} modalRender={(modal) => <div className='p-5'>{modal}</div>}>
          <RegisterForm onRegisterSuccess={() => setShowRegisterModal(false)} />
        </Modal>

        <Modal title='Edit Profile' open={showEditProfileModal} onCancel={() => setShowEditProfileModal(false)} footer={null} modalRender={(modal) => <div className='p-5'>{modal}</div>}>
          <EditProfileForm />
        </Modal>
      </div>
    </div>
  )
}
