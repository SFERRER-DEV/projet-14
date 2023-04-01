import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DropdownList } from 'basic-dropdown-list';
import { FieldSet } from '../../utils/style/Atoms';
import '../../styles/index.css';

const SaveButton = styled.button`
  margin-left: auto;
`;

function Form() {
  /**
   * Références vers les élément du DOM
   */
  const refForm = useRef();
  const refFirstname = useRef();
  const refLastname = useRef();
  const refStreet = useRef();
  const refCity = useRef();
  const refZipCode = useRef();
  const refStartDate = useRef();

  /**
   * Déclare une variable d'état 'federal' pour les états américains et une fonction de mise à jour 'setFederal'
   * @typedef {Array.<Object>} federal - Cette variable de State contient la liste des états fédéraux américains
   * @typedef {Function} setFederal - Cette fonction met à jour le State local
   */
  const [federal, setFederal] = useState([{}]);
  const handleFederalChange = (newState) => {
    setFederal(newState);
  };

  /**
   *
   */
  const [selectedFederal, setSelectedFederal] = useState('');
  const handleSelectedFederalChange = (newState) => {
    setSelectedFederal(newState);
  };

  /**
   * Déclare une variable d'état 'departement' pour les départements et une fonction de mise à jour 'setDepartement'
   * qui peut être utilisée pour mettre à jour la variable d'état "list".
   * @typedef {Array.<Object>} department - Cette variable de State contient les éléments de la liste des départements
   * @typedef {Function} setDepartment - Cette fonction met à jour le State local
   */
  const [department, setDepartment] = useState([{}]);
  const handleDepartmentChange = (newState) => {
    setDepartment(newState);
  };

  /**
   *
   */
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const handleSelectedDepartmentChange = (newState) => {
    setSelectedDepartment(newState);
  };

  const handleValidate = (event, ref) => {
    console.log(event.type);
    event.preventDefault();

    const formData = ref.current.parentNode;
    if (
      formData === null ||
      formData === undefined ||
      !formData.classList.contains('formData')
    ) {
      return;
    }

    if (ref.current.validity.valid) {
      formData.setAttribute('data-error-visible', 'false');
      formData.setAttribute('data-error', '');
    } else {
      formData.setAttribute('data-error-visible', 'true');
      formData.setAttribute('data-error', ref.current.validationMessage);
    }
  };

  const handleSubmit = (e) => {
    // Rester sur le formulaire
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      // ✅
      console.log('Save User');
    } else {
      // 👎
      // refFirstname.current.parentNode.setAttribute('data-error-visible', true);
      // refLastname.current.parentNode.setAttribute('data-error-visible', true);
      // refStreet.current.parentNode.setAttribute('data-error-visible', true);
      // refCity.current.parentNode.setAttribute('data-error-visible', true);
      // refZipCode.current.parentNode.setAttribute('data-error-visible', true);
      // refStartDate.current.parentNode.setAttribute('data-error-visible', true);
    }
  };

  return (
    <form ref={refForm} onSubmit={(e) => handleSubmit(e)}>
      {/* Civilité */}
      <FieldSet>
        <legend>Employee</legend>
        <div className="input-wrapper formData">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            required
            className="text-control"
            minLength="2"
            ref={refFirstname}
            onBlur={(event) => handleValidate(event, refFirstname)}
            onInvalid={(event) => handleValidate(event, refFirstname)}
            onInput={(event) => handleValidate(event, refFirstname)}
          />
        </div>
        <div className="input-wrapper formData">
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            id="lastname"
            required
            className="text-control"
            minLength="2"
            ref={refLastname}
            onBlur={(event) => handleValidate(event, refLastname)}
            onInvalid={(event) => handleValidate(event, refLastname)}
            onInput={(event) => handleValidate(event, refLastname)}
          />
        </div>
      </FieldSet>
      {/* Adresse */}
      <FieldSet>
        <legend>Address</legend>
        <div className="input-wrapper formData">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            required
            className="text-control"
            minLength="2"
            ref={refStreet}
            onBlur={(event) => handleValidate(event, refStreet)}
            onInvalid={(event) => handleValidate(event, refStreet)}
            onInput={(event) => handleValidate(event, refStreet)}
          />
        </div>
        <div className="input-wrapper formData">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            required
            className="text-control"
            minLength="2"
            ref={refCity}
            onBlur={(event) => handleValidate(event, refCity)}
            onInvalid={(event) => handleValidate(event, refCity)}
            onInput={(event) => handleValidate(event, refCity)}
          />
        </div>
        <DropdownList
          labelText={'State'}
          jsonUrl={'/data/states.json'}
          namedKey="abbreviation"
          message="Please select a state"
          onListChange={handleFederalChange}
          onSelectedChange={handleSelectedFederalChange}
          selectedValue={selectedFederal}
        />
        <div className="input-wrapper formData">
          <label htmlFor="zipcode">Zip Code</label>
          <input
            type="text"
            id="zipcode"
            required
            className="text-control"
            minLength="2"
            ref={refZipCode}
            onBlur={(event) => handleValidate(event, refZipCode)}
            onInvalid={(event) => handleValidate(event, refZipCode)}
            onInput={(event) => handleValidate(event, refZipCode)}
          />
        </div>
      </FieldSet>
      {/* Département de l'employé */}
      <FieldSet>
        <legend>Enrollment</legend>
        <div className="input-wrapper formData">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="text"
            id="startDate"
            required
            className="text-control"
            minLength="2"
            ref={refStartDate}
            onBlur={(event) => handleValidate(event, refStartDate)}
            onInvalid={(event) => handleValidate(event, refStartDate)}
            onInput={(event) => handleValidate(event, refStartDate)}
          />
        </div>
        <DropdownList
          labelText={'Department'}
          jsonUrl={'/data/departments.json'}
          message={'You must choose your department'}
          onListChange={handleDepartmentChange}
          onSelectedChange={handleSelectedDepartmentChange}
          selectedValue={selectedDepartment}
        />
      </FieldSet>
      <SaveButton type="submit">Save</SaveButton>
    </form>
  );
}

export default Form;
