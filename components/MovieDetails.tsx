'use client'

import { useState } from 'react'

interface MovieData {
  Title: string
  Year: string
  Poster: string
  Plot: string
  Actors: string
  imdbRating: string
  Genre: string
  Director: string
  sentiment: {
    summary: string
    classification: string
  }
}

export default function MovieDetails({ data }: { data: MovieData }) {
  const [imageError, setImageError] = useState(false)

  const getSentimentEmoji = (classification: string) => {
    switch(classification) {
      case 'positive': return '😊'
      case 'negative': return '😞'
      case 'mixed': return '🤔'
      default: return '🤖'
    }
  }

  const getSentimentColor = (classification: string) => {
    switch(classification) {
      case 'positive': return '#10b981'
      case 'negative': return '#ef4444'
      case 'mixed': return '#f59e0b'
      default: return '#7877c6'
    }
  }

  return (
    <div className="movie-details">
      <div className="poster">
        {data.Poster !== 'N/A' && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.Poster}
            alt={data.Title}
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={{ 
            width: '100%',
            aspectRatio: '2/3',
            background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#6b7280',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            fontWeight: '600'
          }}>
            🎬 No Poster
          </div>
        )}
      </div>
      
      <div className="info">
        <h1>{data.Title}</h1>
        
        <div className="meta">
          <span>⭐ {data.imdbRating}/10</span>
          <span>📅 {data.Year}</span>
          <span>🎭 {data.Genre}</span>
        </div>
        
        <div className="cast">
          <strong>🎬 Director:</strong> {data.Director}
        </div>
        
        <div className="cast">
          <strong>🎭 Cast:</strong> {data.Actors}
        </div>
        
        <div style={{ 
          marginTop: 'clamp(1rem, 2vw, 1.5rem)',
          padding: 'clamp(1rem, 2vw, 1.5rem)',
          background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <strong style={{ color: '#374151', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>📜 Plot</strong>
          <p style={{ marginTop: '0.75rem', lineHeight: '1.7', color: '#4b5563', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{data.Plot}</p>
        </div>
        
        <div className={`sentiment ${data.sentiment.classification}`}>
          <h3 style={{ 
            marginBottom: '1rem',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {getSentimentEmoji(data.sentiment.classification)}
            <span>AI Sentiment</span>
            <span style={{
              marginLeft: 'auto',
              padding: '0.4rem 1rem',
              background: getSentimentColor(data.sentiment.classification),
              color: 'white',
              borderRadius: '20px',
              fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {data.sentiment.classification}
            </span>
          </h3>
          <p style={{ lineHeight: '1.7', color: '#4b5563', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
            {data.sentiment.summary}
          </p>
        </div>
      </div>
    </div>
  )
}
