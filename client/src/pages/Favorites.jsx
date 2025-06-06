import { questions } from '../data'
import QuestionCard from '../components/QuestionCard'

export default function Favorites({ store }) {
  const list = questions.filter(q => store.favorites.includes(q.id))
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">收藏的题目</h1>
      {list.length === 0 && <p>暂无收藏</p>}
      {list.map(q => (
        <QuestionCard key={q.id} q={q} store={store} />
      ))}
    </div>
  )
}
