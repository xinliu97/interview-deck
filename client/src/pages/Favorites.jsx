import { questions } from '../data'
import QuestionCard from '../components/QuestionCard'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'

export default function Favorites({ store }) {
  const [tab, setTab] = useState(0)
  const favQuestions = questions.filter(q => store.favorites.includes(q.id))
  const noteQuestions = questions.filter(q => store.notes[q.id])

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        我的收藏
      </Typography>
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="题目" />
        <Tab label="笔记" />
      </Tabs>
      {tab === 0 ? (
        favQuestions.length === 0 ? (
          <Typography>暂无收藏</Typography>
        ) : (
          favQuestions.map(q => (
            <QuestionCard key={q.id} q={q} store={store} />
          ))
        )
      ) : noteQuestions.length === 0 ? (
        <Typography>暂无笔记</Typography>
      ) : (
        <List>
          {noteQuestions.map(q => (
            <ListItem key={q.id} alignItems="flex-start">
              <ListItemText primary={q.question} secondary={store.notes[q.id]} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}
