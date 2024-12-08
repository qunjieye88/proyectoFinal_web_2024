/* eslint-disable react/jsx-key */
'use client'
import Usuario from "./ClientData.jsx"
import {useForm} from "react-hook-form";
import { useState, useEffect } from 'react';

export default function ContenedorUsuarios({clients}){

    useEffect(()=>{
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVlNTFiOWNkZTQ4ZTgwMzJmMzIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI3OTEzOTcsImV4cCI6MTczNTM4MzM5N30.MS5HcpdbuJ03WDJn1ZGEmDaH9aNguOz8YMlMmFx1JdQ"
        fetch("https://bildy-rpmaya.koyeb.app/api/client",{
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then(respuesta => respuesta.json())
        .then(dato => setUsuarios(dato))
    },[])

    const contenedorUsuarios = usuarios && (usuarios.map(x => (<Usuario usuario = {x}></Usuario>)));

    return(
        <>  
            <h1 >USUARIOS TOTALES</h1>
            {contenedorUsuarios}
        </>
    )

}