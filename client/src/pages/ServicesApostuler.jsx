import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiTwotoneEnvironment, AiOutlineDollar, AiFillHome, AiFillClockCircle } from "react-icons/ai";
import Modal from 'react-modal';
Modal.setAppElement('#root');

function ServicesApostuler() {
    const [data, setData] = useState([]); // * services
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [serviceId, setServiceId] = useState('');

    const handleBtn = (s) => {
        const token = localStorage.getItem("token");
        setServiceId(s);
        console.log(s);
        Axios.post('http://localhost:3001/offreService', {
            access_token: token, service_id: serviceId
        }).then((response) => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }

    const closeModal = () => { setModalIsOpen(false); }
    const openModal = () => {
        setTimeout(setModalIsOpen(true), 500);
        setTimeout(closeModal, 1000);
    }

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
                                <h1 className='text-[20px] font-bold text-[#33b435]'>{s.titre}</h1>
                                <h1 className='text-[16px] h-[100px] my-2 overflow-hidden truncate-3'>{s.description}</h1>
                                <div className='flex items-center justify-between'>
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
                                    <div className='w-[50px] justify-center items-center'>
                                        <Modal className='bg-gray-400 opacity-2 w-full h-full flex flex-col justify-center items-center' overlayClassName='w-[300px] h-[100px] fixed top-[400px] left-[550px]' isOpen={modalIsOpen} onRequestClose={closeModal}>
                                            <h1>Demande envoyée avec succees !</h1>
                                        </Modal>
                                    </div>
                                    <div className='flex justify-end'>
                                        <button onClick={() => {
                                            openModal();
                                            handleBtn(s.service_id);
                                        }} className='bg-[#33b435] p-2 rounded-md'>Postuler</button>
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

export default ServicesApostuler;
