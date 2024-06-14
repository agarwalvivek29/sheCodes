import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: "data",
    initialState: {
        walletAddress: null,
        contracts: [],
        coords: {},
        orderDetails : null,
        thisContract : null,
        thisContractAddress : null,
        wallet : null,
        tokens : null,
    },
    reducers: {
        setWalletAddress(state, action) {
            state.walletAddress = action.payload;
        },
        setCoords(state, action) {
            state.coords = action.payload;
        },
        setContracts(state, action) {
            state.contracts = action.payload;
        },
        setThisContract(state, action){
            state.thisContract = action.payload;
        }
    }
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;