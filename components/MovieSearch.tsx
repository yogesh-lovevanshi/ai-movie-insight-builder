'use client'

import { useState } from 'react'

interface Props {
  onSearch: (imdbId: string) => void
  loading: boolean
}

export default function MovieSearch({ onSearch, loading }: Props) {
  const [imdbId, setImdbId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (imdbId.trim()) {
      onSearch(imdbId.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter IMDb ID (e.g., tt0133093 for The Matrix)"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? '🔍 Searching...' : '🔎 Search Movie'}
        </button>
      </div>
    </form>
  )
}
