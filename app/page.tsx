'use client'

import { useState } from 'react'
import MovieSearch from '@/components/MovieSearch'
import MovieDetails from '@/components/MovieDetails'

export default function Home() {
  const [movieData, setMovieData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (imdbId: string) => {
    setLoading(true)
    setError('')
    setMovieData(null)

    try {
      const res = await fetch(`/api/movie?imdbId=${imdbId}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to fetch movie')
      
      setMovieData(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '800',
            background: 'linear-gradient(135deg, #7877c6 0%, #5e5ba7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            🎬 AI Movie Insight Builder
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', fontWeight: '500' }}>
            Discover movies with AI-powered sentiment analysis
          </p>
        </div>
        <MovieSearch onSearch={handleSearch} loading={loading} />
        {error && <div className="error">⚠️ {error}</div>}
        {loading && <div className="loading">🔍 Analyzing movie</div>}
        {movieData && <MovieDetails data={movieData} />}
      </div>
    </div>
  )
}
