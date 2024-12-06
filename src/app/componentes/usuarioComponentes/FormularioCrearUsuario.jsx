'use client'
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SignSquema = Yup.object({
    name: Yup.string().required(),
    address: Yup.string().required()
    
})

export default function FormularioCrearUsuario(){
    
    const{register, handleSubmit, reset, formState:{errors}}= useForm({
        resolver:yupResolver(SignSquema)
    });

    function onSubmit(data){
        crearCliente(data.name, data.address,data.cif)
        reset();
    }

    function crearCliente(name, address,cif){
        console.log(name)
        console.log(cif)

        const token = localStorage.getItem("token")
        fetch("https://bildy-rpmaya.koyeb.app/api/client",{
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name, 
                address: { address },
                cif}),
        }).then(respuesta => respuesta.json())
        .then(dato =>{
            console.log(dato)
        }
    )}


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder= "Nombre Usuario/Empresa"></input>
            {errors.name && <p>{errors.name.message}</p>}
            <input {...register("address")} placeholder= "Domicilio"></input>
            {errors.address && <p>{errors.address.message}</p>}
            <input {...register("cif")} placeholder= "CIF"></input>
            <button>ACEPTAR</button>
        </form>
    )
}