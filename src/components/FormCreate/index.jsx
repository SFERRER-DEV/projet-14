import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DropdownList } from 'basic-dropdown-list';
import { FieldSet } from '../../utils/style/Atoms';
import checkValidity, { getFields, noBubbleMessage } from '../../utils/form';
import '../../styles/form.css';

/** @type {Object} Le formulaire est une balise `<form>` */
const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  @media (max-width: 767px) {
    font-size: 0.85rem;
  }
`;

const SaveButton = styled.button`
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem 1rem;
  margin-left: auto;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2e8b57;
  }
  cursor: pointer;
`;

/**
 *
 * @param {*} e
 */
const saveUser = (e) => {
  // Rester sur le formulaire
  e.preventDefault();
  console.log('Save');
};

function FormCreate() {
  /**
   * Références vers les élément du DOM
   */
  const inputFirstname = useRef();
  const inputLastname = useRef();
  const inputStreet = useRef();
  const inputCity = useRef();
  const inputZipCode = useRef();
  const inputStartDate = useRef();

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

  /**
   *
   */
  useEffect(() => {
    /**
     * @type {NodeList} fields
     * @description La NodeList des éléments DOM à contrôler.
     */
    const fields = getFields(document);
    // Empêcher l'affichage des infobulles de l'api HTML
    //noBubbleMessage(fields);
  }, []);

  return (
    <Form onSubmit={(e) => saveUser(e)}>
      {/* Informations */}
      <FieldSet>
        <legend>Personal</legend>
        <div className="input-wrapper formData">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            required
            className="text-control"
            minLength="2"
            ref={inputFirstname}
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
            ref={inputLastname}
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
            ref={inputStreet}
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
            ref={inputCity}
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
          <label htmlFor="Zip Code">City</label>
          <input
            type="text"
            id="zipcode"
            required
            className="text-control"
            minLength="2"
            ref={inputZipCode}
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
            ref={inputStartDate}
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
    </Form>
  );
}

export default FormCreate;
