import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

// là kỹ thuật khi cần sử dụng biến redux store từ file ngoài phạm vi component
import { injectStore } from './utils/authorizeAxiosInstance'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
injectStore(store)

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
let persistor = persistStore(store);


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={'clientId'}>
        <App />
      </GoogleOAuthProvider>
     </PersistGate>
  </Provider>
)
