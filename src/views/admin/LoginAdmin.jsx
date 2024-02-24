import React from 'react'
import { useAuth } from '../../routes/context/AuthContext'

const LoginAdmin = () => {
  useAuth()
  return (
    <div>LoginAdmin</div>
  )
}

export default LoginAdmin