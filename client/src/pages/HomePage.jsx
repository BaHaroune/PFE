import Axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Main from '../components/Main';

function HomePage() {
    const navigate = useNavigate();
    return (
        <div className='w-full bg-[#000300] text-white'>
            <div className='max-w-[800px] w-full h-[500px] mx-auto text-center flex flex-col justify-center'>
                <h1 className='text-[#00df9a] font-bold p-2'>
                    ServiceFinder, exprimer votre besoin en un simple clique
                </h1>
                <div className='flex flex-col justify-center items-center'>
                    <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
                        Trouver un prestataire disponible
                    </p>
                </div>
                {/* <p className='md:text-2xl text-xl font-bold text-gray-500'>.</p> */}
                <div className=''>
                    <button onClick={() => navigate('/CahierCharge')} className='bg-[#00df9a] rounded-md font-bold my-6 mx-2 p-3 text-black'>Consulter nos profils</button>
                </div>
            </div>

            <div className='w-full flex justify-start bg-white text-black mt-10 py-10'>
                <div className='m-5 border-r border-gray-400 shadow-sm px-10'>
                    <h1 className='text-2xl pb-5 mb-5 font-bold border-b border-gray-500'>Categories</h1>
                    <p className='py-1 text-[#00df9a]'>Developement web & mobile</p>
                    <p className='py-1 text-[#00df9a]'>Digital Marketing</p>
                    <p className='py-1 text-[#00df9a]'>Lorem, ipsum dolor.</p>
                    <p className='py-1 text-[#00df9a]'>Lorem, ipsum dolor.</p>
                    <p className='py-1 text-[#00df9a]'>Lorem, ipsum dolor.</p>
                    <p className='py-1 text-[#00df9a]'>Lorem, ipsum dolor.</p>
                    <p className='py-1 text-[#00df9a]'>Lorem, ipsum dolor.</p>
                    <p className='py-1 text-[#00df9a]'>Lorem, ipsum dolor.</p>
                    <p className='py-1 text-[#00df9a]'>Lorem, ipsum dolor.</p>
                </div>
                <div>
                    <Main/>

                </div>
            </div>
        </div>


    );
}

export default HomePage;