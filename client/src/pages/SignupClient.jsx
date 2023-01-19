import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function SignupClient() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [telReg, setTelReg] = useState();

    const navigate = useNavigate();


    const signUp = () => {
        const data = {
            username: nom,
            lastname: prenom,
            email: emailReg,
            password: passwordReg,
            tel: telReg
        };

        Axios.post('http://localhost:3001/registreClient', data)
            .then((response) => {
                navigate('/') // Will contain the JWT and the role
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className='w-[600px] h-[500px] py-10 flex justify-center items-center '>
            <div className='flex flex-col shadow-md p-10 rounded-md my-10 h-full'>
                <div className='flex m-2 justify-between'>
                    <input
                        className='border rounded-md my-1 mx-2 p-2 w-[200px] bg-[#eee]'
                        required
                        type='text'
                        placeholder='Nom'
                        onChange={e => setNom(e.target.value)}
                    />
                    <input
                        className='border rounded-md my-1 mx-2 p-2 w-[200px] bg-[#eee]'
                        required
                        type='text'
                        placeholder='Prenom'
                        onChange={e => setPrenom(e.target.value)}
                    />
                </div>

                <div className='flex m-2 justify-between'>
                    <input
                        className='border rounded-md my-1 mx-2 p-2 w-[414px] bg-[#eee]'
                        required
                        type='email'
                        placeholder='email@gmail.com'
                        onChange={e => setEmailReg(e.target.value)}
                    />
                </div>

                <div className='flex m-2 justify-between'>
                    <input
                        className='border rounded-md my-1 mx-2 p-2 w-[200px] bg-[#eee]'
                        required
                        type='text'
                        placeholder='Numero telephone'
                        onChange={e => setTelReg(e.target.value)}
                    />
                    <input
                        className='border rounded-md my-1 mx-2 p-2 w-[200px] bg-[#eee]'
                        required
                        type='password'
                        placeholder='Password'
                        onChange={e => setPasswordReg(e.target.value)}
                    />
                </div>


                <div className='p-2'>
                    <button onClick={signUp} className='border rounded-md mx-2 p-2 w-[416px] bg-[#33b435]'>Submit</button>
                </div>

                <div className='p-2 mb-10 ml-3'>
                    <p>
                        Etes vous deja inscrit ?
                        <button type='button' onClick={() => navigate('/login')} className='text-[#33b435]'>Login</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupClient;