import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'deck_store_v1'

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function writeStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function useLocalStore() {
  const [store, setStore] = useState(() => readStore())

  useEffect(() => {
    writeStore(store)
  }, [store])

  const toggleFavorite = useCallback(id => {
    setStore(prev => {
      const favs = new Set(prev.favorites || [])
      if (favs.has(id)) favs.delete(id)
      else favs.add(id)
      return { ...prev, favorites: Array.from(favs) }
    })
  }, [])

  const setNote = useCallback((id, note) => {
    setStore(prev => ({ ...prev, notes: { ...(prev.notes || {}), [id]: note } }))
  }, [])

  const setStatus = useCallback((id, status) => {
    setStore(prev => ({ ...prev, status: { ...(prev.status || {}), [id]: status } }))
  }, [])

  return {
    favorites: store.favorites || [],
    notes: store.notes || {},
    status: store.status || {},
    toggleFavorite,
    setNote,
    setStatus,
  }
}
