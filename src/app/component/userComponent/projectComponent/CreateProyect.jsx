/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useState, useEffect } from 'react';
import "@/app/_style/generalComponentStyle/Form.css"
import { GetData, createData } from "@/app/_utils/utils";

const SignSquema = Yup.object({
    name: Yup.string().required(),
    projectCode: Yup.string().required(),
    email: Yup.string().required(),
    address: Yup.string().required(),
    code: Yup.string().required(),

})
export default function ClientCreator({ setCreateData, setShowPopup, client }) {


    const [error, setError] = useState("")

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema)
    });


    const onSubmit = async (data) => {
        const token = localStorage.getItem("token")
        const path = "https://bildy-rpmaya.koyeb.app/api/project"
        const allProjects = await GetData(path, token)
        const exist = allProjects.find(project => project.clientId === client._id && project.code === data.code && project.projectCode === data.projectCode && project.name === data.nameProyect && project.address.street === data.addressProyect && project.email === data.emailProyecto)
        if (exist) {
            setError("PROYECTO YA EXISTE")
        } else {
            const creado = await crearProyecto(data, client._id)
            if (creado) {
                setError("")
                setShowPopup(true)
                setCreateData(false)
                reset();
            } else {
                setError("DATOS INCORRECTOS")
            }
        }
    }

    async function crearProyecto(data, id) {
        const token = localStorage.getItem("token")
        const path = "https://bildy-rpmaya.koyeb.app/api/project"
        const json = {
            name: data.name,
            projectCode: data.projectCode,
            email: data.email,
            address: { "street": data.address },
            code: data.code,
            clientId: id
        }
        const creado = await createData(path, token, json)
        return creado
    }

    const mensaje = error && <h1 className="error-message">{error}</h1>


    return (
        <form className="formData" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="title">CREAR PROYECTO</h1>
            <input {...register("name")} placeholder="Nombre Proyecto"></input>
            {errors.name && <p className="error-message">{errors.name.message}</p>}
            <input {...register("projectCode")} placeholder="Codigo proyecto"></input>
            {errors.projectCode && <p className="error-message">{errors.projectCode.message}</p>}
            <input {...register("email")} placeholder="Email Proyecto"></input>
            {errors.email && <p className="error-message">{errors.email.message}</p>}
            <input {...register("address")} placeholder="Domicilio Proyecto"></input>
            {errors.address && <p className="error-message">{errors.address.message}</p>}
            <input {...register("code")} placeholder="Codigo Interno proyecto"></input>
            {errors.code && <p className="error-message">{errors.code.message}</p>}
            {mensaje}
            <div className="ButtonContainer">
                <button type="button" onClick={() => setCreateData(false)}>CANDELAR</button>
                <button type="submit">ACEPTAR</button>
            </div>
        </form>
    )
}