import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiTwotoneEnvironment, AiOutlineDollar, AiFillHome, AiFillClockCircle } from "react-icons/ai";

function Main() {
  const [data, setData] = useState([]);

  Axios.defaults.withCredentials = true;

  const getServices = async () => {
    const response = await Axios.get('http://localhost:3001/getServices');
    setData(response.data);
    // console.log(response);
  }

  useEffect(() => {
    getServices();
  }, [])
  return (
    <div className='flex flex-col justify-center m-5'>
      <h1 className='text-3xl font-serif font-bold mb-5'>Latest Missions</h1>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
        {
          data ? data.map((s) => {
            return (
              <div key={s.service_id} className='border-2 rounded-md shadow-lg p-4'>
                <h1 className='text-2xl'>{s.titre}</h1>
                <h1 className='text-1xl my-2'>{s.description}</h1>
                <div className='flex items-center'>
                  <div className='flex items-center mr-4'>
                    <p className='mr-2'>{s.pays}</p>
                    <AiTwotoneEnvironment color='#33b435' />
                  </div>

                  <div className='flex items-center mr-4'>
                    <p className='mr-2'>{s.ville}</p>
                    <AiFillHome color='#33b435' />
                  </div>

                  <div className='flex items-center mr-4'>
                    <p className='mr-2'>{s.prix}</p>
                    <AiOutlineDollar size={20} color='#33b435' />
                  </div>

                  <div className='flex items-center mr-10'>
                    <p className='mr-2'>{s.delai}</p>
                    <AiFillClockCircle size={20} color='#33b435' />
                  </div>
                </div>
              </div>
            )
          }) : null
        }
      </div>
    </div>
  );
}

export default Main;
