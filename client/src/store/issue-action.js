import { issueActions } from "./issue-slice";

export const fetchIssueData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await 
            fetch("/getIssue");
            console.log('going to fetch data')
            if(!response.ok){
                throw new Error('Could not fetch cart data')
            }

            const data = await response.json();

            return data;
        }

        try{
            const issueData = await fetchData();
           
            dispatch(
                issueActions.getIssues({
                    issues : issueData || [],
                })
            )
        }
        catch(error){
            console.log(error);
        }
    }
}

export const sendNewIssue = (data) => {
    return async (dispatch) => {

        const sendRequest = async ( ) => {
            
            const response = await
            fetch("/addIssue" , {
                method : 'POST',
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify(data),
            });
            
            if(!response.ok){
                throw new Error('Item could not be added');
            }
            console.log('Request executed');

            const ddata = await response.json();

            return ddata;
        }

        try{
            const issuesss = await sendRequest();
            console.log( 'going to concat list');
            // console.log( 'hiiiiiii' , issuesss);
            dispatch(issueActions.concatIssueList({
                issues :  data,
            }))
        }
        catch(error){
            console.log(error);
        }

    }
}