/* eslint-disable react/jsx-key */
'use client'
import "../../style/userComponentsStyle/ButtonContainer.css"

export default function ButtonContainer({message,setCreateData, setSearchData,updateData}) {

    return (
        <div className="buttonContainer">
            <button onClick={()=>setSearchData(true)}>{`BUSCAR ${message}`}</button>
            <button onClick={()=>setCreateData(true)}>{`CREAR ${message}`}</button>
            <button onClick={updateData}>{`MOSTRAR TODOS LOS ${message}`}</button>
        </div>
    );
};