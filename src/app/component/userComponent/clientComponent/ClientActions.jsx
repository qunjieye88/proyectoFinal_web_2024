'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useState } from 'react';
import { GetData, createData } from "@/app/_utils/utils";
import UpdateTable from "../../generalComponent/UpdateTable";
import CreateProyect from "@/app/component/userComponent/projectComponent/CreateProyect"
import "@/app/_style/userComponentStyle/clientComponentStyle/ClientActions.css"

export default function ClientActions({ client, columns, path, setDataUpdate, sincroniceData,setShowPopupState }) {
    
    return (
        <div className="container-actions">
            <UpdateTable columns={columns} path={path} dataUpdate={client} setDataUpdate={setDataUpdate} sincroniceData={sincroniceData} setShowPopupState={setShowPopupState}></UpdateTable>
            <CreateProyect client={client} setShowPopup={setShowPopupState} setCreateData={setDataUpdate}></CreateProyect>
        </div>
    )
}