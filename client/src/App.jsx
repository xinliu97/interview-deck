import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { useLocalStore } from './hooks/useLocalStore'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

export default function App() {
  const store = useLocalStore()
  return (
    <BrowserRouter>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            Interview Deck
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            首页
          </Button>
          <Button color="inherit" component={RouterLink} to="/fav">
            收藏
          </Button>
          {store.token ? (
            <Button color="inherit" onClick={store.logout}>
              退出
            </Button>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                登录
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                注册
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<Home store={store} />} />
          <Route path="/fav" element={<Favorites store={store} />} />
          <Route path="/login" element={<Login store={store} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
