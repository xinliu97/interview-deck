import { useState, useEffect } from 'react'

const KEY = 'deck_stats_v1'

function formatDate(d) {
  return d.toISOString().slice(0, 10)
}

function generateSampleProgress() {
  const progress = {}
  const today = new Date()
  for (let i = 0; i < 90; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    progress[formatDate(date)] = Math.floor(Math.random() * 4)
  }
  return progress
}

function init() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (saved) return saved
  } catch {
    /* ignore */
  }
  const data = { progress: generateSampleProgress() }
  localStorage.setItem(KEY, JSON.stringify(data))
  return data
}

export function useStats() {
  const [data] = useState(() => init())

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(data))
  }, [data])

  return data
}
