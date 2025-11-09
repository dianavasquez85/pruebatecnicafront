'use client';

import React, { useEffect, useState } from 'react';

export default function Onboarding() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-12 col-xl-10">
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body p-4 p-md-5">
              <h1 className="h4 text-primary mb-3">Onboarding</h1>
              <p className="text-muted mb-4">
                Por favor, ingrese todos los datos requeridos para completar su registro.
              </p>
              <form className="vstack gap-4">
                <div>
                  <label htmlFor="fullName" className="form-label fw-semibold">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="form-control"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                <div>
                    <label htmlFor='documentType' className="form-label fw-semibold">Tipo de documento</label>
                    <select id="documentType" className="form-select">
                        <option value="">Selecciona un tipo de documento</option>
                        <option value="cc">Cédula de ciudadanía</option>
                        <option value="ce">Cédula de extranjería</option>
                        <option value="pasaporte">Pasaporte</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='documentId'className="form-label fw-semibold">
                        Número de documento
                    </label>
                    <input
                        type="text"
                        id="documentId"
                        className="form-control"
                        placeholder="Ingresa tu número de documento"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="form-label fw-semibold">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Ingresa tu correo electrónico"
                    />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}   