import { Divider, TextInput, Select, SelectItem } from '@tremor/react';
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/styles";
import { useUserActions } from '../hooks/useUserActions';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateNewUser = () => {
  const { addUser } = useUserActions()
  const [result, setResult] = useState<"OK" | "KO" | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = {
      first: formData.get('first-name') as string,
      last: formData.get('last-name') as string,
    }
    const email = formData.get('email') as string
    const location = {
      country: formData.get('country') as string
    }
    const phone = formData.get('phone') as string
    const id = {
      name: formData.get('document-type') as string,
      value: formData.get('document-number') as string
    }
    const picture = {
      large: formData.get('photo') as string,
      medium: formData.get('photo') as string,
      thumbnail: formData.get('photo') as string
    }

    if (!name || !email || !location || !phone || !id) {
      return setResult("KO")
    }

    addUser({ name, email, location, phone, id, picture })
    setResult("OK")
    form.reset()
    setTimeout(() => {
      navigate("/")
    }, 4000)
  }

  // This is to set the name attribute to the phone input
  const inputCountry = document.querySelector(".iti__tel-input")
  if (inputCountry) {
    inputCountry.setAttribute("name", "phone")
  }

  return (
    <>
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Registrar en el espacio de trabajo un nuevo usuario
        </h3>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
          <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="photo"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Foto
              </label>
              <TextInput
                type="url"
                id="photo"
                name="photo"
                autoComplete="photo"
                placeholder="www.exampleIMG.com"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="first-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Nombres
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="first-name"
                name="first-name"
                autoComplete="first-name"
                placeholder="Nombres"
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="last-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Apellidos
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="last-name"
                name="last-name"
                autoComplete="last-name"
                placeholder="Apellidos"
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Email
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="country"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                País de residencia actual
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="country"
                name="country"
                autoComplete="country"
                placeholder="País"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Número de teléfono
                <span className="text-red-500">*</span>
              </label>
              <IntlTelInput
                initOptions={{
                  containerClass: "mt-2",
                  initialCountry: "us",
                  utilsScript: "/utils.js",
                  showFlags: true,
                  separateDialCode: true,
                }}
              />
            </div>
            <div className="col-span-full  sm:col-span-3 mt-[9px]">
              <label
                htmlFor="document-type"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Tipo de documento
                <span className="text-red-500">*</span>
              </label>
              <Select defaultValue="CC" id='document-type' name='document-type' required>
                <SelectItem value="CC">Cédula de ciudadania</SelectItem>
                <SelectItem value="PAS">Pasaporte</SelectItem>
                <SelectItem value="TI">Tarjeta de identidad</SelectItem>
              </Select>
            </div>

            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="document-number"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Número de documento
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                id="document-number"
                name="document-number"
                autoComplete="document-number"
                placeholder="Número de documento"
                className="mt-2"
                required
              />
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
            >
              Guardar
            </button>
          </div>
        </form>
        <span>
            {result === 'KO' && 'Please fill all the fields'}
            {result === 'OK' && 'User created successfully'}
        </span>
      </div>
    </>
  );
}