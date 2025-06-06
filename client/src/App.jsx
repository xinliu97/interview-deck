import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useLocalStore } from './hooks/useLocalStore'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import './App.css'

export default function App() {
  const store = useLocalStore()
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link to="/" className="font-semibold text-lg mr-auto">Interview Deck</Link>
          <Link to="/" className="hover:underline">首页</Link>
          <Link to="/fav" className="hover:underline">收藏</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home store={store} />} />
        <Route path="/fav" element={<Favorites store={store} />} />
      </Routes>
    </BrowserRouter>
  )
}
