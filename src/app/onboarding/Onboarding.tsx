'use client';

import React, { FormEvent, useState } from 'react';

type RecaptchaState = 'OK' | 'INVALID';

const initialForm = {
  fullName: '',
  documentType: '',
  documentId: '',
  email: '',
};

type FormKeys = keyof typeof initialForm;

function generateRequestCode() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `req-${Math.random().toString(36).slice(2, 10)}`;
}

export default function Onboarding() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<FormKeys | 'recaptcha', string>>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<RecaptchaState>('OK');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (field: FormKeys) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setStatus(null);
  };

  const validateForm = () => {
    const newErrors: Partial<Record<FormKeys | 'recaptcha', string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ingresa tu nombre completo.';
    }
    if (!formData.documentType) {
      newErrors.documentType = 'Selecciona un tipo de documento.';
    }
    if (!formData.documentId.trim()) {
      newErrors.documentId = 'Ingresa tu número de documento.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Ingresa tu correo electrónico.';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }
    if (recaptchaToken !== 'OK') {
      newErrors.recaptcha = 'Valida el reCAPTCHA simulado antes de continuar.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Por favor corrige los campos marcados en rojo.',
      });
      return;
    }

    const requestCode = generateRequestCode();
    setStatus({
      type: 'success',
      message: `Solicitud registrada con éxito. Código de seguimiento: ${requestCode}`,
    });
    setFormData(initialForm);
    setErrors({});
  };

  const updateToken = (value: RecaptchaState) => {
    setRecaptchaToken(value);
    setErrors((prev) => ({
      ...prev,
      recaptcha: value === 'OK' ? undefined : 'Valida el reCAPTCHA simulado antes de continuar.',
    }));
    setStatus(null);
  };

  const getControlClass = (field: FormKeys, baseClass = 'form-control') => {
    if (errors[field]) return `${baseClass} is-invalid`;
    if (formData[field]) return `${baseClass} is-valid`;
    return baseClass;
  };

  return (
    <div className="container-fluid py-5">
      <div className="row align-items-center mb-4 gy-3 justify-content-center">
        <div className="col-12 col-xl-10">
          <h1 className="h3 mb-1 text-primary">Adquirir productos</h1>
          <p>Ingresa tus datos y completa el formulario para continuar.  Uno de nuestros agentes se pondrá en contacto contigo pronto.</p>
        </div>
        <div className="col-12 col-xl-10">
          <div className="card border-0 shadow-sm bg-white">
            <div className="card-body p-4">
              <form className="vstack gap-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="fullName" className="form-label fw-semibold">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className={getControlClass('fullName')}
                    placeholder="Ingresa tu nombre completo"
                    value={formData.fullName}
                    onChange={handleChange('fullName')}
                  />
                  <div className="invalid-feedback">{errors.fullName}</div>
                </div>
                <div>
                    <label htmlFor='documentType' className="form-label fw-semibold">Tipo de documento</label>
                    <select
                      id="documentType"
                      className={getControlClass('documentType', 'form-select')}
                      value={formData.documentType}
                      onChange={handleChange('documentType')}
                    >
                        <option value="">Selecciona un tipo de documento</option>
                        <option value="cc">Cédula de ciudadanía</option>
                        <option value="ce">Cédula de extranjería</option>
                        <option value="pasaporte">Pasaporte</option>
                    </select>
                    <div className="invalid-feedback">{errors.documentType}</div>
                </div>
                <div>
                    <label htmlFor='documentId'className="form-label fw-semibold">
                        Número de documento
                    </label>
                    <input
                        type="text"
                        id="documentId"
                        className={getControlClass('documentId')}
                        placeholder="Ingresa tu número de documento"
                        value={formData.documentId}
                        onChange={handleChange('documentId')}
                    />
                    <div className="invalid-feedback">{errors.documentId}</div>
                </div>
                <div>
                    <label htmlFor="email" className="form-label fw-semibold">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={getControlClass('email')}
                        placeholder="Ingresa tu correo electrónico"
                        value={formData.email}
                        onChange={handleChange('email')}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                </div>
                <input type="hidden" name="recaptchaToken" value={recaptchaToken} readOnly />

                <div className="border rounded-3 p-3 bg-light-subtle">
                  <p className="small text-muted mb-2">
                    reCAPTCHA simulado. Usa los botones para generar un token válido o inválido.
                  </p>
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <span
                      className={`badge ${
                        recaptchaToken === 'OK'
                          ? 'bg-success-subtle text-success'
                          : 'bg-danger-subtle text-danger'
                      }`}
                    >
                      Token: {recaptchaToken}
                    </span>
                    <div className="btn-group btn-group-sm" role="group">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => updateToken('OK')}
                      >
                        Token OK
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => updateToken('INVALID')}
                      >
                        Token inválido
                      </button>
                    </div>
                    {errors.recaptcha && (
                      <div className="invalid-feedback d-block">{errors.recaptcha}</div>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Enviar solicitud
                </button>

                {status && (
                  <div
                    className={`alert ${
                      status.type === 'success' ? 'alert-success' : 'alert-danger'
                    } mb-0`}
                    role="alert"
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}   
