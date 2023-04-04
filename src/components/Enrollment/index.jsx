import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { DropdownList } from 'basic-dropdown-list';
import { EmployeesContext } from '../../utils/context';
import { FieldSet } from '../../utils/style/Atoms';
import dayjs from 'dayjs';

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

  return (
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
          onBlur={(event) =>
            handleValidate(event, refStartDate, formData, setFormData)
          }
          onInvalid={(event) =>
            handleValidate(event, refStartDate, formData, setFormData)
          }
          onInput={(event) =>
            handleValidate(event, refStartDate, formData, setFormData)
          }
          onChange={(event) => handleInputChange(event, formData, setFormData)}
        />
      </div>
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
