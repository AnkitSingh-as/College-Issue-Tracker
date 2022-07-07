import {createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name : 'loginSlice',
    initialState : {
        login : false,
        user : {},
    },
    reducers : {
        login( state, action ){
            state.login = action.payload.login;
            state.user =  action.payload.data;
        },
        logout(state, action){
            state.login = action.payload.login;
            state.user = action.payload.data;
        }
    }
})

export const loginActions  = loginSlice.actions;

export default loginSlice;