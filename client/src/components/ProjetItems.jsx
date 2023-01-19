import Axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

const ProjetItems = () => {
    const [nbreProjets, setNbreProjets] = useState('0');
    const [data, setData] = useState([]);

    const token = localStorage.getItem("token");


    const getDataServices = async () => {
        const response = await Axios.get(`http://localhost:3001/getServicesClient?access_token=${token}`);
        setData(response.data);
        setNbreProjets(response.data.length);
    }


    useEffect(() => {
        getDataServices();
    }, [])
    return (
        <div className='w-[300px] p-3 border-r h-[800px]'>
            <input className='border-2 my-2 rounded-md w-full p-2' type="recherche" placeholder='nom projet...' />
            <h1>Projets({nbreProjets})</h1>
            {
                data.map((item => {
                    return (
                        <div key={item.service_id} className='flex justify-between items-center p-3 w-full h-[100px] rounded-lg shadow-md my-4'>
                            <h1 className='font-bold font-mono text-[#5a5a5a] text-[16px]'>{item.titre}</h1>
                            <h1 className='font-bold font-mono pb-4 text-[#00df9a] text-[40px]'>.</h1>
                        </div>
                    )
                }))
            }
        </div>
    )
}

export default ProjetItems;
