'use client'
import "../../style/userComponentsStyle/UserDataContainer.css"
import ButtonContainer from "./ButtonContainer"
import DataTable from "./DataTable.jsx"
import { useState, useEffect } from 'react';
import ClientCreate from "./client/ClientCreate";
import ClientSearch from "./client/ClientSearch";
import ProyectCreate from "./proyect/ProyectCreate";
import ProyectSearch from "./proyect/ProyectSearch";
import DeliveryNoteCreate from "./deliverynote/DeliveryNoteCreate";
import Popup from "./Popup"
import { GetData, deleteConcreteClient, createJson } from "@/app/utils/utils";
import UpdateTable from "./UpdateTable"
export default function UserDataContainer({ columns, path, message }) {

    const [data, setData] = useState([]);
    const [createData, setCreateData] = useState(false);
    const [searchData, setSearchData] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [updateDataForm, setUpdateDataForm] = useState(null);

    useEffect(() => {
        sincroniceData()
    }, [createData])


    const sincroniceData = async () => {
        const token = localStorage.getItem("token")
        const dato = await GetData(path, token)
        setData(dato)
    }

    const borrar = () => {
        const token = localStorage.getItem("token")
        data.map(async x => {
            const pathDelete = `${path}/${x._id}`
            console.log(pathDelete)
            const borrado = await deleteConcreteClient(pathDelete, token)
            if(borrado){
                sincroniceData()
            }
        })
    }

    const generateCreateComponent = () => {
        switch (message) {
            case "CLIENTE":
                return <ClientCreate setCreateData={setCreateData} setShowPopup={setShowPopup}></ClientCreate>;
            case "PROYECTO":
                return <ProyectCreate setCreateData={setCreateData} setShowPopup={setShowPopup}></ProyectCreate>;
            case "ALBARAN":
                return <DeliveryNoteCreate setCreateData={setCreateData} setShowPopup={setShowPopup}></DeliveryNoteCreate>;
        }
    }

    const generateSearchComponent = () => {
        switch (message) {
            case "CLIENTE":
                return <ClientSearch setSearchClient={setSearchData} setData={setData}></ClientSearch>;
            case "PROYECTO":
                return <ProyectSearch setSearchData={setSearchData} setData={setData}></ProyectSearch>;
        }

    }

    const tabla = (<DataTable jsonData={data} columns={columns} setUpdateDataForm={setUpdateDataForm}></DataTable>)
    const createComponent = createData && generateCreateComponent()
    const searchComponent = searchData && generateSearchComponent()
    const popup = showPopup && <Popup message={message} setShowPopup={setShowPopup}></Popup>
    const updateTable = updateDataForm && <UpdateTable setUpdateDataForm={setUpdateDataForm} columns={columns} updateDataForm ={updateDataForm} path={path} sincroniceData={sincroniceData}></UpdateTable>

    return (
        <div className='AllClientDataContainer'>
            <ButtonContainer message={message} setSearchData={setSearchData} setCreateData={setCreateData} updateData={sincroniceData} ></ButtonContainer>
            {tabla}
            {createComponent}
            {searchComponent}
            {popup}
            {updateTable}
            <button onClick={borrar}> borrar</button>
        </div>
    )
}