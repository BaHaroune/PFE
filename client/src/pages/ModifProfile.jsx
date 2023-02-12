import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

export const ModifProfile = () => {
    const [data, setData] = useState(null);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [tel, setTel] = useState('');
    const [pays, setPays] = useState('');
    const [ville, setVille] = useState('');
    const [categorie, setCategorie] = useState('');
    const [domaineComp, setDomaineComp] = useState('');
    const [profile_desc, setProfile_desc] = useState('');

    const prestataireId = localStorage.getItem('prestataireId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(
                    `http://localhost:3001/PrestataireInfo?prestataireId=${prestataireId}`
                );
                setData(response.data);
                setNom(response.data.nom);
                setPrenom(response.data.prenom);
                setEmail(response.data.email);
                setAge(response.data.age);
                setTel(response.data.tel);
                setPays(response.data.pays);
                setVille(response.data.ville);
                setCategorie(response.data.categorie);
                setDomaineComp(response.data.domaineComp);
                setProfile_desc(response.data.profile_desc);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        try {
            const response = await Axios.put('http://localhost:3001/updateProfile', {
                nom,
                prenom,
                email,
                age,
                tel,
                pays,
                ville,
                categorie,
                domaineComp,
                profile_desc,
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col w-[850px] justify-center items-center my-10">
            {data && (
                <>
                    <div>
                        <input
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            className="w-[250px] m-2 bg-[#eee] h-[px] p-2 rounded-md"
                            type="text"
                            placeholder="Nom"
                        />
                        <input
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            className="w-[250px] m-2 bg-[#eee] h-[px] p-2 rounded-md"
                            type="text"
                            placeholder="Nom"
                        />
                    </div>
                    <div>
                        <input
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            className="w-[250px] m-2 bg-[#eee] h-[px] p-2 rounded-md"
                            type="text"
                            placeholder="Prenom"
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[250px] m-2 bg-[#eee] h-[px] p-2 rounded-md"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <input
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-[250px] m-2 bg-[#eee] h-[px] p-2 rounded-md"
                            type="text"
                            placeholder="Age"
                        />
                        <input
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            className="w-[250px] m-2 bg-[#eee] h-[px] p-2 rounded-md"
                            type="text"
                            placeholder="Telephone"
                        />
                    </div>
                    <div>
                        <input
                            value={pays}
                            onChange={(e) => setPays(e.target.value)}
                            className="w-[250px] m-2 bg-[#eee] h-[px] p-2 rounded-md"
                            type="text"
                            placeholder="Pays"
                        />
                        <input
                            value={ville}
                            onChange={(e) => setVille(e.target.value)}
                            className="w-[250px] m-2 bg-[#eee] h-[px] p-2 rounded-md"
                            type="text"
                            placeholder="Ville"
                        />
                    </div>
                    <div>
                        <input
                            value={categorie}
                            onChange={(e) => setCategorie(e.target.value)}
                            className="w-[250px] m-2 bg-[#eee] h-[px] p-2 rounded-md"
                            type="text"
                            placeholder="Categorie"
                        />
                        <input
                            value={domaineComp}
                            onChange={(e) => setDomaineComp(e.target.value)}
                            className="w-[250px] m-2 bg-[#eee] h-[px] p-2 rounded-md"
                            type="text"
                            placeholder="Domaine de competence"
                        />
                    </div>
                    <input
                        value={profile_desc}
                        onChange={(e) => setProfile_desc(e.target.value)}
                        className="w-[516px] h-[200px] m-2 bg-[#eee] p-2 rounded-md"
                        type="text"
                        placeholder="Description"
                    />
                    <button onClick={() => handleSave()} className='bg-[#00df9a] p-3 rounded-md w-[150px]'>Submit</button>
                </>
            )
            }
        </div>
    )
}
