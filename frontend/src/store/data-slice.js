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
        connectWalletRef : null,
        walletBalance : [],
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
        },
        setThisContractAddress(state, action){
            state.thisContractAddress = action.payload;
        },
        setConnectWalletRef(state, action){
            state.connectWalletRef = action.payload;
        },
        setWalletBalance(state, action){
            state.walletBalance = action.payload;
        }
    }
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;