import { useState } from 'react'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'

export default function Login({ store }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      store.setToken(data.token)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 360, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" textAlign="center">登录</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="用户名" value={username} onChange={e => setUsername(e.target.value)} required />
      <TextField label="密码" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <Button variant="contained" type="submit">登录</Button>
    </Box>
  )
}
