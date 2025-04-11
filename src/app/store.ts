import { configureStore } from '@reduxjs/toolkit';
import dashboard from '../component/features/dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    dashboard,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
