/* eslint-disable react/jsx-key */
'use client'
import Usuario from "./ClientData.jsx"
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import ClientCreator from "./ClientCreator.jsx";
import "../../style/userComponentsStyle/ClientContainer.css"


export default function ClientContainer({clients}) {

    
    const [createClient, setCreateClient] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const clientCreator = createClient && <ClientCreator setCreateClient={setCreateClient} setShowPopup={setShowPopup}></ClientCreator>

    const popup = showPopup && (
        <div className="popup">
            <div className="popupContent">
                <h1>CLIENTE CREADO CORRECTAMENTE</h1>
                <button id="closeButton" onClick={() => setShowPopup(false)}>
                    Close
                </button>
            </div>
        </div>
    )

    const totalClients = clients.length > 0 ? (
        <div className="clientContainer">
            {clients.map(client => (
                (<Usuario key={client["_id"]} client={client}></Usuario>)
            ))}
        </div>
    ) : <h1>No hay clientes</h1>

    return (
        <>
            {clientCreator}
            <div className="buttonContainer">
                <button onClick={() => setCreateClient(true)} >CREAR CLIENTE</button>
                <button > BUSCAR CLIENTE</button>
            </div>
            {totalClients}
            {popup}
        </>
    )
}