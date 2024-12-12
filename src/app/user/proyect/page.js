/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState, useEffect } from 'react';
import "../../_style/userComponentStyle/clientComponentStyle/pageClient.css"
import DataTable from '@/app/component/generalComponent/DataTable';
import { GetData, deleteData } from '@/app/_utils/utils';
import CreateClient from "@/app/component/userComponent/clientComponent/CreateClient"
import UpdateTable from '@/app/component/generalComponent/UpdateTable';

export default function pageUsuario() {

    const columns = ["_id", "name", "projectCode", "street", "code", "email", "createdAt", "updatedAt"]
    const path = "https://bildy-rpmaya.koyeb.app/api/project"
    const [data, setData] = useState([]);
    const [statePopupCreate, setStatePopupCreate] = useState(false)
    const [stateUpdateClient, setStateUpdateClient] = useState(null)
    const [statePopupUpdate, setStatePopupUpdate] = useState(false)

    useEffect(() => {
        sincroniceData()
    }, [])

    const sincroniceData = async () => {
        const token = localStorage.getItem("token")
        const result = await GetData(path, token)
        setData(result)
    }

    const borrar = async () => {
        const token = localStorage.getItem("token")
        const arrayActualizar = data.map(async x => {
            const pathDelete = `${path}/${x._id}`
            const borrado = await deleteData(pathDelete, token)
            return borrado
        })
        const array = await Promise.all(arrayActualizar)

        if (array[0]) {
            sincroniceData()
        }
    }

    const update = stateUpdateClient && <UpdateTable columns={columns} path={path} dataUpdate={stateUpdateClient} setDataUpdate={setStateUpdateClient} sincroniceData={sincroniceData} setShowPopupState={setStatePopupUpdate}></UpdateTable>
    const overlappingContent = ( stateUpdateClient) && (
        <div className="overlappingContent">
            {create}
            {update}
        </div>
    )

    return (
    <div className='client'>
      <header>
        <div className='container-info'>
          <h1>PROYECTO</h1>
        </div>
        <div className='container-interactive'>
          <input></input>
          <div className='container-button'>
            <button onClick={borrar}>BORRAR</button>
          </div>
        </div>
      </header>
      <main>
        <DataTable jsonData={data} columns={columns} setDataUpdate={setStateUpdateClient} ></DataTable>
      </main>
      {overlappingContent}
    </div>
    )

}

