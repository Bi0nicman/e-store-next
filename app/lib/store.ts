import  favouritesReducer  from './slices/gameSlice'
import { configureStore } from '@reduxjs/toolkit'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;