'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useState, useEffect } from 'react';

import ClientData from "./ClientData";
import "../../style/userComponentsStyle/ClientSearch.css"
const SignSquema = Yup.object({
    name: Yup.string().required(),
    address: Yup.string().required()

})

export default function ClientCreator({ setSearchClient, clients}) {

    const [client, setClient]= useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema)
    });

    function onSubmit(data) {
        buscarCliente(data.name, data.address, data.cif)
        reset();
    }
    const buscarCliente = (name, address, cif)=>{
        const result = clients.find(client => client.name ===name && client.address.street === address && client.cif === cif)
        console.log(result._id)
        const token =  localStorage.getItem("token")
        fetch(`https://bildy-rpmaya.koyeb.app/api/client/${result._id}`,{
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then(respuesta => respuesta.json())
        .then(dato => {
            if(dato){
                setClient(dato)
            }
        })
    }
    
    const contend = client === null ? (
        <form className="ClientCreator" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="titulo">BUSCAR CLIENTE</h1>
                <input {...register("name")} placeholder="Nombre Usuario/Empresa"></input>
                {errors.name && <p className="error-message">{errors.name.message}</p>}
                <input {...register("address")} placeholder="Domicilio"></input>
                {errors.address && <p className="error-message">{errors.address.message}</p>}
                <input {...register("cif")} placeholder="CIF"></input>
                <div className="ButtonContainer">
                    <button type="button" onClick={()=>setSearchClient(false)}>CANDELAR</button>
                    <button type="submit">ACEPTAR</button>
                </div>
            </form>
    ) : (
        <div className="clientSearchDataContainer">
            <ClientData client={client}></ClientData>
            <button onClick={()=>{
                setClient(null)
                setSearchClient(false)
            }}>Cerrar</button>
        </div>
    )


    return (
        contend
    )
}