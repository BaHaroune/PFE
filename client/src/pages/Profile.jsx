import Axios from 'axios';
import React, { useEffect } from 'react';
import { AiTwotoneStar, AiOutlineStar } from "react-icons/ai";
import Projet from '../components/Projet';

const Profile = () => {

    return (
        <div className='w-[1000px] border-2 rounded-md shadow-lg mt-10 p-4'>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-[800px] border-b border-gray-500 pb-11 flex justify-between items-center gap-10'>

                    <div className='flex justify-between'>
                        <img className='w-[150px] mr-5' src="https://th.bing.com/th/id/R.9d32bec8058bd3595a63a08a8cc12ade?rik=83kM%2fk1i2EJBwQ&pid=ImgRaw&r=0" alt="" />
                        <div className='flex flex-col mt-4'>
                            <p className='text-2xl'>Contact</p>
                            <p>email@gmail.com</p>
                            <p className='text-[#4256d2]'>+222 47 80 59 66</p>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center '>
                        <div className='flex justify-between items-center'>
                            <div className='mx-5 mb-5 border-r border-gray-500 pr-3'>
                                <h1 className='text-2xl'>Note</h1>
                                <div className='flex mt-2'>
                                    <AiTwotoneStar size={16} color='#d3bb05' />
                                    <AiTwotoneStar size={16} color='#d3bb05' />
                                    <AiTwotoneStar size={16} color='#d3bb05' />
                                    <AiTwotoneStar size={16} color='#d3bb05' />
                                    <AiOutlineStar size={16} />
                                </div>
                            </div>
                            <div className='mx-5 mb-5'>
                                <h1 className='text-2xl'>Projets</h1>
                                <div>4</div>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button className='btn py-3 w-[150px] bg-[#15930f] text-white rounded-lg'>Contacter</button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-center pt-11'>
                    <h1 className='text-3xl mb-3 text-center'>Name lastName, 27 ans</h1>
                    <h1 className='font-bold mb-3 text-center'>Specialite-Domaine</h1>
                    <h1 className='text-center text-2xl'>Location, Ville</h1>
                </div>

                <div className='w-[800px] border-b border-gray-500 p-11'>
                    <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Totam nobis illo nam repellendus aliquid, laudantium nesciunt,
                        quis earum possimus quibusdam error non asperiores a ducimus architecto voluptatem repudiandae.
                        Corporis, enim.
                    </h1>
                </div>

                <div className='flex flex-col justify-center mt-10'>
                    <h1 className='text-3xl font-bold text-center m-5'>Projets realisee</h1>
                    <div className='max-w-[800px] mx-auto grid md:grid-cols-3 gap-10'>
                        <Projet />
                        <Projet />
                        <Projet />
                        <Projet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;