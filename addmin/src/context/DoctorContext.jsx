import React, { createContext } from 'react';
import { useState } from 'react';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrlD=import.meta.env.VITE_BACKEND_URL;
    const [dToken,setDToken]=useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")




    const value={

        dToken,
        backendUrlD,
        setDToken,
        bkjbdjj,
        dbkjdj


    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;



