import { useState } from 'react'
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer } from 'recharts'
import { useStats } from '../hooks/useStats'
import { allQuestions } from '../data'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042']

function getLastDates(progress, days) {
  const arr = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    arr.push({ date: key.slice(5), count: progress[key] || 0 })
  }
  return arr
}

export default function Stats({ store }) {
  const { progress } = useStats()
  const [range, setRange] = useState(7)

  const lineData = getLastDates(progress, range)

  const categoryCount = {
    frontend: 0,
    backend: 0,
    system: 0,
    algorithm: 0,
  }
  const statusCount = { '未开始': 0, '已刷': 0, '多刷': 0 }
  allQuestions.forEach(q => {
    const s = store.status[q.id] || '未开始'
    statusCount[s] += 1
    if (s !== '未开始') categoryCount[q.category] += 1
  })

  const pieData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }))
  const barData = Object.entries(statusCount).map(([status, count]) => ({ status, count }))

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        数据可视化
      </Typography>
      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup value={range} exclusive onChange={(e, v) => v && setRange(v)} size="small">
          <ToggleButton value={7}>7天</ToggleButton>
          <ToggleButton value={30}>30天</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={lineData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#1a73e8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 4 }}>
        <Box sx={{ flex: 1, minWidth: 260, height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ flex: 1, minWidth: 260, height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={barData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  )
}
