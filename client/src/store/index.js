import { configureStore } from "@reduxjs/toolkit";

import issueSlice from './issue-slice';
import loginSlice from './login-slice';

const store = configureStore({
    reducer : {
        issue : issueSlice.reducer,
        loginSlice : loginSlice.reducer,
    }
})

export default store;