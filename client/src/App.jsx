import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
} from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useMemo, useState, useEffect } from 'react'
import { useLocalStore } from './hooks/useLocalStore'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Stats from './pages/Stats'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

export default function App() {
  const store = useLocalStore()
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light')
  useEffect(() => {
    localStorage.setItem('mode', mode)
  }, [mode])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#1a73e8' },
        },
        typography: {
          fontFamily: ['Roboto', 'Inter', 'sans-serif'].join(','),
        },
      }),
    [mode],
  )

  const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <Button color="inherit" component={RouterLink} to="/stats">
            数据可视化
          </Button>
          <IconButton color="inherit" onClick={toggleMode}>
            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
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
          <Route path="/stats" element={<Stats store={store} />} />
          <Route path="/login" element={<Login store={store} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </BrowserRouter>
    </ThemeProvider>
  )
}
