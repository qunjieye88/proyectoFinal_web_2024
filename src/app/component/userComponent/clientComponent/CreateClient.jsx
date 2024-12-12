'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useState } from 'react';
import { GetData, createData } from "@/app/_utils/utils";
import "@/app/_style/generalComponentStyle/Form.css"

const SignSquema = Yup.object({
    name: Yup.string().required(),
    address: Yup.string().required()

})
export default function ClientCreator({ setCreateDataState, setShowPopupState }) {

    const [error, setError] = useState("")

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(SignSquema)
    });

    async function onSubmit(data) {
        const token = localStorage.getItem("token")
        const path = "https://bildy-rpmaya.koyeb.app/api/client"
        const allClients = await GetData(path, token)
        const exist = allClients.find(client => client.name === data.name && client.address.street === data.address && client.cif === data.cif)
        if (exist) {
            setError("CLIENTE YA EXISTE")
        } else {
            const creado = await crearCliente(data.name, data.address, data.cif)
            if (creado) {
                setCreateDataState(false)
                setShowPopupState(true)
                setError("")
                reset();
            }else{
                setError("DATOS EQUIVOCADOS")
            }
        }
    }

    async function crearCliente(name, address, cif) {
        const token = localStorage.getItem("token")
        const path = "https://bildy-rpmaya.koyeb.app/api/client"
        const json = {
            name,
            address: { "street": address },
            cif
        }
        const data = await createData(path, token, json)
        return data
    }

    const mensaje = error && <h1 className="error-message" >{error}</h1>
    return (
            <form className="formData" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">CREAR CLIENTE</h1>
                <input {...register("name")} placeholder="Nombre Usuario/Empresa"></input>
                {errors.name && <p className="error-message">{errors.name.message}</p>}
                <input {...register("address")} placeholder="Domicilio"></input>
                {errors.address && <p className="error-message">{errors.address.message}</p>}
                <input {...register("cif")} placeholder="CIF"></input>
                {mensaje}
                <div className="ButtonContainer">
                    <button type="button" onClick={() => setCreateDataState(false)}>CANDELAR</button>
                    <button type="submit">ACEPTAR</button>
                </div>
            </form>
    )
}