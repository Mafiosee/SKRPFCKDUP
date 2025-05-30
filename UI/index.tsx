import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App'
import { Provider } from 'react-redux'
import { setupStore } from './src/store'
import { RPC } from './src/utils/RPC'

const store = setupStore()
// @ts-expect-error qwe
window.store = store
// @ts-expect-error qwe
window.disp = (type: string, payload: any) => {
  store.dispatch({ type, payload })
}
// @ts-expect-error qwe
window.handleRPC = (content: string) => {
  RPC.handleMessage(JSON.parse(content))
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
