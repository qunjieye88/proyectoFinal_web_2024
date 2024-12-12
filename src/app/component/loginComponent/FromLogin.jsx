'use client'

import * as Yup from "yup";
import RedirectButton from "../generalComponent/ButtonRedirect"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import "../../_style/generalComponentStyle/FormLogin.css"

const SignSquema = Yup.object({
    email: Yup.string().email("No es un email válido").required(),
    password: Yup.string()
        .min(4, "Mínimo 4 caracteres")
        .max(10, "Máximo 10 caracteres")
        .required()
});

export default function Formulario() {
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema),
    });
    const [existeCuenta, setExisteCuenta] = useState(true);
    const router = useRouter();

    function onSubmit(data) {
        login(data.email, data.password);
        reset();
    }

    function login(email, password) {
        fetch("https://bildy-rpmaya.koyeb.app/api/user/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then((respuesta) => {
                if (respuesta.ok) {
                    return respuesta.json();
                } else {
                    throw new Error();
                }
            })
            .then((dato) => {
                localStorage.setItem("token", dato["token"]);
                setExisteCuenta(true);
                if (dato["token"]) {
                    router.push("/user");
                }
            })
            .catch(() => {
                setExisteCuenta(false);
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
            <h1>Inicia Sesión</h1>
            <div className="inputContainer">
                <input {...register("email")} placeholder="Introduce tu email" className="input" />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
                <input {...register("password")} placeholder="Introduce tu contraseña" type="password" className="input"/>
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <div className="buttonContainer">
                <button type="submit" className="formButton">Aceptar</button>
                <RedirectButton className="formButton" path={"/register"}>crear cuenta</RedirectButton>
            </div>
            {!existeCuenta && <p className="notification">La cuenta no existe</p>}
        </form>
    );
}
