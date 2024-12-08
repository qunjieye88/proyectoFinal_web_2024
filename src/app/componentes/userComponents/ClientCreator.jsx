'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useState, useEffect } from 'react';
import "../../style/userComponentsStyle/ClientCreator.css"

const SignSquema = Yup.object({
    name: Yup.string().required(),
    address: Yup.string().required()

})

export default function ClientCreator({ setCreateClient ,setShowPopup}) {


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema)
    });

    function onSubmit(data) {
        crearCliente(data.name, data.address, data.cif)
        setCreateClient(false)
        reset();
    }

    function crearCliente(name, address, cif) {
        const token = localStorage.getItem("token")
        fetch("https://bildy-rpmaya.koyeb.app/api/client", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                address: { "street": address },
                cif
            }),
        }).then(respuesta => respuesta.json())
            .then(dato => {
                if(dato){
                    setShowPopup(true)
                }
            }
            )
    }

    return (
        <>
            <form className="ClientCreator" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="titulo">CREAR CLIENTE</h1>
                <input {...register("name")} placeholder="Nombre Usuario/Empresa"></input>
                {errors.name && <p className="error-message">{errors.name.message}</p>}
                <input {...register("address")} placeholder="Domicilio"></input>
                {errors.address && <p className="error-message">{errors.address.message}</p>}
                <input {...register("cif")} placeholder="CIF"></input>
                <div className="ButtonContainer">
                    <button type="button" onClick={()=>setCreateClient(false)}>CANDELAR</button>
                    <button type="submit">ACEPTAR</button>
                </div>
            </form>
        </>
    )
}