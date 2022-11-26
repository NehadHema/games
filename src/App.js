import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import Login from './Login/Login';
import Registeration from './Registration/Registeration';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import All from './All/All';
import Categories from './Categories/Categories';
import Sortby from './Sortby/Sortby';
import Platforms from './Platforms/Platforms';
import Pc from './Pc/Pc';
import Browser from './Browser/Browser';
import Releasedate from './RealeaseDate/RealeaseDate';
import Popularity from './Popularity/Popularity';
import Alphabetical from './Alphabetical/Alphabetical';
import Relevance from './Relevance/Relevance';
import Racing from './Racing/Racing';
import Sports from './Sports/Sports';
import Social from './Social/Social';
import Shooter from './Shooter/Shooter';
import Openworld from './OpenWorld/OpenWorld';
import Zombie from './Zombie/Zombie';
import Fantasy from './Fantasy/Fantasy';
import Actionrpg from './Actionrpg/Actionrpg';
import Action from './Action/Action';
import Flight from './Flight/Flight';
import Battleroyate from './Battleroyate/Battleroyate';
import { useState , useEffect } from 'react';
import ProtecetedRoute from './ProtecetedRoute/ProtecetedRoute';
import GameDetails from './GameDetails/GameDetails';
import jwtDecode from 'jwt-decode';

function App() {

  let [isLogin, setIsLogin] = useState(false);

  const routes = createBrowserRouter([
    {
      path: "/", element: <Layout isLogin={isLogin} setIsLogin={setIsLogin} />, children: [
        { index: 'true', element: <Login setIsLogin={setIsLogin} /> },
        { path: 'register', element: <Registeration /> },
        { path: 'home', element: <ProtecetedRoute><Home /></ProtecetedRoute> },
        { path: 'gamedetails/:gameId', element: <ProtecetedRoute><GameDetails /></ProtecetedRoute> },
        { path: 'all', element: <ProtecetedRoute><All /></ProtecetedRoute> },
        { path: 'pc', element: <Pc /> },
        { path: 'browser', element: <Browser /> },
        { path: 'platforms', element: <ProtecetedRoute><Platforms /></ProtecetedRoute> },
        { path: 'categories', element: <ProtecetedRoute><Categories /></ProtecetedRoute> },
        { path: 'racing', element: <Racing /> },
        { path: 'sports', element: <Sports /> },
        { path: 'social', element: <Social /> },
        { path: 'shooter', element: <Shooter /> },
        { path: 'openworld', element: <Openworld /> },
        { path: 'zombie', element: <Zombie /> },
        { path: 'fantasy', element: <Fantasy /> },
        { path: 'actionrpg', element: <Actionrpg /> },
        { path: 'action', element: <Action /> },
        { path: 'flight', element: <Flight /> },
        { path: 'battleroyate', element: <Battleroyate /> },
        { path: 'sortby', element: <ProtecetedRoute><Sortby /></ProtecetedRoute> },
        { path: 'releasedate', element: <Releasedate /> },
        { path: 'popularity', element: <Popularity /> },
        { path: 'alphabetical', element: <Alphabetical /> },
        { path: 'relevance', element: <Relevance /> },
        { path: '*', element: <Login/> }
      ]
    }
  ]);

  useEffect(() => {

    if (localStorage.getItem('token') !== null) { 

      let token = localStorage.getItem('token');
      let userdata = jwtDecode(token);
      console.log(userdata)

      setIsLogin(userdata); 

    }
  }, [isLogin]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
