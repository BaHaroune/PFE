import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import HomePage from './pages/HomePage';
import Apropos from './pages/Apropos';
import Error from './pages/Error';
import Axios from 'axios';
import CahierCharge from './pages/CahierCharge';
import SignupClient from './pages/SignupClient';
import SignupPrestataire from './pages/SignupPrestataire';
import PrestataireDashbord from './pages/PrestataireDashbord';
import AdminDashbord from './pages/AdminDashbord';
import ServiceManager from './pages/ServiceManager';
import Profile from './pages/Profile';
import { ModifProfile } from './pages/ModifProfile';

function App() {
  const [nav, setNav] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');

  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get(`http://localhost:3001/profile?access_token=${token}`).then((response) => {
      setLoginStatus(response.data.user.nom[0]);
    })
      .catch(err => {
        console.log(err)
      });
  }, []);


  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <Router className=" justify-center items-center my-10">
      <div className='bg-[#000300] w-full px-5'>
        <nav className='flex justify-between items-center w-full text-white p-2'>
          <Link to="/">
            <h1 className='text-2xl font-bold text-[#00df9a]'>ServiceFinder</h1>
          </Link>
          <div>
            <div className='flex justify-between items-center'>
              {loginStatus !== ''
                ?
                <div className='flex justify-between items-center mx-2'>
                  <Link className='m-3 font-bold hover:text-[#fff] hover:bg-[#00df9a] border-2 p-2 rounded-lg border-green-700' to='/servicemanager' >Gerer mes services</Link>
                  <p className='bg-[#00df9a] font-bold rounded-full px-2 py-1 text-1xl'>{loginStatus}</p>
                </div>

                :
                <div>
                  <Link className='m-3 font-bold hover:text-[#00df9a]' to='/login' >Connexion</Link>
                  <Link className='m-3 font-bold hover:text-[#00df9a]' to='/signup' >S'inscrire</Link>
                  <Link className='hidden m-3 font-bold hover:text-[#00df9a]' to='/signupclient' >Sign Up</Link>
                  <Link className='hidden m-3 font-bold hover:text-[#00df9a]' to='/signupprestataire' >Sign Up</Link>
                  <Link className='hidden m-3 font-bold hover:text-[#00df9a]' to='/prestataire' >Prestataire Dashbord</Link>
                  <Link className='hidden m-3 font-bold hover:text-[#00df9a]' to='/admin' >Prestataire Dashbord</Link>
                  <Link className='hidden m-3 font-bold hover:text-[#00df9a]' to='/profile' >Profile Presatataire</Link>
                  <Link className='hidden m-3 font-bold hover:text-[#00df9a]' to='/modifprofile' >Profile Edit</Link>
                </div>}
              {nav ? <AiOutlineClose onClick={handleNav} size={20} /> : <AiOutlineMenu onClick={handleNav} size={20} />}
            </div>
            <div className={nav ? 'fixed p-2 right-0 top-30 w-[300px] border-l border-l-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed right-[-100%]'}>
              {
                loginStatus ?
                  <div className='flex flex-col justify-end'>
                    <Link className='m-3 font-bold hover:text-[#00df9a]' onClick={handleNav} to="/cahierCharge">Demande de Service</Link>
                    <Link className='m-3 font-bold hover:text-[#00df9a]' onClick={handleNav} to="/aPropos">A propos</Link>
                    <Link className='m-3 font-bold hover:text-[#00df9a]' onClick={handleNav} to='/login' >Deconnection</Link>
                  </div>
                  :
                  <div className='flex flex-col justify-end'>
                    <Link className='m-3 font-bold hover:text-[#00df9a]' onClick={handleNav} to="/cahierCharge">Demande de Service</Link>
                    <Link className='m-3 font-bold hover:text-[#00df9a]' onClick={handleNav} to="/aPropos">A propos</Link>
                    <Link className='m-3 font-bold hover:text-[#00df9a]' onClick={handleNav} to='/login' >Connexion</Link>
                    <Link className='m-3 font-bold hover:text-[#00df9a]' onClick={handleNav} to='/signup' >S'inscrire</Link>
                  </div>
              }
            </div>
          </div>
        </nav>
      </div>



      <Routes className='mt-[100px]'>
        <Route path='/' element={<HomePage />} />
        <Route path='/cahierCharge' element={<CahierCharge />} />
        <Route path='/aPropos' element={<Apropos />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<Error />} />
        <Route path='/signupclient' element={<SignupClient />} />
        <Route path='/signupprestataire' element={<SignupPrestataire />} />
        <Route path='/prestataire' element={<PrestataireDashbord />} />
        <Route path='/admin' element={<AdminDashbord />} />
        <Route path='/servicemanager' element={<ServiceManager />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/modifprofile' element={<ModifProfile />} />
      </Routes>
    </Router>
  );

  // return (
  //   <Profile />
  // )
}

export default App;
