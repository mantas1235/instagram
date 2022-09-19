import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/Home";
import Header from "./pages/components/header";
import NewPost from "./pages/newpost";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home-page' element={<Home />} />
        <Route path='/new' element={<NewPost />} />





      </Routes>


    </BrowserRouter>
  );
}

export default App;
