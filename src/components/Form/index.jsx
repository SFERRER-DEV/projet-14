import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { EmployeesContext } from '../../utils/context';
import Employee from '../../components/Employee';
import Enrollment from '../../components/Enrollment';
import Address from '../../components/Address';
import dayjs from 'dayjs';
import styled from 'styled-components';
import colors from '../../utils/style/colors';

const Container = styled.div`
  min-height: 25em;
  height: 100%;
  width: 100%;
  @media (max-width: 767px) {
    height: 100%;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const SaveButton = styled.button`
  font-size: 1.25em;
  font-weight: bold;
  text-decoration: none;
  color: #${colors.backgroundColor};
  background-color: ${colors.primary};
  border: none;
  border-radius: 0.25em;
  padding: 0.75em 1.5em;
  margin: 0.5em 1em;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${colors.secondary};
  }
  cursor: pointer;
  margin-left: auto;
`;

/**
 * Fonction de gestionnaire d'événements pour la validation d'un champ de formulaire.
 * @param {Event} event - L'événement déclencheur d'une validation (onBlur, onInvalid, onInput)
 * @param {React.RefObject} ref - Référence d'un champ de formulaire.
 * @param {Object} formData - Un objet à destructurer contenant l'état actuel de formData
 * @param {Function} setFormData - Cette fonction met à jour le State de données du formulaire
 * @returns {void}
 */
const handleValidate = (event, ref, formData, setFormData) => {
  console.log(event.type);
  event.preventDefault();

  const { name, value } = event.target;
  // div contenant le champ du formulaire et possède la classe css .formData
  const wrapper = ref?.current?.parentNode;
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
 * Fonction qui met à jour les données du formulaire.
 * @param {Object} event - L'événement de changement de saisie du formulaire.
 * @param {Object} formData - Un objet à destructurer contenant l'état actuel de formData
 * @param {Function} setFormData - Cette fonction met à jour le State de données du formulaire
 */
const handleInputChange = (event, formData, setFormData) => {
  const { name, value } = event.target;
  setFormData({ ...formData, user: { ...formData.user, [name]: value } });
};

/**
 * Fonction qui met à jour les données du formulaire pour la liste déroulante des états fédéraux
 * @param {string} newState - Valeur de la clé d'un élément de la liste  (CA, NY, ...)
 * @param {*} setSelectedFederal - Une fonction pour mettre à jour l'état fédéral choisi
 * @param {Object} formData - Un objet à destructurer contenant l'état actuel de formData
 * @param {Function} setFormData - Cette fonction met à jour le State de données du formulaire
 */
const handleSelectedFederalChange = (
  newState,
  setSelectedFederal,
  formData,
  setFormData
) => {
  setSelectedFederal(newState);
  setFormData({
    ...formData,
    user: { ...formData.user, federal: newState },
  });
};

/**
 * Fonction qui met à jour les données du formulaire pour la liste déroulante des départements
 * @param {string} newState - Valeur de la clé d'un élément de la liste  (1, 2, 3 ...)
 * @param {Function} setSelectedDepartment - Une fonction pour mettre à jour le département choisi.
 * @param {Object} formData - Un objet à destructurer contenant l'état actuel de formData
 * @param {Function} setFormData - Cette fonction met à jour le State de données du formulaire
 */
const handleSelectedDepartmentChange = (
  newState,
  setSelectedDepartment,
  formData,
  setFormData
) => {
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

function FormCreate({ open, setOpen }) {
  /**
   * Références vers les élément du DOM
   */
  const refForm = useRef();
  const refChild = useRef();

  /**
   * Déclare une variable d'état pour stocker les données du formulaire employé et une fonction de mise à jour 'setFormData'
   * qui peut être utilisée pour mettre à jour la variable d'état "formData".
   * @typedef {Object} formData - Un objet à destructurer contenant l'état actuel de formData
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
   *État d'un élément sélectionné, avec une fonction pour mettre à jour l'état.
   * @typedef {string} selectedFederal - La valeur actuelle de l'élément sélectionné dans la liste.
   * @typedef {function} setSelectedFederal - Une fonction pour mettre à jour l'état fédéral choisi.
   */
  const [selectedFederal, setSelectedFederal] = useState('');

  /**
   * État de l'élément département sélectionné, avec une fonction pour mettre à jour l'état.
   * @typedef {string} selectedDepartment - La valeur actuelle de l'élément sélectionné dans la liste.
   * @typedef {function} setSelectedDepartment - Une fonction pour mettre à jour le département choisi.
   */
  const [selectedDepartment, setSelectedDepartment] = useState('');

  /**
   *
   */
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);

  /**
   *
   */
  const [selectedStartDate, setSelectedStartDate] = useState(
    dayjs().format('DD/MM/YYYY')
  );

  /**
   * Fonction de gestionnaire d'événements pour la soumission du formulaire.
   * @param {Event} e - L'événement de soumission du formulaire.
   * @returns {void}
   */
  const handleSubmit = (e, refChild) => {
    // Rester sur le formulaire
    e.preventDefault();
    if (refForm.current.checkValidity() && dayjs(selectedBirthDate).isValid()) {
      // ✅ Ajouter le nouvel utilisateur à la collection des utilisateurs
      setUsers([...users, formData.user]);
      // Ouvrir la modale;
      setOpen(true);
      // 🧹 Réinitialisation du formulaire
      refForm.current.reset();
      // 🧽 Remise à blanc des listes Dropdown et du DatePicker
      setSelectedFederal('');
      setSelectedDepartment('');
      setSelectedBirthDate(null);
      setSelectedStartDate(null);
      console.log('Save User 👍');
    } else {
      console.log('👎');
      const isValidDate = dayjs(selectedBirthDate).isValid();
      if (!isValidDate) {
        // 👮‍♂️ Ouvrir le calendrier pour obliger la saisie de la date
        refChild.current.onClick();
      }
    }
  };

  return (
    <form ref={refForm} onSubmit={(e) => handleSubmit(e, refChild)}>
      <Container>
        {/* Employé */}
        <Employee
          handleValidate={handleValidate}
          handleInputChange={handleInputChange}
          selectedBirthDate={selectedBirthDate}
          setSelectedBirthDate={setSelectedBirthDate}
          ref={refChild}
        />
        {/* Adresse */}
        <Address
          handleValidate={handleValidate}
          handleInputChange={handleInputChange}
          handleSelectedFederalChange={handleSelectedFederalChange}
          selectedFederal={selectedFederal}
          setSelectedFederal={setSelectedFederal}
        />
        {/* Embauche */}
        <Enrollment
          handleSelectedDepartmentChange={handleSelectedDepartmentChange}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          selectedStartDate={selectedStartDate}
          setSelectedStartDate={setSelectedStartDate}
        />
      </Container>
      <SaveButton type="submit">Save</SaveButton>
    </form>
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
