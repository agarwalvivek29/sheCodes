import dataReducer from './data-slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        data: dataReducer,
    },
});
  
export default store;