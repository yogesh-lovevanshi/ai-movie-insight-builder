# AI Movie Insight Builder

A Next.js application that fetches movie details from IMDb and provides AI-powered sentiment analysis of audience reviews.

## 🚀 Features

- Search movies by IMDb ID
- Display movie details (poster, cast, rating, plot)
- AI-powered sentiment analysis of reviews
- Responsive design for mobile and desktop
- Modern UI with smooth animations
- Error handling and validation

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **CSS3** - Custom styling with animations

### Backend
- **Next.js API Routes** - Serverless functions
- **OMDb API** - Movie data fetching
- **OpenAI API** - Sentiment analysis

### Testing
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing

## 📋 Prerequisites

- Node.js 18+ installed
- OMDb API key (free from http://www.omdbapi.com/apikey.aspx)
- OpenAI API key (from https://platform.openai.com/api-keys)

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   cd ai-movie-insight-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```
   OMDB_API_KEY=your_omdb_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

5. **Run tests**
   ```bash
   npm test
   ```

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Alternative Platforms
- **Netlify**: Connect GitHub repo and configure build settings
- **Railway**: Deploy with automatic HTTPS

## 🎯 Usage

1. Enter an IMDb movie ID (e.g., `tt0133093` for The Matrix)
2. Click "Search" button
3. View movie details and AI sentiment analysis

### Example IMDb IDs
- `tt0133093` - The Matrix
- `tt0111161` - The Shawshank Redemption
- `tt0468569` - The Dark Knight
- `tt0109830` - Forrest Gump

## 🏗️ Project Structure

```
├── app/
│   ├── api/movie/       # API route for movie data
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── MovieSearch.tsx  # Search input component
│   └── MovieDetails.tsx # Movie display component
├── lib/
│   └── movieService.ts  # API integration logic
├── __tests__/
│   └── MovieSearch.test.tsx  # Unit tests
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🧪 Testing

The project includes unit tests for components:

```bash
npm test
```

Tests cover:
- Component rendering
- User interactions
- Form validation
- Loading states

## 🎨 Design Decisions & Tech Stack Rationale

### Why Next.js 14?
**Justification:**
- **Full-stack in one**: Combines React frontend + Node.js backend (API routes)
- **Server-side rendering**: Better SEO and initial load performance
- **Built-in optimizations**: Automatic code splitting, image optimization, font loading
- **Easy deployment**: One-click deploy to Vercel with zero configuration
- **Scalability**: Serverless architecture scales automatically
- **Industry standard**: Used by Netflix, Uber, TikTok for production apps

**Aligns with company focus:** Scalable web/mobile applications

### Why TypeScript?
**Justification:**
- **Type safety**: Catches errors at compile-time, not runtime
- **Better DX**: Autocomplete, IntelliSense, refactoring tools
- **Self-documenting**: Types serve as inline documentation
- **Maintainability**: Easier to understand and modify code
- **Industry adoption**: 78% of developers prefer TypeScript over JavaScript

**Aligns with company focus:** Maintainable, production-ready code

### Why React 18?
**Justification:**
- **Component-based**: Reusable, testable UI components
- **Large ecosystem**: Extensive libraries and community support
- **Performance**: Virtual DOM for efficient updates
- **Mobile-ready**: React Native for future mobile expansion

**Aligns with company focus:** Web and mobile app development

### Why OpenAI GPT-3.5?
**Justification:**
- **Best-in-class NLP**: Most accurate sentiment analysis available
- **Context understanding**: Analyzes nuance, not just keywords
- **Reliable API**: 99.9% uptime, well-documented
- **Fallback included**: Keyword-based analysis if API fails

**Aligns with company focus:** AI-powered features

### Why Axios over Fetch?
**Justification:**
- **Better error handling**: Automatic error throwing for bad status codes
- **Timeout support**: Built-in request timeouts
- **Interceptors**: Easy to add auth, logging, retry logic
- **Automatic JSON**: No manual `.json()` calls needed

### Why Cheerio for Scraping?
**Justification:**
- **jQuery-like syntax**: Familiar, easy to use
- **Server-side**: No browser overhead, faster
- **Lightweight**: 2MB vs Puppeteer's 300MB
- **Sufficient**: HTML parsing is all we need

### Architecture Decisions

**Modular Structure:**
```
✅ Separation of concerns (UI, API, Services)
✅ Single responsibility per file
✅ Reusable components
✅ Clean dependency flow
```

**Error Handling Strategy:**
```
✅ Try-catch at every async operation
✅ User-friendly error messages
✅ Graceful fallbacks (scraping, AI)
✅ Never crash the app
```

**Performance Optimizations:**
```
✅ Timeout limits (5-10s)
✅ Review length limiting
✅ Efficient re-renders
✅ Image lazy loading ready
```

## 🔒 Security

- API keys stored in environment variables
- Input validation for IMDb IDs
- Error handling for API failures
- No sensitive data in client-side code

## 🚧 Assumptions

### 1. **Movie Data Source**
- **Assumption**: OMDb API provides accurate and up-to-date movie information
- **Rationale**: OMDb is the official IMDb API partner
- **Impact**: Movie details (title, cast, plot) are reliable

### 2. **Review Data**
- **Assumption**: Real-time IMDb review scraping may be blocked
- **Rationale**: IMDb actively prevents automated scraping
- **Solution**: Implemented fallback to generated reviews based on movie ratings
- **Production**: Would use paid review API or cached database

### 3. **Sentiment Analysis**
- **Assumption**: IMDb rating (1-10) correlates with audience sentiment
- **Logic**: 
  - Rating < 4.0 → Negative sentiment
  - Rating 4.0-6.0 → Mixed sentiment  
  - Rating > 6.0 → Positive sentiment
- **Rationale**: Industry-standard rating interpretation

### 4. **API Availability**
- **Assumption**: OpenAI API may not always be available or configured
- **Solution**: Fallback to template-based sentiment summaries
- **Impact**: App works even without OpenAI API key

### 5. **User Knowledge**
- **Assumption**: Users know how to find IMDb IDs
- **Solution**: Provided quick example buttons (tt0133093, etc.)
- **Future**: Add search by movie title feature

### 6. **Browser Support**
- **Assumption**: Users have modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- **Rationale**: Using modern CSS (Grid, backdrop-filter)
- **Impact**: Best experience on recent browsers

### 7. **Network Conditions**
- **Assumption**: Users have stable internet connection
- **Solution**: Implemented 5-10s timeouts for API calls
- **Impact**: App doesn't hang on slow connections

### 8. **API Rate Limits**
- **Assumption**: OMDb free tier (1,000 requests/day) is sufficient for demo
- **Production**: Would upgrade to paid tier or implement caching

### 9. **Data Privacy**
- **Assumption**: No user data needs to be stored
- **Rationale**: Stateless application, no authentication required
- **Impact**: No database or session management needed

### 10. **Deployment Environment**
- **Assumption**: Deployed on Vercel or similar Node.js platform
- **Rationale**: Next.js is optimized for Vercel
- **Impact**: Serverless functions, automatic scaling

## 🎁 Bonus Features

- Smooth animations and transitions
- Responsive design (mobile-first)
- Loading states and error handling
- Fallback sentiment analysis when AI fails
- Clean, modern UI with gradient backgrounds

## 📝 Future Enhancements

- Real review scraping from IMDb
- Search by movie title
- Save favorite movies
- Compare multiple movies
- More detailed analytics

## 👨‍💻 Development

Built with modern best practices:
- Clean, modular code structure
- Separation of concerns
- Reusable components
- Type safety throughout
- Comprehensive error handling

## 📄 License

This project is created for the SDE Intern Assignment II.

## 📧 Contact

For queries: abhay@brew.tv
