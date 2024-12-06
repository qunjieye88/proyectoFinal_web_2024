/* eslint-disable react/jsx-key */
'use client'
import Usuario from "../Usuario.jsx"
import {useForm} from "react-hook-form";
import { useState, useEffect } from 'react';

export default function ContenedorUsuarios(){

    const [usuarios, setUsuarios] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token")
        fetch("https://bildy-rpmaya.koyeb.app/api/client",{
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then(respuesta => respuesta.json())
        .then(dato => setUsuarios(dato))
    },[usuarios])

    const contenedorUsuarios = usuarios && (usuarios.map(x => (
        <Usuario usuario = {x}></Usuario>
    )));

    return(
        <>  
            <h1 >USUARIOS TOTALES</h1>
            {contenedorUsuarios}
        </>
    )

}