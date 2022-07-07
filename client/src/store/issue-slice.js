import { createSlice} from '@reduxjs/toolkit';

const issueSlice = createSlice({
    name: 'issue',
    initialState : {
        issues  : [],
    },
    reducers: {
        concatIssueList: (state, action) => {
            // console.log('hi', action.payload.issues);
            const newIssue = action.payload.issues;
            state.issues.push(newIssue);
        },
        getIssues(state, action){
            
            state.issues = action.payload.issues;
        }
    }
})

export const issueActions = issueSlice.actions;

export default issueSlice;
