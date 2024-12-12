'use client';

import React from 'react';
import "@/app/_style/generalComponentStyle/Popup.css"

export default function DynamicTable({ setShowPopupState, children }) {

    return (
        <div className="popup">
            <div className="popupContent">
                <h1 className='text'>{`${children}`}</h1>
                <button className="closeButton" onClick={() => setShowPopupState(false)}>
                    Close
                </button>
            </div>
        </div>
    );
}

