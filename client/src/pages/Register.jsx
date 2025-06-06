import { useState } from 'react'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setMessage('')
    if (password !== confirm) {
      setError('密码不一致')
      return
    }
    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Register failed')
      setMessage('注册成功，请登录')
      setUsername('')
      setPassword('')
      setConfirm('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 360, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" textAlign="center">注册</Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="用户名" value={username} onChange={e => setUsername(e.target.value)} required />
      <TextField label="密码" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <TextField label="确认密码" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
      <Button variant="contained" type="submit">注册</Button>
    </Box>
  )
}
