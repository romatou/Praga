import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

import Login from './Login'

describe('Login component', () => {
  it('Login component renders', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    expect(screen.getByText(/вход/i)).toBeInTheDocument()
  })

  it('login input in dom', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    expect(screen.getByLabelText(/логин/i)).toBeInTheDocument()
  })

  it('login onChange works', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const input = screen.getByLabelText(/логин/i) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'myLogin' } })
    expect(input.value).toBe('myLogin')
  })

  it('password onChange works', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const input = screen.getByLabelText(/Пароль/i) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'myPassword' } })
    expect(input.value).toBe('myPassword')
  })
})
