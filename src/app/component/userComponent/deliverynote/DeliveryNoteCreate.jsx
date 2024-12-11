/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useState, useEffect } from 'react';
import "../../../style/userComponentsStyle/Form.css"
import { GetData, createData } from "@/app/utils/utils";

const SignSquema = Yup.object({
    code: Yup.string().required(),
    address: Yup.string().required(),
    format: Yup.string().required(),
    material: Yup.string().required(),
    hours: Yup.string().required(),
    workdate: Yup.string().required(),
    description: Yup.string().required(),

})
export default function ClientCreator({ setCreateData, setShowPopup }) {

    const [error, setError] = useState("")

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema)
    });

    
    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");
        const path = "https://bildy-rpmaya.koyeb.app/api/project"
        const projects = await GetData(path, token)
        const project = projects.find(project => project.code === data.code && project.address.street === data.address)
        
        console.log("project")
        console.log(project)
        if(project){
            const token = localStorage.getItem("token")
            const path = "https://bildy-rpmaya.koyeb.app/api/deliverynote"
            const deliverytnotes = await GetData(path, token)
            console.log(deliverytnotes)
            const exist = deliverytnotes.find(deliverytnote => deliverytnote.format === data.format && deliverytnote.material ===data.material
                && deliverytnote.hours === data.hours && deliverytnote.description ===data.description && deliverytnote.workdate ===data.workdate
                && deliverytnote.clientId === project.clientId && deliverytnote.projectId ===project._id
            )
            console.log("exist")
            console.log(exist)
            if (exist) {
                setError("ALBARAN YA EXISTE")
            } else {
                const creado = await crearProyecto(data, project._id,project.clientId )
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
            setError("PROYECTO NO EXISTE")
        }
    }

    async function crearProyecto(data, id, clientId) {
        const token = localStorage.getItem("token")
        const path = "https://bildy-rpmaya.koyeb.app/api/deliverynote"
        const json = {
            clientId: clientId,
            projectId: id,
            format: data.format,
            material: data.material,
            hours: data.hours,
            description: data.description,
            workdate: data.workdate,
        }
        const creado = await createData(path, token, json)
        return creado
    }

    const mensaje = error && <h1 className="error-message">{error}</h1>
    return (
        <>
            <form className="formData" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">CREAR ALBARAN</h1>
                <h2 className="subtitle">DATOS PROYECTO</h2>
                <input {...register("code")} placeholder="codigo proyecto"></input>
                {errors.code && <p className="error-message">{errors.code.message}</p>}
                <input {...register("address")} placeholder="Domicilio"></input>
                {errors.address && <p className="error-message">{errors.address.message}</p>}
                <h2 className="subtitle">DATOS ALBARAN</h2>
                <input {...register("format")} placeholder="Formato"></input>
                {errors.format && <p className="error-message">{errors.format.message}</p>}
                <input {...register("material")} placeholder="Material"></input>
                {errors.material && <p className="error-message">{errors.material.message}</p>}
                <input {...register("hours")} placeholder="Horas"></input>
                {errors.hours && <p className="error-message">{errors.hours.message}</p>}
                <input {...register("description")} placeholder="Descripcion"></input>
                {errors.description && <p className="error-message">{errors.description.message}</p>}
                <input {...register("workdate")} placeholder="Dia"></input>
                {errors.workdate && <p className="error-message">{errors.workdate.message}</p>}
                {mensaje}
                <div className="ButtonContainer">
                    <button type="button" onClick={() => setCreateData(false)}>CANDELAR</button>
                    <button type="submit">ACEPTAR</button>
                </div>
            </form>
        </>
    )
}