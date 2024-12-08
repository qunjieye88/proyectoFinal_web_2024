/* eslint-disable react/jsx-key */
'use client'
import ClientData from "./ClientData.jsx"
import "../../style/userComponentsStyle/ClientContainer.css"


export default function ClientContainer({clients}) {
    
    const totalClients = clients.length > 0 ? (
        <div className="clientContainer">
            {clients.map(client => (
                (<ClientData key={client["_id"]} client={client}></ClientData>)
            ))}
        </div>
    ) : <h1>No hay clientes</h1>

    return (
        totalClients
    )
}