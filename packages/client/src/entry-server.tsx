import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { setupStore } from './store'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import React from 'react'

const store = setupStore()

export function render(url: string) {
  return renderToString(
    <React.StrictMode>
        <ErrorBoundary>
            <StaticRouter location={url}>
                <Provider store={store}>
                    <App />
                </Provider>
            </StaticRouter>
        </ErrorBoundary>
  </React.StrictMode>
  )
}
