import { questions } from '../data'
import QuestionCard from '../components/QuestionCard'
import { Box, Typography } from '@mui/material'

export default function Favorites({ store }) {
  const list = questions.filter(q => store.favorites.includes(q.id))
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        收藏的题目
      </Typography>
      {list.length === 0 && <Typography>暂无收藏</Typography>}
      {list.map(q => (
        <QuestionCard key={q.id} q={q} store={store} />
      ))}
    </Box>
  )
}
