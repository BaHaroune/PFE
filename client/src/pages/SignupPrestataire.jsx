import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function SignupPrestataire() {
    const [usernameReg, setUserNameReg] = useState('');
    const [lastnameReg, setLastnameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [telReg, setTelReg] = useState('');
    const [categorieReg, setCategorieReg] = useState('');
    const [domaineCompetanceReg, setDomaineCompetanceReg] = useState('');
    const [ageReg, setAgeReg] = useState();
    const [paysReg, setPaysReg] = useState('');
    const [villeReg, setVilleReg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log(categorieReg);
        console.log(domaineCompetanceReg);
        Axios.post("http://localhost:3001/registrePrestataire", {
            username: usernameReg,
            lastname: lastnameReg,
            email: emailReg,
            password: passwordReg,
            tel: telReg,
            categorie: categorieReg,
            domaineCompetance: domaineCompetanceReg,
            age: ageReg,
            pays: paysReg,
            ville: villeReg,
        }).then((response) => {
            if (response.data) {
                navigate('/');
            }
        })
    }

    return (
        <div className='container h-[600px] shadow-md w-[600px] mt-5 flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <input onChange={(e) => setUserNameReg(e.target.value)} className='w-[200px] m-2 bg-[#eee] p-2 rounded-md' type="text" placeholder='Nom' />
                    <input onChange={(e) => setLastnameReg(e.target.value)} className='w-[200px] m-2 bg-[#eee] h-[px] p-2 rounded-md' type="text" placeholder='Prenom' />
                </div>
                <input onChange={(e) => setEmailReg(e.target.value)} className='w-[414px] m-2 bg-[#eee] h-[px] p-2 rounded-md' type="email" placeholder='email@gmail.com...' />
                <input onChange={(e) => setTelReg(e.target.value)} className='w-[414px] m-2 bg-[#eee] h-[px] p-2 rounded-md' type="text" placeholder='Numero de telephone' />
                <div>
                    <input onChange={(e) => setAgeReg(e.target.value)} className='w-[200px] m-2 bg-[#eee] h-[px] p-2 rounded-md' type="text" placeholder='Age' />
                    <input onChange={(e) => setPasswordReg(e.target.value)} className='w-[200px] m-2 bg-[#eee] p-2 rounded-md' type="password" placeholder='Password' />
                </div>

                <div>
                    <select value={categorieReg} onChange={(e) => setCategorieReg(e.target.value)} className='w-[200px] p-2 m-2 h-[50px] border rounded-sm' name="catgeorie" id="">
                        <option value="categorie">Categorie</option>
                        <option>Developpement Informatique</option>
                        <option>Mecanique</option>
                        <option>Securitee</option>
                        <option>Management</option>
                    </select>
                    <select value={domaineCompetanceReg} onChange={(e) => setDomaineCompetanceReg(e.target.value)} className='w-[200px] p-2 m-2 h-[50px] border rounded-sm' name="" id="">
                        <option>Domaine de Competance</option>
                        <option>Application web</option>
                        <option>Application mobile</option>
                    </select>
                </div>

                <div>
                    <select value={paysReg} onChange={(e) => setPaysReg(e.target.value)} className='w-[200px] p-2 m-2 h-[50px] border rounded-sm' name="catgeorie" id="">
                        <option value="Pays">Pays</option>
                        <option>Mauritanie</option>
                        <option>Senegal</option>
                        <option>Ghana</option>
                        <option>Maroc</option>
                    </select>
                    <select value={villeReg} onChange={(e) => setVilleReg(e.target.value)} className='w-[200px] p-2 m-2 h-[50px] border rounded-sm' name="" id="">
                        <option value="ville">Ville</option>
                        <option>Nouakchott</option>
                        <option>Dakar</option>
                    </select>
                </div>

                <button onClick={() => handleSubmit()} className='bg-[#33b435] w-[414px] rounded-md p-2 font-bold m-2'>Submit</button>
                <label onClick={() => navigate('/login')} className='mr-auto ml-3'>Etes vous deja inscrit ? <span className='text-[#00df9a]'>Connectez vous</span></label>
            </div>
        </div>
    );
}

export default SignupPrestataire;