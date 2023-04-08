import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import Button from '@mui/material/Button';



export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (

 

 
    <header>

    <Link to="/" className="logo">
    Let's Blog
     </Link>
      <nav>
        {username && (
          <>
            <Link to="/create"><Button color="secondary">Create new post</Button></Link>
            <a onClick={logout}><Button variant="contained" size="small">Logout {username}</Button></a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login"><Button  sx={{marginLeft:'auto'}}variant="contained" size="small" >Login</Button></Link>
            <Link to="/register"><Button sx={{marginLeft:'auto'}} variant="contained" size="small" >Register</Button></Link>
          </>
        )}
      </nav>

    </header>
  

  );
}