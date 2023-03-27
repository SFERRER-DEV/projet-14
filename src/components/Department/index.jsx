import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DropdownList } from 'basic-dropdown-list';

/** @type {Object} Le conteneur est une balise `<section>` */
const Container = styled.fieldset`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 33%;
  min-height: 15rem;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  & legend {
    font-size: 1.125rem;
    padding: 0.5rem;
  }
  @media (max-width: 767px) {
    font-size: 0.85rem;
  }
`;

/** @type {Object} ... est une balise `<p>` */
const Para = styled.p`
  //
`;

/**
 * @description Affiche un composant
 * @param {Object} props
 * @param {string|number} props.maProp1- abcde
 * @param {string} props.maProp2 - fghij
 * @param {function} props.onChange - La fonction à appeler lorsqu'un changement se produit.
 * @returns {JSX.Element} Department
 */
function Department(props) {
  const { maProp1, maProp2, onChange } = props;

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

  return (
    <Container>
      <legend>Enrollment</legend>
      <DropdownList
        labelText={'Departement'}
        jsonUrl={'/data/departments.json'}
        onListChange={handleDepartmentChange}
        onChange={(e) => console.log(e.target.value)}
      />
    </Container>
  );
}

Department.propTypes = {
  /*
  maProp1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maProp2: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  */
};

Department.defaultProps = {
  /*
  maProp1: 'Hello',
  onListChange: (state) => {},
  */
};

export default Department;
