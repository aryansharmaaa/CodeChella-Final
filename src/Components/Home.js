import React,{useState} from 'react'
import {v4 as uuidV4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import '../index.css';

const Home = () => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const navigate= useNavigate();
    const[roomId,setRoomId] = useState('');
    const[username,setUsername] = useState('');
    const createNewRoom=(e) => {
        e.preventDefault();
        const id=uuidV4();
        console.log(id);
        setRoomId(id);
        toast.success('Created a new room');
    }
    const joinRoom=()=>{
        if(!roomId||!username){toast.error('Room Id and Username is required'); return;}
        navigate(`/landing`,{
            state: {
                username,
            }
        })
    };
    const handleEnter=(e)=>{
        console.log('event',e.code);
        if(e.code==='Enter'){
            joinRoom();
        }
    }

    return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-dark">
            <div className="container">
                <a className="navbar-brand" href="/">
                </a>
            </div>
            <div class = "lopo">
                {isAuthenticated?(<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>):(<button onClick={() => loginWithRedirect()}>Log In</button>)
                        }
                        </div>
        </nav>
        <div className='homePageWrapper'>
            <div className="formWrapper">
                <img src="https://res.cloudinary.com/duycnul2b/image/upload/v1686154427/Codechella_fqgvhd.jpg" alt="" className="myLogo" />
                <h4 className="loginConfirm">You have logged in Successfully!</h4>
                <h4 className="mainLabel">Paste Invitation Room ID</h4>
                <div className="inputGroup">
                    <input type="text" className="inputBox" placeholder='Room Id' onChange={(e)=>setRoomId(e.target.value)} value={roomId} onKeyUp={handleEnter}/>
                    <input type="text" className="inputBox" placeholder="Enter Name" onChange={(e)=>setUsername(e.target.value)} value={username} onKeyUp={handleEnter}/>
                    <button className="btn joinBtn" onClick={joinRoom}>Join</button>
                    <span className="createInfo">If you don't have an invite then create <a onClick={createNewRoom} href="/" className="createNewBtn">new room</a></span>
                </div>
            </div>
        <footer>
            <h4>Built by CE Group V</h4>
        </footer>
        </div>
    </>
  )
}

export default Home
