'use client'
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

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
        console.log(data);
        reset();
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} placeholder= "Introduce email"></input>
            {errors.email && <p>{errors.email.message}</p>}
            <input {...register("password")} placeholder= "Introduce password"></input>
            {errors.password && <p>{errors.password.message}</p>}
            <button>Registrar</button>
        </form>
    )

}