/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useState, useEffect } from 'react';
import "../../../style/userComponentsStyle/Form.css"
import { GetData, createData } from "@/app/utils/utils";

const SignSquema = Yup.object({
    name: Yup.string().required(),
    cif: Yup.string().required(),
    address: Yup.string().required(),
    code: Yup.string().required(),
    projectCode: Yup.string().required(),
    nameProyect: Yup.string().required(),
    addressProyect: Yup.string().required(),
    emailProyecto: Yup.string().required(),

})
export default function ClientCreator({ setCreateData, setShowPopup }) {

    const [error, setError] = useState("")

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema)
    });


    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");
        const path = "https://bildy-rpmaya.koyeb.app/api/client"
        const clients = await GetData(path, token)
        const client = clients.find(client => client.name === data.name && client.address.street === data.address && client.cif === data.cif)
        if(client){
            const token = localStorage.getItem("token")
            const path = "https://bildy-rpmaya.koyeb.app/api/project"
            const allProjects = await GetData(path, token)
            const exist = allProjects.find(project => project.clientId === client._id && project.code === data.code && project.projectCode === data.projectCode && project.name === data.nameProyect && project.address.street === data.addressProyect && project.email === data.emailProyecto)
            if (exist) {
                setError("PROYECTO YA EXISTE")
            } else {
                const creado = await crearProyecto(data, client._id)
                if(creado){
                    setError("")
                    setShowPopup(true)
                    setCreateData(false)
                    reset();
                }else{
                    setError("DATOS INCORRECTOS")
                }
            }
        }else{
            setError("CLIENTE NO EXISTE")
        }
    }

    async function crearProyecto(data, id) {
        const token = localStorage.getItem("token")
        const path = "https://bildy-rpmaya.koyeb.app/api/project"
        const json = {
            name: data.nameProyect,
            address: { "street": data.addressProyect },
            email: data.emailProyecto,
            code: data.code,
            projectCode: data.projectCode,
            clientId: id
        }
        const creado = await createData(path, token, json)
        return creado
    }

    const mensaje = error && <h1 className="error-message">{error}</h1>
    return (
        <>
            <form className="formData" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">CREAR CLIENTE</h1>
                <h2 className="subtitle">DATOS CLIENTE</h2>
                <input {...register("name")} placeholder="Nombre Usuario/Empresa"></input>
                {errors.name && <p className="error-message">{errors.name.message}</p>}
                <input {...register("address")} placeholder="Domicilio"></input>
                {errors.address && <p className="error-message">{errors.address.message}</p>}
                <input {...register("cif")} placeholder="CIF"></input>
                <h2 className="subtitle">DATOS PROYECTO</h2>
                <input {...register("code")} placeholder="Codigo Interno proyecto"></input>
                {errors.code && <p className="error-message">{errors.code.message}</p>}
                <input {...register("nameProyect")} placeholder="Nombre Proyecto"></input>
                {errors.nameProyect && <p className="error-message">{errors.nameProyect.message}</p>}
                <input {...register("projectCode")} placeholder="Codigo proyecto"></input>
                {errors.projectCode && <p className="error-message">{errors.projectCode.message}</p>}
                <input {...register("addressProyect")} placeholder="Domicilio Proyecto"></input>
                {errors.addressProyect && <p className="error-message">{errors.addressProyect.message}</p>}
                <input {...register("emailProyecto")} placeholder="Email Proyecto"></input>
                {errors.emailProyecto && <p className="error-message">{errors.emailProyecto.message}</p>}
                {mensaje}
                <div className="ButtonContainer">
                    <button type="button" onClick={() => setCreateData(false)}>CANDELAR</button>
                    <button type="submit">ACEPTAR</button>
                </div>
            </form>
        </>
    )
}