import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { RootState, setupStore } from './store'

const store = setupStore(window.__PRELOADED_STATE__)

declare global {
  interface Window {
    __PRELOADED_STATE__: RootState
  }
}


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


ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)
