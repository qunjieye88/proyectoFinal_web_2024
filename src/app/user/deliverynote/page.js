/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import UserDataContainer from "../../component/userComponent/UserDataContainer";

export default function pageUsuario() {
  const columns = ["_id","format","hours","description", "createdAt","updatedAt"]
  const path = "https://bildy-rpmaya.koyeb.app/api/deliverynote"
  return (
    <UserDataContainer path={path} columns={columns} message={"ALBARAN"} />
  );
}