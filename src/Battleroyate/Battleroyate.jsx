import React ,{useState , useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


export default function Battleroyate() {
  const[battleroyalegames,setbattleroyalegames]=useState([]);

  async function getbattleroyalegames(){
    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
      params: { category : 'battle-royale'},
      headers: {
          'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
  }, battleroyalegames);    
     console.log(data);
 
     setbattleroyalegames(data);
   }
 
   useEffect(() => {
    getbattleroyalegames();
    }, [])
   
   return (
     <>
      <div className="py-4">
         <div>

           <div className="container my-5">
             <div  className="row mt-3 g-3">
             {battleroyalegames.map((battleroyalegames) => {
               return<div  key={battleroyalegames.id} className="col-md-3">
                      <NavLink style={{textDecoration: "none"}} to={`/gamedetails/${battleroyalegames.id}`} className="style">
                       <div  className="game card mb-4 grow shadow pb-3">
                   <div  className="game-img">
                     <img  alt="" className="w-100" src={`${battleroyalegames.thumbnail}`}/>
                   </div>
                   
                 <div  className=" game-body d-flex justify-content-between align-items-center p-3">
                   <h4  className="card-title text-muted">{battleroyalegames.title.length>10?<>{battleroyalegames.title.split("").slice(0,11).join("")+'...'}</>: <>{battleroyalegames.title.split("").slice(0,8).join("")}</>}</h4>
                   <span  className="badge py-2 px-2 float-right">FREE</span>
                   </div>
                                      <p className="text-muted px-3">{battleroyalegames.short_description.length>20?<>{battleroyalegames.short_description.split("").slice(0,15).join("")+'...'}</>: <>{battleroyalegames.short_description.split("").slice(0,15).join("")}</>}</p>

                   <div  className="d-flex justify-content-between graycolor px-3">
                    <i  className="fas fa-plus-square"></i>
                    <div  className="d-flex mb-n2 justify-content-between align-items-center">
                      <span  className="gray text-dark me-2">{battleroyalegames.genre}</span>
                      <i title="Available on Windows" className="fab fa-windows text-muted stretched-link"></i>
                      </div>
                      </div>
                       </div>
                   </NavLink> 
                   </div>
             })}
             </div>
             </div>
       </div>
       
      </div>
     </>
   )

}
