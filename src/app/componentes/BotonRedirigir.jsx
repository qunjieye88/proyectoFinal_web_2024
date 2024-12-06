'use client'
import { useRouter } from 'next/navigation';
import {useState} from "react"

export default function BotonLogin({path, mensaje}){

    const router = useRouter();
    
    function redirigie(){
        router.push(path);
    }

    return(
        <button onClick={redirigie}>{mensaje}</button>
    )

}