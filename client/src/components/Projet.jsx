import React from 'react';

const Projet = () => {
        return (
            <div className='w-[200px] shadow-lg rounded-lg'>
                <img className='w-full rounded-t-lg' src="https://th.bing.com/th/id/OIP.lzFIX7zb-Z7U6Bc7DSAkOgHaFh?w=264&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
                <div className='h-30px flex flex-col m-2 bg-white'>
                    <p>Title</p>
                    <button className='btn mr-auto'><span className='text-[#3da01f]'>view project</span></button>
                </div>
            </div>
        );
}
 
export default Projet;