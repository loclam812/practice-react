import React, { useState } from 'react'

import Button from '../common/Button'

import './create-popup.scss'

const form: {
  [key: string]: string
} = {}

export default function CreatePopup (props: {
  handleSubmit: any, handleClose: any
}) {
  const { handleSubmit, handleClose } = props
  const [dataForm, setDataForm] = useState(form)
  const isDisabledSubmit = Object.keys(dataForm).every(key => !dataForm[key])

  function handleSubmitForm (e: any) {
    e.preventDefault()
    handleSubmit(dataForm)
    handleClose()
  }

  function handleChangeInput (e: any, name: string) {
    setDataForm({
      ...dataForm,
      [name]: e.target.value
    })
  }


  return (
    <div className="component-create-popup">
      <div className="component-create-popup__overlay" onClick={handleClose} />
      <div className="component-create-popup__content">
        <form
          className="component-create-popup__form"
          onSubmit={(e:any) => handleSubmitForm(e)}
        >
          <div className="component-create-popup__form-info">
            <label className="component-create-popup__form-info-group">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                onChange={(e: any) => handleChangeInput(e, 'name')}
              />
            </label>
            <label className="component-create-popup__form-info-group">
              Email:
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={(e: any) => handleChangeInput(e, 'email')}
              />
            </label>
            <label className="component-create-popup__form-info-group">
              Position:
              <input
                type="text"
                name="position"
                placeholder="Enter Position"
                onChange={(e: any) => handleChangeInput(e, 'position')}
              />
            </label>
          </div>
          <div className="component-create-popup__form-actions">
            <Button
              type="submit"
              handleClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              classModifier="--blue"
              isDisabled={isDisabledSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
