import { useState } from 'react'

export default function QuestionCard({ q, store }) {
  const [showAnswer, setShowAnswer] = useState(false)
  const [note, setNote] = useState(store.notes[q.id] || '')

  const status = store.status[q.id] || '未开始'
  const statusCycle = ['未开始', '已刷', '多刷']

  const handleStatusClick = () => {
    const idx = statusCycle.indexOf(status)
    const next = statusCycle[(idx + 1) % statusCycle.length]
    store.setStatus(q.id, next)
  }

  const handleBlur = () => {
    store.setNote(q.id, note)
  }

  return (
    <div className="bg-white border border-gray-200 shadow rounded-lg p-4 mb-4 transition-shadow hover:shadow-lg">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{q.question}</h3>
        <button onClick={() => store.toggleFavorite(q.id)}>
          {store.favorites.includes(q.id) ? '★' : '☆'}
        </button>
      </div>
      <div className="text-sm text-gray-500 mb-2">分类：{q.category}</div>
      <button className="text-blue-600 mb-2" onClick={() => setShowAnswer(v => !v)}>
        {showAnswer ? '隐藏答案' : '查看答案'}
      </button>
      {showAnswer && (
        <p className="mb-2 text-gray-700 transition-opacity duration-300">{q.answer}</p>
      )}
      <textarea
        className="w-full border rounded p-2 mb-2 text-sm"
        placeholder="个人笔记"
        value={note}
        onChange={e => setNote(e.target.value)}
        onBlur={handleBlur}
      />
      <button
        className="text-sm bg-gray-200 px-2 py-1 rounded"
        onClick={handleStatusClick}
      >
        状态：{status}
      </button>
    </div>
  )
}
