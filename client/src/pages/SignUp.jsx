import Axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function SignUp() {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col mt-10 w-[400px] h-[400px] justify-center shadow-md rounded-md items-center border'>
            <div className='flex justify-center h-[200px] items-center w-full'>
                <input onClick={() => navigate('/signupclient')} className='bg-[#00df9a] p-3 text-2xl font-bold w-[200px] rounded-lg text-white' type="button" value="Client" />
            </div>
            <div className='flex justify-center h-[200px] items-center w-full'>
                <input onClick={() => navigate('/signupprestataire')} className='bg-[#00df9a] p-3 text-2xl font-bold w-[200px] rounded-lg text-white' type="button" value="Prestataire" />
            </div>
        </div>
    );
}

export default SignUp;