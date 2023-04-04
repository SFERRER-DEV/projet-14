import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { EmployeesContext } from '../../utils/context';
import { FieldSet } from '../../utils/style/Atoms';
import dayjs from 'dayjs';

function Employee({ handleValidate, handleInputChange }) {
  /**
   * Références vers les élément du DOM
   */
  const refFirstname = useRef();
  const refLastname = useRef();
  const refBirthDate = useRef();

  /**
   * Déclare une variable d'état pour stocker les données du formulaire employé et une fonction de mise à jour 'setFormData'
   * qui peut être utilisée pour mettre à jour la variable d'état "formData".
   * @typedef {Object} formData - Un objet à destructurer contenant l'état actuel de formData
   * @typedef {Function} setFormData - Cette fonction met à jour le State de données du formulaire
   */
  const { formData, setFormData } = useContext(EmployeesContext);

  return (
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
          onBlur={(event) =>
            handleValidate(event, refFirstname, formData, setFormData)
          }
          onInvalid={(event) =>
            handleValidate(event, refFirstname, formData, setFormData)
          }
          onInput={(event) =>
            handleValidate(event, refFirstname, formData, setFormData)
          }
          onChange={(event) => handleInputChange(event, formData, setFormData)}
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
          onBlur={(event) =>
            handleValidate(event, refLastname, formData, setFormData)
          }
          onInvalid={(event) =>
            handleValidate(event, refLastname, formData, setFormData)
          }
          onInput={(event) =>
            handleValidate(event, refLastname, formData, setFormData)
          }
          onChange={(event) => handleInputChange(event, formData, setFormData)}
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
          onBlur={(event) =>
            handleValidate(event, refBirthDate, formData, setFormData)
          }
          onInvalid={(event) =>
            handleValidate(event, refBirthDate, formData, setFormData)
          }
          onInput={(event) =>
            handleValidate(event, refBirthDate, formData, setFormData)
          }
          onChange={(event) => handleInputChange(event, formData, setFormData)}
        />
      </div>
    </FieldSet>
  );
}

Employee.propTypes = {
  handleValidate: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Employee;
