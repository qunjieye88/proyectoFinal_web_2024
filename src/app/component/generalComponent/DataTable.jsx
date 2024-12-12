'use client';
import React from 'react';
import "../../_style/generalComponentStyle/DataTable.css"

export default function DataTable({ jsonData, columns, setDataUpdate}) {

    const onClick = (id) => {
        setDataUpdate(jsonData.find(x => x[columns[0]] === id))
    }


    const dato = jsonData && jsonData.length > 0 ? (
        
    <div className="tableHeader">
        <table className="tableData">
            <thead>
                <tr>
                    {columns.map((column, index) => {
                        if (index != 0) {
                            return <th key={index}>{column}</th>
                        }
                    })}
                </tr>
            </thead>
            <tbody>
                {jsonData.map((row) => (
                    <tr key={row._id}  >
                        {columns.map((column, colIndex) => {
                            if (colIndex === 0) {
                            } else if (column != "street") {
                                return <td key={colIndex} onClick={() => onClick(row[columns[0]])}>{row[column]}</td>
                            } else {
                                return <td key={colIndex} onClick={() => onClick(row[columns[0]])}>{row["address"][column]}</td>
                            }
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>) : (<h1 className='info'>NO DATA</h1>)

    return (
        <>
            {dato}
        </>
    );
}

