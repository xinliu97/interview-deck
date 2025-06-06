import { useState } from 'react'
import { questions } from '../data'
import QuestionCard from '../components/QuestionCard'
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'

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
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        面试知识卡片库
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <TextField
          label="搜索题目"
          variant="outlined"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          sx={{ flex: 1, minWidth: 160 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="cat-label">分类</InputLabel>
          <Select
            labelId="cat-label"
            label="分类"
            value={cat}
            onChange={e => setCat(e.target.value)}
          >
            {categories.map(c => (
              <MenuItem key={c} value={c}>
                {c === 'all' ? '全部' : c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {filtered.map(q => (
        <QuestionCard key={q.id} q={q} store={store} />
      ))}
    </Box>
  )
}
