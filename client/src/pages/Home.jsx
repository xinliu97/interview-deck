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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">面试知识卡片库</h1>
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <input
          className="border rounded p-2 flex-1 min-w-40"
          placeholder="搜索题目"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <select
          className="border rounded p-2"
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
