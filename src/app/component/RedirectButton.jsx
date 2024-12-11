'use client'
import { useRouter } from 'next/navigation';
import {useState} from "react"

export default function BotonLogin({path, className, addFuncions, children}){

    const router = useRouter();
    
    function redirigie(){
        if(path){
            if(addFuncions){
                addFuncions()
            }
            router.push(path);
        }
    }

    return(
        <button className ={className} type="button" onClick={redirigie}>{children}</button>
    )

}