import { render, screen, fireEvent } from '@testing-library/react'
import MovieSearch from '@/components/MovieSearch'

describe('MovieSearch Component', () => {
  it('renders search input and button', () => {
    const mockOnSearch = jest.fn()
    render(<MovieSearch onSearch={mockOnSearch} loading={false} />)
    
    expect(screen.getByPlaceholderText(/Enter IMDb ID/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument()
  })

  it('calls onSearch with input value on submit', () => {
    const mockOnSearch = jest.fn()
    render(<MovieSearch onSearch={mockOnSearch} loading={false} />)
    
    const input = screen.getByPlaceholderText(/Enter IMDb ID/i)
    const button = screen.getByRole('button', { name: /Search/i })
    
    fireEvent.change(input, { target: { value: 'tt0133093' } })
    fireEvent.click(button)
    
    expect(mockOnSearch).toHaveBeenCalledWith('tt0133093')
  })

  it('disables input and button when loading', () => {
    const mockOnSearch = jest.fn()
    render(<MovieSearch onSearch={mockOnSearch} loading={true} />)
    
    expect(screen.getByPlaceholderText(/Enter IMDb ID/i)).toBeDisabled()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
