import { useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  TextField,
  Box,
} from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'

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
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6">{q.question}</Typography>
          <IconButton onClick={() => store.toggleFavorite(q.id)} color="warning">
            {store.favorites.includes(q.id) ? <Star /> : <StarBorder />}
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          分类：{q.category}
        </Typography>
        <Button size="small" onClick={() => setShowAnswer(v => !v)} sx={{ mb: 1 }}>
          {showAnswer ? '隐藏答案' : '查看答案'}
        </Button>
        {showAnswer && (
          <Typography sx={{ mb: 1 }} color="text.primary">
            {q.answer}
          </Typography>
        )}
        <TextField
          fullWidth
          multiline
          size="small"
          placeholder="个人笔记"
          value={note}
          onChange={e => setNote(e.target.value)}
          onBlur={handleBlur}
          sx={{ mb: 1 }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleStatusClick}>
          状态：{status}
        </Button>
      </CardActions>
    </Card>
  )
}
