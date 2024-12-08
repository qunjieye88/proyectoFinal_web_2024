'use client'
import "../../style/userComponentsStyle/ClientData.css"

export default function ClientData({client}){

    return(
        <div className="clientData">
            <h1 className="clientDataName">{client["name"]}</h1>
            <h1 className="clientDataCif">{client["cif"]}</h1>
            <h1 className="clientDataStreet">{client["address"]["street"]}</h1>
        </div>
    )
}