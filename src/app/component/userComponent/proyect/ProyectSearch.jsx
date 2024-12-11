'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import "../../../style/userComponentsStyle/Form.css"
import { GetData, createData } from "@/app/utils/utils";

import { useState, useEffect } from 'react';
const SignSquema = Yup.object({
    name: Yup.string().required(),
    address: Yup.string().required()

})

export default function ClientSearch({ setSearchData,  setData }) {
    
    const [error, setError] = useState("")

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema)
    });

    async function onSubmit(data) {
        const token = localStorage.getItem("token");
        const path = "https://bildy-rpmaya.koyeb.app/api/client"
        const clients = await GetData(path, token)
        const client = clients.find(client => client.name === data.name && client.address.street === data.address && client.cif === data.cif)
        if(client){
            const token = localStorage.getItem("token");
            const path = "https://bildy-rpmaya.koyeb.app/api/project"
            const proyectos = await GetData(path, token)
            const proyectConcrete = proyectos.filter(proyect => proyect.clientId === client._id)
            console.log(proyectConcrete)
            if(proyectConcrete.length>0){
                setData(proyectConcrete)
                setSearchData(false)
                reset();
            }else{
                setError("Cliente sin proyectos")
            }
        }else{
            setError("Cliente no existe")
        }
        
    }
    
    const mensaje = error && <h1 className="error-message">{error}</h1>

    return (
        <form className="formData" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="title">BUSCAR PROYECTO DE CLIENTE</h1>
            <input {...register("name")} placeholder="Nombre Usuario/Empresa"></input>
            {errors.name && <p className="error-message">{errors.name.message}</p>}
            <input {...register("address")} placeholder="Domicilio"></input>
            {errors.address && <p className="error-message">{errors.address.message}</p>}
            <input {...register("cif")} placeholder="CIF"></input>
            {mensaje}
            <div className="ButtonContainer">
                <button type="button" onClick={() => setSearchData(false)}>CANDELAR</button>
                <button type="submit">ACEPTAR</button>
            </div>
        </form>
    )
}