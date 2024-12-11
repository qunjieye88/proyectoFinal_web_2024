'use client';

import React from 'react';
import "../../style/userComponentsStyle/Popup.css"

export default function DynamicTable({ setShowPopup,message}) {
    
    return (
        <div className="popup">
            <div className="popupContent">
                <h1>{`${message} CREADO CORRECTAMENTE`}</h1>
                <button id="closeButton" onClick={() => setShowPopup(false)}>
                    Close
                </button>
            </div>
        </div>
    );
}

