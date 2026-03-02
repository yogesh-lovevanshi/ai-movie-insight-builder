import { NextRequest, NextResponse } from 'next/server'
import { getMovieDetails, getMovieReviews, analyzeSentiment } from '@/lib/movieService'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const imdbId = searchParams.get('imdbId')

  // Validation: Missing IMDb ID
  if (!imdbId) {
    return NextResponse.json({ error: 'IMDb ID is required' }, { status: 400 })
  }

  // Validation: Invalid IMDb ID format
  if (!imdbId.match(/^tt\d{7,8}$/)) {
    return NextResponse.json({ error: 'Invalid IMDb ID format. Must be like tt0133093' }, { status: 400 })
  }

  // Validation: API key check
  if (!process.env.OMDB_API_KEY) {
    return NextResponse.json({ error: 'Server configuration error: OMDB API key missing' }, { status: 500 })
  }

  try {
    const movieDetails = await getMovieDetails(imdbId)
    const reviews = await getMovieReviews(imdbId)
    const sentiment = await analyzeSentiment(reviews, movieDetails.Title, movieDetails.Rating)

    return NextResponse.json({
      ...movieDetails,
      sentiment
    })
  } catch (error: any) {
    console.error('API Error:', error)
    
    // Handle specific error types
    if (error.message.includes('not found')) {
      return NextResponse.json({ error: 'Movie not found. Please check the IMDb ID.' }, { status: 404 })
    }
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return NextResponse.json({ error: 'Request timeout. Please try again.' }, { status: 504 })
    }
    
    return NextResponse.json({ error: error.message || 'Failed to fetch movie data' }, { status: 500 })
  }
}
