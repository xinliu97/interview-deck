import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { Box, Typography, Chip, Button, TextField } from '@mui/material'
import { javascript } from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'

interface Question {
  id: number
  title: string
  category: string
  difficulty: string
  description: string
  answer: string
}

interface Progress {
  isDone: boolean
  notes: string
}

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>()
  const [question, setQuestion] = useState<Question | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [note, setNote] = useState('')
  const [code, setCode] = useState('// write your code here')
  const [progress, setProgress] = useState<Progress>({ isDone: false, notes: '' })
  const userId = 'guest'

  useEffect(() => {
    if (!id) return
    axios.get(`/api/questions/${id}`).then(res => {
      setQuestion(res.data.data)
    })
    axios
      .get(`/api/questions/${id}/progress`, { params: { userId } })
      .then(res => {
        if (res.data.data) {
          setProgress(res.data.data)
          setNote(res.data.data.notes || '')
        }
      })
  }, [id])

  const handleDone = async () => {
    await axios.post(`/api/questions/${id}/mark-done`, { userId })
    setProgress(prev => ({ ...prev, isDone: true }))
  }

  const handleSaveNote = async () => {
    await axios.post(`/api/questions/${id}/notes`, { userId, notes: note })
  }

  if (!question) return <Typography>Loading...</Typography>

  const diffColor =
    question.difficulty === 'Easy'
      ? 'success'
      : question.difficulty === 'Medium'
      ? 'warning'
      : 'error'

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          {question.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label={question.category} size="small" />
          <Chip label={question.difficulty} size="small" color={diffColor as any} />
        </Box>
        <ReactMarkdown>{question.description}</ReactMarkdown>
        {showAnswer && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              参考答案
            </Typography>
            <ReactMarkdown>{question.answer}</ReactMarkdown>
          </Box>
        )}
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => setShowAnswer(v => !v)}>
          {showAnswer ? '隐藏答案' : '显示答案'}
        </Button>
      </Box>
      <Box sx={{ width: { xs: '100%', md: 400 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleDone} disabled={progress.isDone}>
          {progress.isDone ? '已完成' : '标记完成'}
        </Button>
        <TextField
          label="笔记"
          multiline
          minRows={4}
          value={note}
          onChange={e => setNote(e.target.value)}
          onBlur={handleSaveNote}
        />
        <CodeMirror value={code} height="200px" extensions={[javascript()]} onChange={setCode} />
      </Box>
    </Box>
  )
}
