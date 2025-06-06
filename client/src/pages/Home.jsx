import { useState } from 'react'
import { questions } from '../data'
import QuestionCard from '../components/QuestionCard'

const categories = ['all', 'frontend', 'backend', 'system', 'algorithm']

export default function Home({ store }) {
  const [keyword, setKeyword] = useState('')
  const [cat, setCat] = useState('all')

  const filtered = questions.filter(q => {
    const matchKeyword = q.question.includes(keyword)
    const matchCat = cat === 'all' || q.category === cat
    return matchKeyword && matchCat
  })

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">面试知识卡片库</h1>
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <input
          className="border border-gray-300 rounded-md p-2 flex-1 min-w-40 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="搜索题目"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={cat}
          onChange={e => setCat(e.target.value)}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c === 'all' ? '全部' : c}</option>
          ))}
        </select>
      </div>
      {filtered.map(q => (
        <QuestionCard key={q.id} q={q} store={store} />
      ))}
    </div>
  )
}
