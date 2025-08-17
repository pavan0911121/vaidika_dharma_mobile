import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Reducers/LginReducer'

export const store = configureStore({
    reducer: {
     LOGIN_REDUCER: loginReducer,
    },
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})
export type RootState = ReturnType<typeof store.getState>;