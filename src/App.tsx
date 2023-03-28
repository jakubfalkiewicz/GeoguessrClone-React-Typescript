import './App.scss'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import MapRoutes from "./components/MapRoutes";
import GameRoutes from "./components/GameRoutes";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useEffect, useState } from "react";
import IUser from "./interfaces/IUser";
import WelcomePage from "./pages/WelcomePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store"
import { AuthState } from "./redux/slices/authSlice";
import { useDispatch } from 'react-redux';
import { getMaps, mapsState } from './redux/slices/mapsSlice';
import { gamesState } from './redux/slices/gamesSlice';
import { getGames } from './redux/slices/gamesSlice';


function App() {
  const dispatch = useDispatch()

  const [user, setUser] = useState<IUser | null>(null);

  const authState = useSelector<RootState, AuthState>(state => state.userHandler);
  const mapsState = useSelector<RootState, mapsState>(state => state.mapsReducer);
  const gamesState = useSelector<RootState, gamesState>(state => state.gamesReducer)

  useEffect(() => {
    if (authState.user._id) {
      setUser(authState.user)
      dispatch(getGames(authState.user._id) as any)
    }
    // const sessionUser = sessionStorage.getItem('user')
    // if (sessionUser) {
    //   console.log("Setin user")
    //   setUser(JSON.parse(sessionUser))
    // }
  }, [authState])

  useEffect(() => {
    const sessionMaps = sessionStorage.getItem('maps')
    if (mapsState.maps.length === 0) {
      if (!sessionMaps) {
        console.log('No maps')
        dispatch(getMaps() as any)
      }
    }
  }, [mapsState, dispatch])

  return (
    <Routes>
      <Route
        path="/"
        // element={<Home />}
        element={user ? <Home user={user} /> : <WelcomePage />}
      ></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/maps/*" element={<MapRoutes />}></Route>
      <Route path="/game/*" element={<GameRoutes />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
