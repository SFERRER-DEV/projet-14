import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { DropdownList } from 'basic-dropdown-list';
import { EmployeesContext } from '../../utils/context';
import { FieldSet } from '../../utils/style/Atoms';

function Address({
  handleValidate,
  handleInputChange,
  handleSelectedFederalChange,
  selectedFederal,
  setSelectedFederal,
}) {
  /**
   * Références vers les élément du DOM
   */
  const refStreet = useRef();
  const refCity = useRef();
  const refZipCode = useRef();

  /**
   * Déclare une variable d'état pour stocker les données du formulaire employé et une fonction de mise à jour 'setFormData'
   * qui peut être utilisée pour mettre à jour la variable d'état "formData".
   * @typedef {Object} formData - Un objet à destructurer contenant l'état actuel de formData
   * @typedef {Function} setFormData - Cette fonction met à jour le State de données du formulaire
   */
  const { formData, setFormData } = useContext(EmployeesContext);

  /**
   * Déclare une variable d'état 'federal' pour la liste de tous les états féderaux et une fonction de mise à jour 'setFederal'
   * @typedef {Array.<Object>} federal - Cette variable de State contient la liste des états fédéraux.
   * @typedef {Function} setFederal - Cette fonction met à jour le State local
   */
  const { federal, setFederal } = useContext(EmployeesContext);
  const handleFederalChange = (newState) => {
    setFederal(newState);
  };

  return (
    <FieldSet>
      <legend>Address</legend>
      <div className=" formData">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          required
          className="text-control"
          minLength="2"
          ref={refStreet}
          onBlur={(event) =>
            handleValidate(event, refStreet, formData, setFormData)
          }
          onInvalid={(event) =>
            handleValidate(event, refStreet, formData, setFormData)
          }
          onInput={(event) =>
            handleValidate(event, refStreet, formData, setFormData)
          }
          onChange={(event) => handleInputChange(event, formData, setFormData)}
        />
      </div>
      <div className=" formData">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          required
          className="text-control"
          minLength="2"
          ref={refCity}
          onBlur={(event) =>
            handleValidate(event, refCity, formData, setFormData)
          }
          onInvalid={(event) =>
            handleValidate(event, refCity, formData, setFormData)
          }
          onInput={(event) =>
            handleValidate(event, refCity, formData, setFormData)
          }
          onChange={(event) => handleInputChange(event, formData, setFormData)}
        />
      </div>
      <DropdownList
        name={'state'}
        labelText={'State'}
        jsonUrl={'/data/states.json'}
        namedKey="abbreviation"
        message="Veuillez choisir un état"
        onListChange={handleFederalChange}
        onSelectedChange={(event) =>
          handleSelectedFederalChange(
            event,
            setSelectedFederal,
            formData,
            setFormData
          )
        }
        selectedValue={selectedFederal}
      />
      <div className=" formData">
        <label htmlFor="zipcode">Zip Code</label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          required
          className="text-control"
          minLength="2"
          ref={refZipCode}
          onBlur={(event) =>
            handleValidate(event, refZipCode, formData, setFormData)
          }
          onInvalid={(event) =>
            handleValidate(event, refZipCode, formData, setFormData)
          }
          onInput={(event) =>
            handleValidate(event, refZipCode, formData, setFormData)
          }
          onChange={(event) => handleInputChange(event, formData, setFormData)}
        />
      </div>
    </FieldSet>
  );
}

Address.propTypes = {
  handleValidate: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectedFederalChange: PropTypes.func.isRequired,
  selectedFederal: PropTypes.string.isRequired,
  setSelectedFederal: PropTypes.func.isRequired,
};

export default Address;
