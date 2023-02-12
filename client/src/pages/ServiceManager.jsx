import Axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { AiTwotoneStar } from "react-icons/ai";
import { useNavigate } from 'react-router';

const ServiceManager = () => {
  const [nbreProjets, setNbreProjets] = useState('0');
  const [data, setData] = useState([]);
  const [service, setService] = useState('');
  const [offre, setOffre] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [prestataire, setPrestataire] = useState([]);
  const [profileId, setProfileId] = useState();


  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  localStorage.setItem("prestataireId", profileId);

  const getDataServices = async () => {
    const response = await Axios.get(`http://localhost:3001/getServicesClient?access_token=${token}`);
    setData(response.data);
    setNbreProjets(response.data.length);
  }

  const getOffres = async (item) => {
    setServiceId(item.service_id);
    const response = await Axios.get(`http://localhost:3001/offre?serviceId=${serviceId}`);
    setPrestataire(response.data);
  }

  const profileIdSet = (item) => {
    setProfileId(item);
    setProfileId(prevState => {
      console.log(prevState); // Log the previous state here
      navigate('/profile');
      return item;
    });
  }

  useEffect(() => {
    getDataServices();
  }, []);


  const handleSelectedService = (item) => {
    if (service !== item) {
      setService(item);
    }
    console.log(service);
  }

  return (
    <div className='flex justify-between w-full'>
      <div className='w-[300px] p-3 border-r h-[800px]'>
        <input className='border-2 my-2 rounded-md w-full p-2' type="recherche" placeholder='nom projet...' />
        <h1>Projets({nbreProjets})</h1>
        {
          data.map((item => {
            return (
              <div key={item.service_id} className='flex justify-between border items-center p-3 w-full h-[100px] rounded-lg shadow-md my-4'>
                <h1 onClick={() => { handleSelectedService(item); getOffres(item) }} className='font-bold font-mono text-[#5a5a5a] text-[16px] cursor-pointer'>{item.titre}</h1>
                <h1 className='font-bold font-mono pb-4 text-[#00df9a] text-[40px]'>.</h1>
              </div>
            )
          }))
        }
      </div>
      <div className='w-[900px] mx-auto flex flex-col justify-start items-center p-4'>
        {
          service ?
            <div className=''>
              <div className='shadow-lg w-[800px] border rounded-md p-4'>
                <h1 className='text-2xl font-bold text-[#00df9a] my-5'>{service.titre}</h1>
                <p>{service.description}</p>
              </div>
              <div className=''>
                <h1 className='text-2xl font-bold text-[#00df9a] my-5'>List de prestataires qui ont postuler</h1>
                {prestataire && prestataire.length > 0 ?
                  prestataire.map((item) => {
                    return (
                      <div onClick={() => profileIdSet(item.prestataire_id)} key={item.prestataire_id} className='border flex flex-col justify-center items-center shadow-md rounded-sm w-[200px]'>
                        <img src="https://d2kf8ptlxcina8.cloudfront.net/YH5TFCE1QY-preview.png" alt="" />
                        <h1 className='font-bold text-[14px]'>{item.prenom} {item.nom}</h1>
                        <div className='flex w-[100px] justify-between my-2'>
                          <AiTwotoneStar color='#d3bb05' />
                          <AiTwotoneStar color='#d3bb05' />
                          <AiTwotoneStar color='#d3bb05' />
                          <AiTwotoneStar color='#d3bb05' />
                          <AiTwotoneStar color='#d3bb05' />
                        </div>
                      </div>
                    )
                  }) : <p>En attente d'une offre...</p>
                }
              </div>
            </div>
            : <h1>veiilez cliquer sur l'un de vous progets pour voir les prestataires suggereree</h1>
        }
      </div>
    </div>
  )
}

export default ServiceManager;
