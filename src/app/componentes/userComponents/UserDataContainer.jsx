'use client'
import { useState, useEffect } from 'react';
import ClientContainer from "./ClientContainer.jsx"
import "../../style/userComponentsStyle/UserDataContainer.css"

export default function UserDataContainer() {

    const [clients, setClientss] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("https://bildy-rpmaya.koyeb.app/api/client", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        }).then(respuesta => respuesta.json())
            .then(dato => {
                setClientss(dato)
            })
    }, [])



    return (
        <>
            <div className='userDataContaier'>
                <ClientContainer clients={clients}></ClientContainer>
            </div>
        </>
    )

}