import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DropdownList } from 'basic-dropdown-list';
import dayjs from 'dayjs';
import { EmployeesContext } from '../../utils/context';
import { FieldSet } from '../../utils/style/Atoms';
import styled from 'styled-components';

const SaveButton = styled.button`
  margin-left: auto;
`;

function FormCreate({ open, setOpen }) {
  /**
   * Références vers les élément du DOM
   */
  const refForm = useRef();
  const refFirstname = useRef();
  const refLastname = useRef();
  const refBirthDate = useRef();
  const refStreet = useRef();
  const refCity = useRef();
  const refZipCode = useRef();
  const refStartDate = useRef();

  /**
   * Déclare une variable d'état pour stocker les données du formulaire employé et une fonction de mise à jour 'setFormData'
   * qui peut être utilisée pour mettre à jour la variable d'état "formData".
   * @typedef {FormData} formData - Un objet à destructurer contenant l'état actuel de formData
   * @typedef {Function} setFormData - Cette fonction met à jour le State de données du formulaire
   */
  const { formData, setFormData } = useContext(EmployeesContext);

  /**
   * Déclare une variable d'état 'users' pour la liste des utilisateurs et une fonction de mise à jour 'setUsers'
   * @typedef {Array.<Object>} users - Cette variable de State contient la liste des utilisateurs
   * @typedef {Function} setUsers - Cette fonction met à jour le State local
   */
  const { users, setUsers } = useContext(EmployeesContext);

  /**
   * Déclare une variable d'état 'federal' pour la liste de tous les états féderaux et une fonction de mise à jour 'setFederal'
   * @typedef {Array.<Object>} federal - Cette variable de State contient la liste des états fédéraux.
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
    setFormData({
      ...formData,
      user: { ...formData.user, federal: newState },
    });
  };

  /**
   * Déclare une variable d'état 'departement' pour la liste de tous les départements et une fonction de mise à jour 'setDepartement'
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
    const newInt = parseInt(newState);
    if (isNaN(newInt)) {
      // 😑 Gérer l'erreur en utilisant une valeur par défaut
      setFormData({
        ...formData,
        user: { ...formData.user, department: 0 },
      });
    } else {
      // Il faut mémoriser dans le json un entier et non pas une chaine de caractères pour réussir la jointure avec le libellé dans la datatable
      setFormData({
        ...formData,
        user: { ...formData.user, department: newInt },
      });
    }
  };

  /**
   * Fonction qui met à jour les données du formulaire.
   * @param {Object} event - L'événement de changement de saisie du formulaire.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, user: { ...formData.user, [name]: value } });
  };

  /**
   * Fonction de gestionnaire d'événements pour la validation d'un champ de formulaire.
   * @param {Event} event - L'événement déclencheur d'une validation (onBlur, onInvalid, onInput)
   * @param {React.RefObject} ref - Référence d'un champ de formulaire.
   * @returns {void}
   */
  const handleValidate = (event, ref) => {
    console.log(event.type);
    event.preventDefault();

    const { name, value } = event.target;
    // div contenant le champ du formulaire et possède la classe css .formData
    const wrapper = ref.current.parentNode;
    if (
      wrapper === null ||
      wrapper === undefined ||
      !wrapper.classList.contains('formData')
    ) {
      return;
    }

    if (ref.current.validity.valid) {
      wrapper.setAttribute('data-error-visible', 'false');
      wrapper.setAttribute('data-error', '');
      //
      setFormData({ ...formData, user: { ...formData.user, [name]: value } });
    } else {
      wrapper.setAttribute('data-error-visible', 'true');
      wrapper.setAttribute('data-error', ref.current.validationMessage);
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
      // ✅ Ajouter le nouvel utilisateur à la collection des utilisateurs
      setUsers([...users, formData.user]);
      // Ouvrir la modale;
      setOpen(true);
      // 🧹 Réinitialisation du formulaire
      refForm.current.reset();
      // 🧽 Remise à blanc des listes du composant Dropdown
      setSelectedFederal('');
      setSelectedDepartment('');
      // 👍
      console.log('Save User');
    } else {
      // 👎
    }
  };

  return (
    <React.Fragment>
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
          <div className="input-wrapper formData">
            <label htmlFor="birthDate">Date of Birth</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              required
              min="1931-01-01"
              max={dayjs(new Date()).format('YYYY-MM-DD')}
              ref={refBirthDate}
              onBlur={(event) => handleValidate(event, refBirthDate)}
              onInvalid={(event) => handleValidate(event, refBirthDate)}
              onInput={(event) => handleValidate(event, refBirthDate)}
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
              min="1970-01-01"
              value={dayjs(formData.user.startDate).format('YYYY-MM-DD')}
              max={dayjs(new Date()).format('YYYY-MM-DD')}
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
    </React.Fragment>
  );
}

FormCreate.defaultProps = {
  open: false,
};

FormCreate.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
};

export default FormCreate;
