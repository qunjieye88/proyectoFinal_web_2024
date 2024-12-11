/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import UserDataContainer from "../../component/userComponent/UserDataContainer";
import * as Yup from "yup";

export default function pageProyect() {
    const columns = ["_id","name", "projectCode","street", "code", "email", "createdAt", "updatedAt"]
    const path = "https://bildy-rpmaya.koyeb.app/api/project"
  
    return (
        <UserDataContainer columns={columns} path={path} message={"PROYECTO"}/>
    );
}