'use client'
import { useState, useEffect } from 'react';
import ClientContainer from "./ClientContainer.jsx"
import ClientCreator from "./ClientCreator.jsx";
import ClientSearch from "./ClientSearch.jsx"
import "../../style/userComponentsStyle/UserDataContainer.css"

export default function UserDataContainer() {

    const [clients, setClientss] = useState([]);
    const [createClient, setCreateClient] = useState(false);
    const [searchClient, setSearchClient] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("https://bildy-rpmaya.koyeb.app/api/client", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        }).then(respuesta => respuesta.json())
            .then(dato => {
                setClientss(dato)
            })
    }, [createClient])

    const clientCreator = createClient && <ClientCreator setCreateClient={setCreateClient} setShowPopup={setShowPopup}></ClientCreator>
    const clientSearch = searchClient && <ClientSearch setSearchClient={setSearchClient} clients={clients}></ClientSearch>

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

    return (
        <div className='userDataContaier'>
            <div className="buttonContainer">
                <button onClick={() => setCreateClient(true)} >CREAR CLIENTE</button>
                <button onClick={() => setSearchClient(true)}> BUSCAR CLIENTE</button>
            </div>
            <ClientContainer clients={clients}></ClientContainer>
            {clientCreator}
            {clientSearch}
            {popup}
        </div>
    )

}