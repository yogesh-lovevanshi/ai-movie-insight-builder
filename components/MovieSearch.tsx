'use client'

import { useState } from 'react'

interface Props {
  onSearch: (imdbId: string) => void
  loading: boolean
}

const examples = [
  { id: 'tt0133093', name: 'Matrix' },
  { id: 'tt0111161', name: 'Shawshank' },
  { id: 'tt0468569', name: 'Dark Knight' },
]

export default function MovieSearch({ onSearch, loading }: Props) {
  const [imdbId, setImdbId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (imdbId.trim()) {
      onSearch(imdbId.trim())
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter IMDb ID (e.g., tt0133093)"
            value={imdbId}
            onChange={(e) => setImdbId(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? '🔍 Searching...' : '🔎 Search'}
          </button>
        </div>
      </form>
      <div className="quick-examples">
        {examples.map(ex => (
          <button
            key={ex.id}
            className="quick-btn"
            onClick={() => { setImdbId(ex.id); onSearch(ex.id); }}
            disabled={loading}
          >
            {ex.name}
          </button>
        ))}
      </div>
    </>
  )
}
