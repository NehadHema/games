import React ,{useState , useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Home() {

  const[game,setGame]=useState([]);


 async function getGame(){

    let {data} = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games?rapidapi-key=b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',game);
    
    setGame(data);
  }

  useEffect(() => {
    getGame();
   }, [])
  
  return (
    <>
     <div className="py-4">
      <div>
        <div className="home">
        <div className="text-center">
            <h1 className="heading">Find &amp; track the best <span className="blue">free-to-play</span> games!</h1>
            <p className="lead text-muted">Track what you've played and search for what to play next! Plus get free premium loot! </p>
            <p><NavLink className="btn btn-outline-secondary btn-md ml-0" to={'/all'}>Browse Games</NavLink></p>
            </div>
        </div>
        <div>
          <div className="container my-5">
            <h3 ><i className="fas fa-robot mr-2"></i>Personalized Recommendations</h3>
            <div  className="row mt-3 g-3">
            {game.slice(0 , 3).map((game) => {
              return<div key={game.id} className="col-md-4">
                     <NavLink style={{textDecoration: "none"}} to={`/gamedetails/${game.id}`} className="style">
                      <div  className="game card mb-4 grow shadow">
                  <div  className="game-img">
                    <img  alt="" className="w-100" src={`${game.thumbnail}`}/>
                  </div>
                <div  className=" game-body d-flex justify-content-between align-items-center p-3">
                  <h4  className="card-title text-truncate">{game.title}</h4>
                  <span  className="badge py-2 px-2 float-right">FREE</span>
                  </div>
                      </div>
                  </NavLink> 
                  </div>
            })}
            </div>
            </div>
      </div>
      </div>
     </div>
    </>
  )
}
