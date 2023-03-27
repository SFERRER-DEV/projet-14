import React, { useEffect, useRef, useState } from 'react';
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
  flex-shrink: 0;
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
 * @returns {JSX.Element} Employee
 */
function Employee(props) {
  const { maProp1, maProp2, onChange } = props;

  /**
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const inputFirstname = useRef();
  /**
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const inputLastname = useRef();

  useEffect(() => {
    // 💡
  }, []);

  return (
    <Container>
      <legend>Personal informations</legend>
      <div className="input-wrapper formData">
        <label htmlFor="firstname">Firstname</label>
        <input
          type="text"
          id="firstname"
          required
          className="text-control"
          minLength="2"
          ref={inputFirstname}
        />
      </div>
      <div className="input-wrapper formData">
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          id="lastname"
          required
          className="text-control"
          minLength="2"
          ref={inputLastname}
        />
      </div>
    </Container>
  );
}

Employee.propTypes = {
  /*
  maProp1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maProp2: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  */
};

Employee.defaultProps = {
  /*
  maProp1: 'Hello',
  onListChange: (state) => {},
  */
};

export default Employee;
