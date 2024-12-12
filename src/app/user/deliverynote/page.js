/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState, useEffect } from 'react';
import "../../_style/userComponentStyle/clientComponentStyle/pageClient.css"
import DataTable from '@/app/component/generalComponent/DataTable';
import { GetData } from '@/app/_utils/utils';

export default function pageUsuario() {

  const columns = ["_id", "name", "cif", "street", "createdAt", "updatedAt"]
  const path = "https://bildy-rpmaya.koyeb.app/api/deliverynote"
  const [data, setData] = useState([]);

  useEffect(() => {
    sincroniceData()
  }, [])

  const sincroniceData = async () => {
    const token = localStorage.getItem("token")
    const result = await GetData(path, token)
    setData(result)
  }

  const overlappingContent = (false) && (
    <div className="overlappingContent">
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
                    </div>
                </div>
            </header>
            <main>
                <DataTable jsonData={data} ></DataTable>
            </main>
            {overlappingContent}
        </div>
  )

}

