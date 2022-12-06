import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import { setupStore } from './store'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

const store = setupStore()

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      })
      .catch((error: string) => {
        console.log('ServiceWorker registration failed: ', error)
      })
  }
})

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <App />
          </div>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)
