import React, { useContext, useRef, useState } from 'react';
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

function Enrollment({
  handleValidate,
  handleInputChange,
  handleSelectedDepartmentChange,
  selectedDepartment,
  setSelectedDepartment,
}) {
  /**
   * Références vers les élément du DOM
   */
  const refStartDate = useRef();

  /**
   * Déclare une variable d'état pour stocker les données du formulaire employé et une fonction de mise à jour 'setFormData'
   * qui peut être utilisée pour mettre à jour la variable d'état "formData".
   * @typedef {Object} formData - Un objet à destructurer contenant l'état actuel de formData
   * @typedef {Function} setFormData - Cette fonction met à jour le State de données du formulaire
   */
  const { formData, setFormData } = useContext(EmployeesContext);

  const [selectedDate, setSelectedDate] = useState(formData.user.startDate);
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

  const handleDateChange = (date) => {
    console.log('📆 handleDateChange');
    setSelectedDate(dayjs(date).format('DD/MM/YYYY'));
    let newValue = '';
    if (date !== null) {
      newValue = dayjs(date).format('DD/MM/YYYY');
    }
    setFormData({
      ...formData,
      user: { ...formData.user, startDate: newValue },
    });
  };

  return (
    <FieldSet>
      <legend>Enrollment</legend>
      <Wrapper>
        <label htmlFor="startDate">Start Date</label>
        <Calendar
          id="startDate"
          name="startDate"
          value={selectedDate}
          minDate={new Date('01/01/1970')}
          maxDate={new Date()}
          format="dd/MM/yyyy"
          locale="fr"
          onChange={(date) => handleDateChange(date)}
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

Enrollment.propTypes = {
  handleValidate: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectedDepartmentChange: PropTypes.func.isRequired,
  selectedDepartment: PropTypes.string.isRequired,
  setSelectedDepartment: PropTypes.func.isRequired,
};

export default Enrollment;
