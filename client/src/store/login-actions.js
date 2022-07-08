import { loginActions } from "./login-slice";

export  const fetchUser = async ( idobj ) => {
    const response = await 
    fetch ( '/getuser',
    {method : 'POST', 
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify(idobj)
    
} );

    if(!response.ok){
        throw new Error('User couldn\'t be fetched');
    }

    const userData = await response.json();
    return userData;
}


 export const loginUserthunk  = (data) => {
    return async (dispatch) => {
     
        const loginUser = async () => {
        const response =  await 
        fetch('/login', {
            method: 'POST',
            headers : { "Content-Type" : "application/json" },
            body: JSON.stringify(data),
            
        });
        console.log('trying to login after fetch')
        if(!response.ok){
            throw new Error('User couldn\'t be logged in');
        }


        const userdata = await response.json();

        return userdata;

    }

    

    try{
        let userdata = await loginUser();
        const idobj = {scholarid : userdata.data.username};

            try{
                const userinfo = await fetchUser(idobj);
                userdata.data = userinfo;

            }
            catch(error){
                console.log(error);
            }

        console.log(userdata);
        dispatch(loginActions.login(userdata));

    }
    catch(error){
        console.log(error);
    }
    
    }
}


export const registerUserthunk  = (data) => {
    return async (dispatch) => {
     
        const registerUser = async () => {
        const response =  await 
        fetch('/register', {
            method: 'POST',
            headers : { "Content-Type" : "application/json" },
            body: JSON.stringify(data),
            
        });
        
        if(!response.ok){
            throw new Error('User couldn\'t be logged in');
        }


        const userdata = await response.json();
        console.log('trying to register after fetch')
        return userdata;

    }

    try{
        const userdata = await registerUser();
        const idobj = {scholarid : userdata.data.username};

            try{
                const userinfo = await fetchUser(idobj);
                userdata.data = userinfo;

            }
            catch(error){
                console.log(error);
            }

        console.log('hii' , userdata);
        dispatch(loginActions.login(userdata));

    }
    catch(error){
        console.log(error);
    }
    
    }
}



export const logoutUserthunk = () => {
    return async (dispatch)  => {
        const logoutUser = async () =>{
            const response = await 
            fetch ('/logout' , {
                method: 'POST',
            });

            if(!response.ok){
                throw new Error('user couldn\'t be logged out');
            }

            const userData = await response.json();
            return userData;
        }

       

        try{
           const data =  logoutUser();

        

           dispatch( loginActions.logout(data) );
        }
        catch(error){
            console.log(error);
        }

    }
}

export const checkLoginthunk = () => {
    return async (dispatch) => {
        const checkloginUser = async () => {
            const response =  await 
            fetch('/loggedIn');
            console.log('trying to check login after fetch')
            if(!response.ok){
                throw new Error('User couldn\'t be logged in');
            }
    
    
            const userdata = await response.json();
    
            return userdata;
    
        }
    
        const fetchUser = async ( idobj ) => {
            const response = await 
            fetch ( '/getuser',
            {method : 'POST', 
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(idobj)
            
        } );
    
            if(!response.ok){
                throw new Error('User couldn\'t be fetched');
            }
    
            const userData = await response.json();
            return userData;
        }
    
    
        try{
            let userdata = await checkloginUser();
            const idobj = {scholarid : userdata.data.username};
    
                try{
                    const userinfo = await fetchUser(idobj);
                    userdata.data = userinfo;
    
                }
                catch(error){
                    console.log(error);
                }
    
            console.log(userdata);
            dispatch(loginActions.login(userdata));
    
        }
        catch(error){
            console.log(error);
        }
        
        }
}