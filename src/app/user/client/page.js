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
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);

  return (
    <div className='client'>
      <div className='slider-clients'>

      </div>
      <div className='container-client'>

      </div>
    </div>
  )

}

