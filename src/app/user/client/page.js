/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useState, useEffect } from 'react';
import * as Yup from "yup";
import UserDataContainer from "../../component/userComponent/UserDataContainer";
export default function pageUsuario() {

  const columns = ["_id","name", "cif","street", "createdAt", "updatedAt"]
  const path = "https://bildy-rpmaya.koyeb.app/api/client"

  return (
    <>
      <UserDataContainer columns={columns} path={path} message={"CLIENTE"}/>
    </>
  );
}
