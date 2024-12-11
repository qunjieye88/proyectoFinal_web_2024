'use client'
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import RedirectButton from "../RedirectButton"
import "../../style/Form.css"

const SignSquema = Yup.object({
    email: Yup.string().email("No es un email válido").required(),
    password: Yup.string()
        .min(4,"Minimo 4 caracteres")
        .max(10,"Maximo 10 caracteres")
        .required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required()
    
})

export default function FormularioRegistro(){
    
    const [message, setMessage] = useState("")
    
    const{register, handleSubmit, reset, formState:{errors}}= useForm({
        resolver:yupResolver(SignSquema)
    });
    
    const router = useRouter();

    function onSubmit(data){
        crearCuenta(data.email, data.password, data.firstName,data.lastName)
        reset();
    }

    function crearCuenta(email, password, firstName,lastName){
        fetch("https://bildy-rpmaya.koyeb.app/api/user/register",{
            method: "POST",
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({email, password, firstName, lastName}),
        }).then(respuesta => respuesta.json())
        .then(dato =>{
            if(dato["token"]){
                localStorage.setItem("token",dato["token"]);
                router.push("/register/entercodeverification");
            }else{
                console.log("hola")
                setMessage("CORREO YA EXISTE")
            }
        }
    )}

    const mensaje = message && <p className="error-message" >{message}</p>

    return(
        <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
            
            <h1>PAGINA REGISTRAR</h1>
            <input {...register("firstName")} placeholder= "First name" className="input" ></input>
            {errors.firstName && <p  className="error-message">{errors.firstName.message}</p>}
            <input {...register("lastName")} placeholder= "Last name" className="input" ></input>
            {errors.lastName && <p  className="error-message" >{errors.lastName.message}</p>}
            <input {...register("email")} placeholder= "Email" className="input" ></input>
            {errors.email && <p  className="error-message"> {errors.email.message}</p>}
            <input {...register("password")} placeholder= "Password" type = "password" className="input" ></input>
            {errors.password && <p  className="error-message" >{errors.password.message}</p>}
            {mensaje}
            <div className="buttonContainer">
                <button className="formButton">ACEPTAR</button>
                <RedirectButton  className="formButton" path={"/"}>Ya tengo cuenta</RedirectButton>
            </div>
        </form>
    )
}