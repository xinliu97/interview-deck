import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useLocalStore } from './hooks/useLocalStore'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import './App.css'

export default function App() {
  const store = useLocalStore()
  return (
    <BrowserRouter>
      <nav className="bg-white shadow">
        <div className="max-w-3xl mx-auto p-4 flex items-center gap-6">
          <Link to="/" className="font-semibold text-lg text-gray-900 mr-auto">Interview Deck</Link>
          <Link to="/" className="text-gray-600 hover:text-blue-600">首页</Link>
          <Link to="/fav" className="text-gray-600 hover:text-blue-600">收藏</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home store={store} />} />
        <Route path="/fav" element={<Favorites store={store} />} />
      </Routes>
    </BrowserRouter>
  )
}
