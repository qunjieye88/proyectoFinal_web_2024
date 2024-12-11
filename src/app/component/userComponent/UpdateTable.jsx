'use client';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { updateData } from "@/app/utils/utils";
import "../../style/userComponentsStyle/Form.css"

import { createJson } from "@/app/utils/utils";

export default function FormularioRegistro({ columns, updateDataForm, path ,sincroniceData,setUpdateDataForm}) {
    
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
        const json = createJson(data,columns)
        const token = localStorage.getItem("token")
        const actualizado = await updateData(`${path}/${updateDataForm[columns[0]]}`, token,json)
        if(actualizado){
            sincroniceData()
            setUpdateDataForm(null)
            reset()
        }
    };

    useEffect(() => {
        if (updateDataForm) {
            reset();
        }
    }, [updateDataForm]);

    return (
        <form className="formData" onSubmit={handleSubmit(onSubmit)}>
            {columns.map((row, index) => row != "street" ? (
                <div key={index} className="row">
                    <h1>{row}</h1>
                    <input
                        {...register(row)}
                        id={row}
                        placeholder={`Ingresa tu ${row}`}
                        defaultValue={`${updateDataForm[row]}`}
                        className={errors[row] ? "input-error" : ""
                        }
                    />
                    {errors[row] && <p className="error-message">{errors[row].message}</p>}
                </div>
            ) : (<div key={index} className="row">
                <label htmlFor={row}>{row}</label>
                <input
                    {...register(row)}
                    id={row}
                    placeholder={`Ingresa tu ${row}`}
                    defaultValue={`${updateDataForm["address"][row]}`}
                    className={errors[row] ? "input-error" : ""
                    }
                />
                {errors[row] && <p className="error-message">{errors[row].message}</p>}
            </div>))}
            <div>
                <button type="button" onClick={()=>setUpdateDataForm(null)}>Cancelar</button>
                <button type="submit">Enviar</button>
            </div>
        </form>
    );
}