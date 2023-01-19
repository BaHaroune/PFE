import React, { useMemo } from 'react';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';


const AdminDashbord = () => {
    const [data, setData] = useState([]);
    const [prestatairesData, setPrestatairesData] = useState([]);
    const [servicesData, setServicesData] = useState([]);

    

    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            filter: true,
            sortable: true,
            rowSelection: true,
            rowMultiSelectWithClick: true
        };
    }, []);

    const [columnClients, setColumnClients] = useState([
        { field: 'client_id' },
        { field: 'nom' },
        { field: 'prenom' },
        { field: 'email' }
    ]);

    const [columnPrestataire, setColumnPrestataire] = useState([
        { field: 'prestataire_id' },
        { field: 'nom' },
        { field: 'prenom' },
        { field: 'email' },
        { field: 'tel' },
        { field: 'categorie' },
        { field: 'domaineComp' },
    ])

    const [columnServices, setColumnServices] = useState([
        { field: 'service_id' },
        { field: 'titre' },
        { field: 'prix' },
        { field: 'delai' },
        { field: 'pays' },
        { field: 'ville' },
    ])

    // const [columnMessages, setColumnMessages] = useState([
    //     { field: 'client_id' },
    //     { field: 'nom' },
    //     { field: 'prenom' },
    //     { field: 'email' },
    //     { field: 'tel' },
    // ])

    const getClients = async () => {
        const response = await Axios.get('http://localhost:3001/getClients');
        setData(response.data);
        console.log(response.data);
        setPrestatairesData([]);
        setServicesData([]);
    }

    const getPrestataire = async () => {
        const response = await Axios.get('http://localhost:3001/getPrestataires');
        setPrestatairesData(response.data);
        console.log(response.data);
        setServicesData([]);
        setData([]);
    }

    const getServices = async () => {
        const response = await Axios.get('http://localhost:3001/getServices');
        setServicesData(response.data);
        console.log(response.data);
        setData([]);
        setPrestatairesData([]);
    }

    function getAgGrid() {
        if (data.length > 0) {
            return (
                <div className='flex flex-col w-full h-full'>
                    <h1 className='text-2xl text-center m-5'>List de Clients</h1>
                    <AgGridReact
                        rowData={data}
                        columnDefs={columnClients}
                        defaultColDef={defaultColDef}
                        style={gridStyle}
                    />
                </div>
            );
        } else if (prestatairesData.length > 0) {
            return (
                <div className='flex flex-col w-full h-full'>
                    <h1 className='text-2xl text-center m-5'>List de Prestataires</h1>
                    <AgGridReact
                        rowData={prestatairesData}
                        columnDefs={columnPrestataire}
                        defaultColDef={defaultColDef}
                        style={gridStyle}
                    />
                </div>
            );
        } else if (servicesData.length > 0) {
            return (
                <div className='flex flex-col w-full h-full'>
                    <h1 className='text-2xl text-center m-5'>List de Services</h1>
                    <AgGridReact
                        rowData={servicesData}
                        columnDefs={columnServices}
                        defaultColDef={defaultColDef}
                        style={gridStyle}
                    />
                </div>
            );
        }
        return null;
    }

    // ...

    const navigate = useNavigate();

    useEffect(() => {
        getPrestataire();
    },[]);


    return (
        <div className='w-full flex justify-start'>
            <div className='w-[350px] h-[700px] border-r p-5'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl font-bold font-serif'>Dashbord</h1>
                    <h1 className='bg-[#33b435] py-2 px-3 rounded-full'>N</h1>
                </div>

                <div className='my-5'>
                    <h1 className='ml-1 text-[#33b435] font-bold my-2 border-b pb-2'>Ajouter un Administrateur</h1>
                    <h1 onClick={() => console.log("Deconnection")} className='ml-1 text-[#33b435] font-bold my-2 border-b pb-2'>Deconnection</h1>
                    <h1 className='ml-1 text-[#33b435] font-bold my-2 border-b pb-2'>Changer d'utilisateur</h1>
                </div>
            </div>
            <div className='flex flex-col mb-10 w-full'>
                <div className='w-full p-5 flex justify-between'>
                    <div onClick={() => getClients()} className='w-[200px] h-[100px] bg-yellow-500 rounded-md flex justify-center items-center'>
                        <h1 className='text-white tetxt-3xl font-bold font-serif'>Clients</h1>
                    </div>
                    <div onClick={() => getPrestataire()} className='w-[200px] h-[100px] bg-[#262626] rounded-md flex justify-center items-center'>
                        <h1 className='text-white tetxt-3xl font-bold font-serif'>Prestataires</h1>
                    </div>
                    <div onClick={() => getServices()} className='w-[200px] h-[100px] bg-green-500 rounded-md flex justify-center items-center'>
                        <h1 className='text-white tetxt-3xl font-bold font-serif'>Services</h1>
                    </div>
                    <div className='w-[200px] h-[100px] bg-blue-500 rounded-md flex justify-center items-center'>
                        <h1 className='text-white tetxt-3xl font-bold font-serif'>Messages</h1>
                    </div>
                </div>
                <div className='ag-theme-alpine m-5 mx-auto pr-10 w-[1000px] h-[300px] justify-center'>
                    {getAgGrid()}
                </div>
            </div>
        </div>
    )
}

export default AdminDashbord;