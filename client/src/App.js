import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/Home";
import Header from "./pages/components/header";
import NewPost from "./pages/newpost";
import axios from "axios";
import MainContext from './MainContext'
import { useEffect, useState } from 'react'

axios.defaults.withCredentials = true

const App = () => {

  const [alert, setAlert] = useState({
    message: '',
    status: '',
  })

  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth')
      .then(resp => {
        setUserInfo(resp.data)
      })
  }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {userInfo.id &&
            <>

              <Route path='/home-page' element={<Home />} />
              <Route path='/new' element={<NewPost />} />
            </>}
        </Routes>

      </MainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
