import React, { useEffect } from 'react';
import { useState } from 'react';
import ServiceCourants from './ServiceCourants';
import ServicesApostuler from './ServicesApostuler';

const PrestataireDashbord = () => {
    const [services, setServices] = useState('');
    const [projets, setProjets] = useState('');

    const afficheProjets = () => {
        setProjets('clicked');
        setServices('');
    }

    const afficheServices = () => {
        setServices('clicked');
        setProjets('');
    }


    const DisplayeContent = () => {
        if (services !== '') {
            return (
                <ServiceCourants />
            )
        } else if (projets !== '') {
            return (
                <ServicesApostuler />
            )
        }
    }


    useEffect(() => {
        afficheServices();
    }, [])


    return (
        <div className='w-full flex justify-start'>
            <div className='w-[350px] h-[700px] border-r p-5'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl font-bold font-serif'>Dashbord</h1>
                    <h1 className='bg-[#33b435] py-2 px-3 rounded-full'>N</h1>
                </div>

                <div className='my-5'>
                    <h1 className='ml-1 text-[#33b435] font-bold my-2 border-b pb-2'>Mon compte</h1>
                    <h1 className='ml-1 text-[#33b435] font-bold my-2 border-b pb-2'>Profile</h1>
                    <h1 className='ml-1 text-[#33b435] font-bold my-2 border-b pb-2'>Statistiques</h1>
                    <h1 onClick={() => console.log("Deconnection")} className='ml-1 text-[#33b435] font-bold my-2 border-b pb-2'>Deconnection</h1>
                </div>
            </div>
            <div className='flex flex-col mb-10 w-full'>
                <div className='w-full p-5 flex justify-between items-center bg-[#eee] h-[200px] px-10'>
                    <div onClick={() => afficheProjets()} className='w-[200px] h-[100px] bg-yellow-500 rounded-md flex justify-center items-center'>
                        <h1 className='text-white tetxt-3xl font-bold font-serif'>Trouver des clients</h1>
                    </div>
                    <div onClick={() => afficheServices()} className='w-[200px] h-[100px] bg-[#262626] rounded-md flex justify-center items-center'>
                        <h1 className='text-white tetxt-3xl font-bold font-serif'>Projets en cours</h1>
                    </div>
                    <div className='w-[200px] h-[100px] bg-blue-500 rounded-md flex justify-center items-center'>
                        <h1 className='text-white tetxt-3xl font-bold font-serif'>Messages</h1>
                    </div>
                </div>

                <div>
                    {DisplayeContent()}
                </div>
            </div>
        </div>
    )
}

export default PrestataireDashbord;
