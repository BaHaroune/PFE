import Axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {

    const [emailLog, setEmailLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            email: emailLog,
            password: passwordLog
        }).then((response) => {
            if (response.status === 200) {
                const token = response.data.token
                const role = response.data.role;

                localStorage.setItem("token", token);

                if (role === 'client') {
                    // navigate('/');
                    window.location.href = '/';
                    // console.log(response);
                } else if (role === 'prestataire') {
                    // navigate('/prestataire')
                    localStorage.setItem("prestataireId", response.data.user.prestataire_id);
                    window.location.href = '/prestataire';
                } else if (role === 'admin') {
                    // navigate('/admin');
                    window.location.href = '/admin';
                } else {
                    setErr(response.data.message);
                }
            } else {
                console.log(`Error: ${response.status} ${response.statusText}`);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    // useEffect(() => {
    //     Axios.get('http://localhost:3001/login').then((response) => {
    //         if (response.data.loggedIn = true) {
    //             setLoginStatus(response.data.user[0].lastname)
    //         }
    //     })
    // }, [])

    return (
        <div className='w-[500px] h-[500px] flex justify-center items-center border rounded-md my-12'>
            <div className='flex flex-col'>
                <div className='text-center my-4'>
                    <h1 className=''></h1>
                </div>

                <div className='p-2'>
                    <p>Adresse mail</p>
                    <input
                        className='border rounded-md my-1 p-2 w-[300px]'
                        required
                        type='email'
                        placeholder=''
                        onChange={(e) => setEmailLog(e.target.value)}
                    />
                </div>

                <div className='px-2'>
                    <div className='flex justify-between'>
                        <p>Mot de passe</p>
                        <p className='text-[#33b435]'>Mot de passe oubliee ?</p>
                    </div>
                    <input
                        className='border rounded-md my-1 p-2 w-[300px]'
                        required
                        type='password'
                        placeholder=''
                        onChange={(e) => setPasswordLog(e.target.value)}
                    />
                </div>

                <div className='p-2'>
                    <button onClick={login} className='border rounded-md p-2 w-[300px] bg-[#33b435]'>Submit</button>
                    {
                        err !== '' ? <p className='bg-[#def667] rounded-md justify-center text-black items-center mt-2 p-2 pl-5 w-[300px]'>{err}</p> : null
                    }
                </div>

                <div className='p-2'>
                    <p>
                        Inscrivez vous <span></span>
                        <button onClick={() => navigate('/signup')} className='text-[#33b435]'>Inscrivez vous</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;