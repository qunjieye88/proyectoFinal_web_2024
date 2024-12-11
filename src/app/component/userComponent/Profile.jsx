'use client';
import React from 'react';
import '../../style/userComponentsStyle/Profile.css';

export default function UserProfile({ user }) {
  const formatDate = (date) => {
    if (!date) return "No disponible";
    return new Date(date).toLocaleDateString();
  };

  return (
    user &&
    <div className="profile-container">
      <h1 className="profile-title">Perfil de Usuario</h1>
      <div className='dataContainer'>
      <div className="profile-section">
        <h2>Información Personal</h2>
        <p><strong>Nombre:</strong> {user.name || "No especificado"}</p>
        <p><strong>Apellidos:</strong> {user.surnames || "No especificado"}</p>
        <p><strong>Email:</strong> {user.email || "No especificado"}</p>
        <p><strong>NIF:</strong> {user.nif || "No especificado"}</p>
        <p><strong>Rol:</strong> {user.role || "No especificado"}</p>
      </div>
      <div className="profile-section">
        <h2>Dirección</h2>
        <p><strong>Calle:</strong> {user.address?.street || "No especificado"}</p>
        <p><strong>Número:</strong> {user.address?.number || "No especificado"}</p>
        <p><strong>Ciudad:</strong> {user.address?.city || "No especificado"}</p>
        <p><strong>Provincia:</strong> {user.address?.province || "No especificado"}</p>
        <p><strong>Código Postal:</strong> {user.address?.postal || "No especificado"}</p>
      </div>
      <div className="profile-section">
        <h2>Empresa</h2>
        <p><strong>Nombre:</strong> {user.company?.name || "No especificado"}</p>
        <p><strong>CIF:</strong> {user.company?.cif || "No especificado"}</p>
        <p><strong>Calle:</strong> {user.company?.street || "No especificado"}</p>
        <p><strong>Número:</strong> {user.company?.number || "No especificado"}</p>
        <p><strong>Ciudad:</strong> {user.company?.city || "No especificado"}</p>
        <p><strong>Provincia:</strong> {user.company?.province || "No especificado"}</p>
        <p><strong>Código Postal:</strong> {user.company?.postal || "No especificado"}</p>
      </div>
    </div>
    </div>
  );
}
