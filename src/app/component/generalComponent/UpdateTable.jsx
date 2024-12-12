'use client';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { updateData } from "@/app/_utils/utils";
import "@/app/_style/generalComponentStyle/Form.css"
import { createJson } from "@/app/_utils/utils";

export default function UpdateTable({ columns, path, dataUpdate, setDataUpdate, sincroniceData, setShowPopupState }) {

    console.log("hola")
    const validationSchema = Yup.object(
        columns.reduce((schema, field) => {
            if (field === "email") {
                schema[field] = Yup.string().email("Email inválido").required("El email es obligatorio");
            } else if (field === "password") {
                schema[field] = Yup.string()
                    .min(4, "Mínimo 4 caracteres")
                    .max(10, "Máximo 10 caracteres")
                    .required("La contraseña es obligatoria");
            } else {
                schema[field] = Yup.string().required(`El campo ${field} es obligatorio`);
            }
            return schema;
        }, {})
    );

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        const json = createJson(data, columns)
        const token = localStorage.getItem("token")
        const actualizado = await updateData(`${path}/${dataUpdate[columns[0]]}`, token, json)
        if (actualizado) {
            sincroniceData()
            setDataUpdate(null)
            setShowPopupState(true)
            reset()
        }
    };



    useEffect(() => {
        if (dataUpdate) {
            reset();
        }
    }, [dataUpdate]);

    return (
        <form className="formData" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="title">ACTUALIZAR</h1>
            {columns.map((row, index) => row != "street" ? (
                <>
                    <div key={index} className="row">
                        <p>{row}</p>
                        <input
                            {...register(row)}
                            id={row}
                            placeholder={`Ingresa tu ${row}`}
                            defaultValue={`${dataUpdate[row]}`}
                            className={errors[row] ? "input-error" : ""
                            }
                        />
                    </div>
                    {errors[row] && <p className="error-message">{errors[row].message}</p>}
                </>


            ) : (
                <>
                    <div key={index} className="row">
                        <p htmlFor={row}>{row}</p>
                        <input
                            {...register(row)}
                            id={row}
                            placeholder={`Ingresa tu ${row}`}
                            defaultValue={`${dataUpdate["address"][row]}`}
                            className={errors[row] ? "input-error" : ""
                            }
                        />

                    </div>{errors[row] && <p className="error-message">{errors[row].message}</p>}
                </>))}
            <div className="ButtonContainer">
                <button type="button" onClick={() => setDataUpdate(null)}>Cancelar</button>
                <button type="submit">Enviar</button>
            </div>
        </form>
    );
}