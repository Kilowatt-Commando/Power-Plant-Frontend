'use client'

import Link from 'next/link'
import './login.css'
import React, { useState } from 'react'
// import { useAuth } from '@/components/root/AuthProvider'
import { useRouter } from 'next/navigation'

// npm isntall jsonwebtoken
// npm install --save-dev @types/jsonwebtoken

const LoginPage: React.FC = () => {
  const router = useRouter()
  // const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const path = 'http://188.245.157.176:9090/api/auth'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${path}/login?username=${username}&password=${password}`, {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.text()
        const [jwtToken, userId] = JSON.parse(data)
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('userId', userId)
        alert('Login erfolgreich!')
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Login fehlgeschlagen')
      }
    } catch (error) {
      console.error('Fehler beim Login:', error)
      alert('Ein Fehler ist aufgetreten')
    }
  }

  return (
    <div className='login-page'>
      <form className='login-container' onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className='form-item'>
          <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <span className='icon'>👤</span>
        </div>
        <div className='form-item'>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <span className='icon'>🔒</span>
        </div>
        <button className='login-button' type='submit'>
          Login
        </button>
        <p>
          Don’t have an account?{' '}
          <Link href='/login/register' className='register-link'>
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
