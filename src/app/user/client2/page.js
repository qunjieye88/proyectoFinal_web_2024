/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState, useEffect } from 'react';
import "../../_style/userComponentStyle/clientComponentStyle/pageClient.css"
import DataTable from '@/app/component/generalComponent/DataTable';
import { GetData, deleteData } from '@/app/_utils/utils';
import CreateClient from "@/app/component/userComponent/clientComponent/CreateClient"
import UpdateTable from '@/app/component/generalComponent/UpdateTable';
import Popup from "@/app/component/generalComponent/Popup"
import ClientActions from '@/app/component/userComponent/clientComponent/ClientActions';

export default function pageUsuario() {

  const columns = ["_id", "name", "cif", "street", "createdAt", "updatedAt"]
  const path = "https://bildy-rpmaya.koyeb.app/api/client"
  const [data, setData] = useState([]);
  const [stateCreate, setStateCreate] = useState(false)
  const [statePopupCreate, setStatePopupCreate] = useState(false)
  const [stateUpdateClient, setStateUpdateClient] = useState(null)
  const [statePopupUpdate, setStatePopupUpdate] = useState(false)

  useEffect(() => {
    sincroniceData()
  }, [stateCreate])

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

  const createMassage = statePopupCreate && <Popup setShowPopupState={setStatePopupCreate}>CLIENTE CREADO CORRECTAMENTE</Popup>
  const updateMessage = statePopupUpdate && <Popup setShowPopupState={setStatePopupUpdate}>CLIENTE ACTUALIZADO</Popup>
  const create = stateCreate && <CreateClient setCreateDataState={setStateCreate} setShowPopupState={setStatePopupCreate}></CreateClient>
  const update = stateUpdateClient && <>
    <ClientActions client={stateUpdateClient} columns={columns} path={path} dataUpdate={stateUpdateClient} setDataUpdate={setStateUpdateClient} sincroniceData={sincroniceData} setShowPopupState={setStatePopupUpdate}></ClientActions>
  </>
  const overlappingContent = (stateCreate || stateUpdateClient || statePopupCreate || statePopupUpdate) && (
    <div className="overlappingContent">
      {create}
      {update}
      {createMassage}
      {updateMessage}
    </div>
  )

  return (
    <div className='client'>
      <header>
        <div className='sli'>
          <h1>CLIENTES</h1>
        </div>
        <div className='container-interactive'>
          <input></input>
          <div className='container-button'>
            <button onClick={() => setStateCreate(true)}>CREAR CLIENTE</button>
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

