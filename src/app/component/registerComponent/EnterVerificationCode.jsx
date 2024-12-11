'use client'
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import "../../style/Form.css"
const SignSquema = Yup.object({
    code: Yup.string()
        .min(6,"Minimo 6 caracteres")
        .required()
})

export default function Formulario(){
    const [message, setMessage] = useState("")
    
    const router = useRouter();
    const{register, handleSubmit, reset, formState:{errors}}= useForm({
        resolver:yupResolver(SignSquema)
    });

    function onSubmit(data){
        
        validarCuenta(data.code)
        reset();
    }

    function validarCuenta(code){
        
        const token = localStorage.getItem("token");

        fetch("https://bildy-rpmaya.koyeb.app/api/user/validation",{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({code: code}),
        }).then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                throw new Error();
            }
        })
        .then(dato =>{
            console.log(dato)
            if(dato["acknowledged"]){
                router.push("/");
            }else{
                setMessage("CODIGO INVALIDO")
            }
        }
    ).catch(() => {
        
        setMessage("CODIGO INVALIDO");
    });}


    const mensaje = message && <p className="error-message" >{message}</p>

    return(
        <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
            <input {...register("code")} placeholder= "Introduce el codigo" className="input"></input>
            {errors.code && <p className="error-message">{errors.code.message}</p>}
            {mensaje}
            <button className="formButton">ACEPTAR</button>
        </form>
    )
}