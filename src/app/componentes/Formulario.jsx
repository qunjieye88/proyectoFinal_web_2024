'use client'
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useRouter } from 'next/navigation';

const SignSquema = Yup.object({
    email: Yup.string().email("No es un email válido").required(),
    password: Yup.string()
        .min(4,"Minimo 4 caracteres")
        .max(10,"Maximo 10 caracteres")
        .required()
})

export default function Formulario(){
    
    const{register, handleSubmit, reset, formState:{errors}}= useForm({
        resolver:yupResolver(SignSquema)
    });

    function onSubmit(data){
        registrar(data.email, data.password)
        reset();
    }

    function registrar(email, password){
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1YTVlNTFiOWNkZTQ4ZTgwMzJmMzIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI3OTEzOTcsImV4cCI6MTczNTM4MzM5N30.MS5HcpdbuJ03WDJn1ZGEmDaH9aNguOz8YMlMmFx1JdQ"
        fetch("https://bildy-rpmaya.koyeb.app/api/user/login",{
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({email, password}),
        }).then(respuesta => respuesta.json())
        .then(dato => console.log(dato))
    }
    const router = useRouter();

    function redirigie(){
        router.push('/');
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} placeholder= "Introduce email"></input>
            {errors.email && <p>{errors.email.message}</p>}
            <input {...register("password")} placeholder= "Introduce password"></input>
            {errors.password && <p>{errors.password.message}</p>}
            <button onClick={redirigie}>asdasd</button>
        </form>
    )

}