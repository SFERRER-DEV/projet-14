import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DropdownList } from 'basic-dropdown-list';
import { EmployeesContext } from '../../utils/context';
import { FieldSet } from '../../utils/style/Atoms';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  padding: 0.25em 0.5em;
  & .react-calendar {
    width: 100%;
  }
`;

/**
 * Gère le changement de date sélectionnée et met à jour le formulaire et la date sélectionnée.
 * @param {Date|null} date - La date sélectionnée, peut être nulle.
 * @param {object} formData - L'état courant du formulaire.
 * @param {function} setFormData - La fonction de mise à jour de l'état du formulaire.
 * @param {function} setSelectedBirthDate - La fonction de mise à jour de la date sélectionnée.
 * @returns {void}
 */
const handleDateChange = (
  date,
  formData,
  setFormData,
  setSelectedStartDate
) => {
  let newValue = '';
  if (date !== null) {
    newValue = dayjs(date).format('DD/MM/YYYY');
  }
  setSelectedStartDate(newValue);
  setFormData({
    ...formData,
    user: { ...formData.user, startDate: newValue },
  });
};

/**
 * @name publicHolidays
 * @description Tableau contenant des objets Date représentant les jours fériés français.
 * @type {Array<dayjs>}
 */
const publicHolidays = [
  dayjs('01/01/1901'), // Jour de l'an
  dayjs('05/01/1901'), // Fête du travail
  dayjs('05/08/1901'), // Victoire 1945
  dayjs('07/14/1901'), // Fête nationale
  dayjs('08/15/1901'), // Assomption
  dayjs('11/01/1901'), // Toussaint
  dayjs('11/11/1901'), // Armistice 1918
  dayjs('12/25/1901'), // Noël
];

/**
 * Fonction qui désactive les jours fériés annuels dans les tuiles en vue mensuelle uniquement
 *
 * @param {Object} date - Date à vérifier.
 * @param {String} view - Vue à vérifier.
 * @returns {Boolean} - Retourne true si la date est désactivée, false sinon.
 */
function tileDisabled({ date, view }) {
  // Ajouter une classe aux tuiles en vue mensuelle uniquement
  if (view === 'month' && (date.getDay() === 0 || date.getDay() === 6)) {
    // Vérifiez si une date que React-Calendar souhaite vérifier se situe dans l'une des plages
    return true;
  }
  // Désactive les jours fériés annuels
  if (
    view === 'month' &&
    publicHolidays.some(
      (holiday) =>
        dayjs(date).format('DD/MM') === dayjs(holiday).format('DD/MM')
    )
  ) {
    return true;
  }
}

function Enrollment({
  handleSelectedDepartmentChange,
  selectedDepartment,
  setSelectedDepartment,
  selectedStartDate,
  setSelectedStartDate,
}) {
  /**
   * Référence vers les élément du DOM
   */
  const refDateStart = useRef();
  /**
   * Déclare une variable d'état pour stocker les données du formulaire employé et une fonction de mise à jour 'setFormData'
   * qui peut être utilisée pour mettre à jour la variable d'état "formData".
   * @typedef {Object} formData - Un objet à destructurer contenant l'état actuel de formData
   * @typedef {Function} setFormData - Cette fonction met à jour le State de données du formulaire
   */
  const { formData, setFormData } = useContext(EmployeesContext);

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

  useEffect(() => {
    // sélectionner automatiquement la page qui contient aujourd'hui
    if (selectedStartDate === null) {
      refDateStart.current.setActiveStartDate(dayjs().toDate());
    }
  }, [selectedStartDate]);

  return (
    <FieldSet>
      <legend>Enrollment</legend>
      <Wrapper>
        <label htmlFor="startDate">
          Start Date : <span>{selectedStartDate}</span>
        </label>
        <Calendar
          id="startDate"
          name="startDate"
          value={selectedStartDate}
          minDate={new Date('01/01/1970')}
          maxDate={new Date()}
          format="dd/MM/yyyy"
          locale="fr"
          onChange={(date) =>
            handleDateChange(date, formData, setFormData, setSelectedStartDate)
          }
          ref={refDateStart}
          tileDisabled={tileDisabled}
        />
      </Wrapper>
      <DropdownList
        name={'department'}
        labelText={'Department'}
        jsonUrl={'/data/departments.json'}
        message={'Veuillez choisr un département'}
        onListChange={handleDepartmentChange}
        onSelectedChange={(event) =>
          handleSelectedDepartmentChange(
            event,
            setSelectedDepartment,
            formData,
            setFormData
          )
        }
        selectedValue={selectedDepartment}
      />
    </FieldSet>
  );
}

Enrollment.defaultProps = {
  selectedStartDate: null,
};

Enrollment.propTypes = {
  handleSelectedDepartmentChange: PropTypes.func.isRequired,
  selectedDepartment: PropTypes.string.isRequired,
  setSelectedDepartment: PropTypes.func.isRequired,
  selectedStartDate: PropTypes.string,
  setSelectedStartDate: PropTypes.func.isRequired,
};

export default Enrollment;
