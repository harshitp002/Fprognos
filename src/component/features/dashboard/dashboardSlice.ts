import { createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  totalPNL: number;
  pnlCards: { id: string; pnl: number }[];
}

const initialState: DashboardState = {
  totalPNL: 3738790,
  pnlCards: Array(6).fill({ id: 'IIFL 93939393', pnl: -3839290 }),
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;