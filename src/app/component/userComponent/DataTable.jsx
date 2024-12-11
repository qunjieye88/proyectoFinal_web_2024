'use client';

import React from 'react';
import PropTypes from 'prop-types';
import '../../style/userComponentsStyle/DataTable.css';

export default function DynamicTable({ jsonData, columns,setUpdateDataForm}) {

  const onClick= (id)=>{
    setUpdateDataForm(jsonData.find(x=> x[columns[0]] === id))
  }
  return (
    <div className="tableHeader">
      <table className="tableData">
        <thead>
          <tr>
            {columns.map((column, index) => {
              if(index !=0){
                return <th key={index}>{column}</th>
              }
            })}
          </tr>
        </thead>

        <tbody>
          {jsonData.map((row) => (
            <tr key={row._id} onClick={()=>onClick(row[columns[0]])} >
              {columns.map((column, colIndex) => {
                if(colIndex===0){
                }else if(column !="street"){
                  return <td key={colIndex}>{row[column]}</td>
                }else{
                  return <td key={colIndex}>{row["address"][column]}</td>
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

