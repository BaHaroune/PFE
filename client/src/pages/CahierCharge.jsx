import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Axios from 'axios';

function CahierCharge() {
    const [titre, setTitre] = useState("");
    const [categorie, setCategorie] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState();
    const [delai, setDelai] = useState();
    const [pays, setPays] = useState("");
    const [ville, setVille] = useState("");
    const [loginStatus, setLoginStatus] = useState('');

    // useEffect(() => {

    //     Axios.get('http://localhost:3001/login').then((response) => {
    //         console.log(response.data.user);
    //         if (response.data.loggedIn && response.data.user) {
    //             setLoginStatus(response.data.user.client_id);
    //         } else {
    //             console.log(response.data);
    //         }
    //     })
    // }, [])

    const navigate = useNavigate();

    const handleSubmit = () => {
        const token = localStorage.getItem("token");
        Axios.post(`http://localhost:3001/submitService`, {
            titre: titre,
            categorie: categorie,
            description: description,
            prix: prix,
            delai: delai,
            pays: pays,
            ville: ville,
            access_token: token
            // clienId: loginStatus
        }).then((response) => {
            navigate('/');
        })
    }

    return (
        <div className='bg-[#ebe9e9] w-full h-[800px] flex flex-col justify-start items-center p-10'>
            <h1 className='text-2xl text-center font-bold m-3'>Le formulaire ci-dessous vous nous aidera a  </h1>
            <div className='flex flex-col justify-center items-start'>
                <div className='mx-3 my-1'>
                    <div>
                        <input required className='w-[300px] h-[40px] rounded-md px-2' onChange={(e) => setTitre(e.target.value)} placeholder='Titre' type="text" name="nameProject" id="" />
                        <select value={categorie} className='rounded-md h-[40px] w-[300px] p-1 m-3' onChange={(e) => setCategorie(e.target.value)} name="categorie" id="">
                            <option value="Choisissez une categorie">Choisissez une categorie</option>
                            <option value="Developpement Web/Mobile">Developpement Web/Mobile 1</option>
                            <option value="Developpement Web/Mobile">Developpement Web/Mobile 2</option>
                            <option value="Developpement Web/Mobile">Developpement Web/Mobile 3</option>
                            <option value="Developpement Web/Mobile">Developpement Web/Mobile 4</option>
                            <option value="Developpement Web/Mobile">Developpement Web/Mobile 5</option>
                        </select>
                    </div>
                </div>
                <div>
                    <input required className='justify-start items-start w-[612px] h-[300px] rounded-md px-2 m-3' onChange={(e) => setDescription(e.target.value)} placeholder='Description du service attendu' type="text" />
                </div>
                <div className='flex justify-between'>
                    <input required className='w-[120px] h-[40px] rounded-md p-1 m-3' onChange={(e) => setPrix(e.target.value)} placeholder='Prix symbolic...$' type="text" />
                    <input required className='w-[120px] h-[40px] rounded-md p-1 m-3' onChange={(e) => setDelai(e.target.value)} placeholder='Delai (en jours)' type="text" />
                    <select value={pays} className='rounded-md h-[40px] w-[150px] p-1 m-3' onChange={(e) => setPays(e.target.value)} name="" id="">
                        <option value="">Pays</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Mauritanie">Mauritanie</option>
                        <option value="Mali">Mali</option>
                    </select>
                    <select value={ville} className='rounded-md h-[40px] w-[150px] p-1 m-3' onChange={(e) => setVille(e.target.value)} name="" id="">
                        <option value="">Ville</option>
                        <option value="Nouakchott">Nouakchott</option>
                        <option value="Dakar">Dakar</option>
                        <option value="Bamaco">Bamaco</option>
                    </select>
                </div>
            </div>
            <button className='bg-[#33b435] p-2 w-[150px] rounded-md' type='submit' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default CahierCharge;