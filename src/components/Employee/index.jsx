import React, {
  useContext,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { EmployeesContext } from '../../utils/context';
import { FieldSet } from '../../utils/style/Atoms';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

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
  setSelectedBirthDate
) => {
  let newValue = '';
  setSelectedBirthDate(date);
  if (date !== null) {
    newValue = dayjs(date).format('DD/MM/YYYY');
  }
  setFormData({
    ...formData,
    user: { ...formData.user, birthDate: newValue },
  });
};

const Employee = forwardRef((props, ref) => {
  const {
    handleValidate,
    handleInputChange,
    selectedBirthDate,
    setSelectedBirthDate,
  } = props;

  /**
   * Déclare une variable d'état pour stocker les données du formulaire employé et une fonction de mise à jour 'setFormData'
   * qui peut être utilisée pour mettre à jour la variable d'état "formData".
   * @typedef {Object} formData - Un objet à destructurer contenant l'état actuel de formData
   * @typedef {Function} setFormData - Cette fonction met à jour le State de données du formulaire
   */
  const { formData, setFormData } = useContext(EmployeesContext);

  /**
   * Références vers les élément du DOM
   */
  const refFirstname = useRef();
  const refLastname = useRef();
  const refDatePicker = useRef();

  // Cette fonction expose la méthode Click() qui ouvre le calendrier pour obliger la saisie d'une date de naissance
  useImperativeHandle(ref, () => ({
    onClick: () => {
      refDatePicker.current
        .querySelector('#birthDate')
        .querySelector('.react-date-picker__calendar-button')
        .click();
    },
  }));

  return (
    <FieldSet>
      <legend>Employee</legend>
      <div className="formData">
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
      <div className="formData">
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          lastname="lastname"
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
      <div className="formData" ref={refDatePicker}>
        <label htmlFor="birthDate">Date of Birth</label>
        <DatePicker
          id="birthDate"
          name="birthDate"
          dayPlaceholder="jj"
          monthPlaceholder="mm"
          yearPlaceholder="aaaa"
          value={selectedBirthDate}
          minDate={new Date('01/01/1901')}
          maxDate={new Date()}
          format="dd/MM/yyyy"
          locale="fr"
          onChange={(date) =>
            handleDateChange(date, formData, setFormData, setSelectedBirthDate)
          }
        />
      </div>
    </FieldSet>
  );
});

Employee.propTypes = {
  handleValidate: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  selectedBirthDate: PropTypes.instanceOf(Date),
  setSelectedBirthDate: PropTypes.func.isRequired,
};

export default Employee;
