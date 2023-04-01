import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DropdownList } from 'basic-dropdown-list';
import { FieldSet } from '../../utils/style/Atoms';
import { EmployeesContext } from '../../utils/context';
const SaveButton = styled.button`
  margin-left: auto;
`;

function Form() {
  /**
   * Déclare une variable d'état pour stocker les données du formulaire employé et une fonction de mise à jour 'setFormData'
   * qui peut être utilisée pour mettre à jour la variable d'état "formData".
   * @typedef {FormData} formData - Un objet à destructurer contenant l'état actuel de formData
   * @typedef {Function} setFormData - Cette fonction met à jour le State de données du formulaire
   */
  const { formData, setFormData } = useContext(EmployeesContext);

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
   * Déclare une variable d'état 'federal' pour la lisre des états féderaux et une fonction de mise à jour 'setFederal'
   * @typedef {Array.<Object>} federal - Cette variable de State contient la liste des états fédéraux américains
   * @typedef {Function} setFederal - Cette fonction met à jour le State local
   */
  const { federal, setFederal } = useContext(EmployeesContext);
  const handleFederalChange = (newState) => {
    setFederal(newState);
  };

  /**
   *État d'un élément sélectionné, avec une fonction pour mettre à jour l'état.
   * @typedef {string} selectedFederal - La valeur actuelle de l'élément sélectionné dans la liste.
   * @typedef {function} setSelectedFederal - Une fonction pour mettre à jour l'état fédéral choisi.
   */
  const [selectedFederal, setSelectedFederal] = useState('');
  const handleSelectedFederalChange = (newState) => {
    setSelectedFederal(newState);
    setFormData({ ...formData, federal: newState });
  };

  /**
   * Déclare une variable d'état 'departement' pour la liste des départements et une fonction de mise à jour 'setDepartement'
   * qui peut être utilisée pour mettre à jour la variable d'état "list".
   * @typedef {Array.<Object>} department - Cette variable de State contient les éléments de la liste des départements
   * @typedef {Function} setDepartment - Cette fonction met à jour le State local
   */
  const { department, setDepartment } = useContext(EmployeesContext);
  const handleDepartmentChange = (newState) => {
    setDepartment(newState);
  };
  /**
   * État de l'élément département sélectionné, avec une fonction pour mettre à jour l'état.
   * @typedef {string} selectedDepartment - La valeur actuelle de l'élément sélectionné dans la liste.
   * @typedef {function} setSelectedDepartment - Une fonction pour mettre à jour le département choisi.
   */
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const handleSelectedDepartmentChange = (newState) => {
    setSelectedDepartment(newState);
    setFormData({ ...formData, department: newState });
  };

  /**
   * Fonction qui met à jour les données du formulaire.
   * @param {Object} event - L'événement de changement de saisie du formulaire.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Initialiser les dates du calendrier 📆
  useEffect(() => {
    // 01/01/1970
    refStartDate.current.min = new Date(0).toISOString().split('T')[0];
    // Aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    refStartDate.current.value = today;
    refStartDate.current.max = today;
  }, []);

  /**
   * Fonction de gestionnaire d'événements pour la validation d'un champ de formulaire.
   * @param {Event} event - L'événement déclencheur d'une validation (onBlur, onInvalid, onInput)
   * @param {React.RefObject} ref - Référence d'un champ de formulaire.
   * @returns {void}
   */
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

  /**
   * Fonction de gestionnaire d'événements pour la soumission du formulaire.
   * @param {Event} e - L'événement de soumission du formulaire.
   * @returns {void}
   */
  const handleSubmit = (e) => {
    // Rester sur le formulaire
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      // ✅
      console.log('Save User');
    } else {
      // 👎
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
            name="firstname"
            lastname="firstname"
            required
            className="text-control"
            minLength="2"
            ref={refFirstname}
            onBlur={(event) => handleValidate(event, refFirstname)}
            onInvalid={(event) => handleValidate(event, refFirstname)}
            onInput={(event) => handleValidate(event, refFirstname)}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-wrapper formData">
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            required
            className="text-control"
            minLength="2"
            ref={refLastname}
            onBlur={(event) => handleValidate(event, refLastname)}
            onInvalid={(event) => handleValidate(event, refLastname)}
            onInput={(event) => handleValidate(event, refLastname)}
            onChange={handleInputChange}
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
            name="street"
            required
            className="text-control"
            minLength="2"
            ref={refStreet}
            onBlur={(event) => handleValidate(event, refStreet)}
            onInvalid={(event) => handleValidate(event, refStreet)}
            onInput={(event) => handleValidate(event, refStreet)}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-wrapper formData">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            className="text-control"
            minLength="2"
            ref={refCity}
            onBlur={(event) => handleValidate(event, refCity)}
            onInvalid={(event) => handleValidate(event, refCity)}
            onInput={(event) => handleValidate(event, refCity)}
            onChange={handleInputChange}
          />
        </div>
        <DropdownList
          name={'state'}
          labelText={'State'}
          jsonUrl={'/data/states.json'}
          namedKey="abbreviation"
          message="Veuillez choisir un état"
          onListChange={handleFederalChange}
          onSelectedChange={handleSelectedFederalChange}
          selectedValue={selectedFederal}
        />
        <div className="input-wrapper formData">
          <label htmlFor="zipcode">Zip Code</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            required
            className="text-control"
            minLength="2"
            ref={refZipCode}
            onBlur={(event) => handleValidate(event, refZipCode)}
            onInvalid={(event) => handleValidate(event, refZipCode)}
            onInput={(event) => handleValidate(event, refZipCode)}
            onChange={handleInputChange}
          />
        </div>
      </FieldSet>
      {/* Service et embauche de l'employé */}
      <FieldSet>
        <legend>Enrollment</legend>
        <div className="input-wrapper formData">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            required
            className="text-control"
            minLength="2"
            ref={refStartDate}
            onBlur={(event) => handleValidate(event, refStartDate)}
            onInvalid={(event) => handleValidate(event, refStartDate)}
            onInput={(event) => handleValidate(event, refStartDate)}
            onChange={handleInputChange}
          />
        </div>
        <DropdownList
          name={'department'}
          labelText={'Department'}
          jsonUrl={'/data/departments.json'}
          message={'Veuillez choisr un département'}
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
