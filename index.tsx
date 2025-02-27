import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App'
import { Provider } from 'react-redux'
import { setupStore } from './src/store'

const store = setupStore()
// @ts-expect-error qwe
window.store = store
// @ts-expect-error qwe
window.disp = (type: string, payload: any) => {
  console.log(`Dispatch ${type}: ${JSON.stringify(payload)}`)
  store.dispatch({ type, payload })
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
