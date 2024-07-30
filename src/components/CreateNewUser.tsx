import { Divider, TextInput, Select, SelectItem } from '@tremor/react';
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/styles";

export const CreateNewUser = () => {

  return (
    <>
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Registrar en el espacio de trabajo un nuevo usuario
        </h3>
        <form action="#" method="post" className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="full-name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Nombre completo
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="full-name"
                name="full-name"
                autoComplete="full-name"
                placeholder="Nombre completo"
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
                País
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
              <Select defaultValue="1" id='document-type'>
                <SelectItem value="1">C.C</SelectItem>
                <SelectItem value="2">P.S</SelectItem>
                <SelectItem value="3">T.I</SelectItem>
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
      </div>
    </>
  );
}