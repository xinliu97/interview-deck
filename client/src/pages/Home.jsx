import { useState } from 'react'
import { allQuestions } from '../data'
import QuestionCard from '../components/QuestionCard'
import QuestionTable from '../components/QuestionTable'
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
const difficulties = ['all', 'Easy', 'Medium', 'Hard']

export default function Home({ store }) {
  const [keyword, setKeyword] = useState('')
  const [cat, setCat] = useState('all')
  const [diff, setDiff] = useState('all')

  const filtered = allQuestions.filter(q => {
    const text = q.title || q.question
    const matchKeyword = text.includes(keyword)
    const matchCat = cat === 'all' || q.category === cat
    const matchDiff = diff === 'all' || (q.difficulty || 'all') === diff
    return matchKeyword && matchCat && matchDiff
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
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="diff-label">难度</InputLabel>
          <Select
            labelId="diff-label"
            label="难度"
            value={diff}
            onChange={e => setDiff(e.target.value)}
          >
            {difficulties.map(d => (
              <MenuItem key={d} value={d}>
                {d === 'all' ? '全部' : d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <QuestionTable questions={filtered} store={store} />
    </Box>
  )
}
