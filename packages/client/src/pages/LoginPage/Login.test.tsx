import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from '../../store/index'

import Login from './Login'

const store = setupStore()

const renderLoginComponent = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  )

describe('Login component', () => {
  it('Login component renders', () => {
    renderLoginComponent()
    expect(screen.getByText(/вход/i)).toBeInTheDocument()
  })

  it('login input in dom', () => {
    renderLoginComponent()

    expect(screen.getByLabelText(/логин/i)).toBeInTheDocument()
  })

  it('login onChange works', () => {
    renderLoginComponent()

    const input = screen.getByLabelText(/логин/i) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'myLogin' } })
    expect(input.value).toBe('myLogin')
  })

  it('password onChange works', () => {
    renderLoginComponent()

    const input = screen.getByLabelText(/Пароль/i) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'myPassword' } })
    expect(input.value).toBe('myPassword')
  })
})
