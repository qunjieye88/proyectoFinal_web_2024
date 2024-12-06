'use client'
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SignSquema = Yup.object({
    code: Yup.string()
        .min(4,"Minimo 8 caracteres")
        .required()
})

export default function Formulario({token,setCuentaValidada}){

    
    const{register, handleSubmit, reset, formState:{errors}}= useForm({
        resolver:yupResolver(SignSquema)
    });

    function onSubmit(data){
        
        const {code} = data;
        validarCuenta(code)
        reset();
    }

    function validarCuenta(codigo){

        fetch("https://bildy-rpmaya.koyeb.app/api/user/validation",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({code: codigo}),
        }).then(respuesta => respuesta.json())
        .then(dato =>{
            console.log(dato)
            if(dato["acknowledged"]){
                setCuentaValidada(true)
            }
        }
    )}

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("code")} placeholder= "Introduce el codigo"></input>
            {errors.code && <p>{errors.code.message}</p>}
            <button>ACEPTAR</button>
        </form>
    )
}