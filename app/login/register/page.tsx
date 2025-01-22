'use client'

import Link from 'next/link'
import '../login.css'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

//PETER MUSS @CrossOrigin

const RegisterPage: React.FC = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const path = 'http://188.245.157.176:9090/api/users'

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== repeatPassword) {
      alert('Passwords do not match!')
      return
    }
    try {
      //${process.env.USER_API}/register
      // const plants = await fetch(`${path}/register`, {
      //   method: 'POST',
      //   cache: 'no-cache',
      //   mode: 'no-cors',
      //   body: JSON.stringify({ username: username, password: password, email: email }),
      //   headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      // }).then((res) => console.log(res))
      // console.log(plants)
      const response = await fetch(`${path}/register`, {
        method: 'POST',
        // cache: 'no-cache',
        // mode: 'no-cors',
        body: JSON.stringify({ username: username, password: password, email: email }),
        headers: { 'Content-Type': 'application/json' },
      })
      // console.log(response)
      if (response.ok) {
        // console.log('Joooooooooooooooo')
        // const data = await response.text()

        // router.push('/login')
        alert('Registrierung erfolgreich!')
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Registrierung fehlgeschlagen')
      }
    } catch (error) {
      console.error('Fehler beim Registrieren:', error)
      alert('Ein Fehler ist aufgetreten')
    }
    // Füge deine Registrierung-Logik hier hinzu
    // console.log('Registering user', { username, email, password })
    // router.push('/login')
  }

  return (
    <div className='login-page'>
      <form className='login-container' onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className='form-item'>
          <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <span className='icon'>👤</span>
        </div>
        <div className='form-item'>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <span className='icon'>📧</span>
        </div>
        <div className='form-item'>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <span className='icon'>🔒</span>
        </div>
        <div className='form-item'>
          <input type='password' placeholder='Repeat Password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
          <span className='icon'>🔒</span>
        </div>
        <button className='login-button' type='submit'>
          Register
        </button>
        <p>
          Already have an account?{' '}
          <Link href='/login' className='register-link'>
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
