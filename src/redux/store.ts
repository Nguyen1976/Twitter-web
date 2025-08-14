import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

/**Cấu hình redux persist
 * https://edvins.io/how-to-use-redux-persist-with-redux-toolkit
 */
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'] //Mảng những slice được lưu trữ ở storage
  //blacklist ngược lại của whitelist
}

const reducers = combineReducers({
  user: userReducer
})

const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Bỏ qua kiểm tra giá trị không tuần tự hóa
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
