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
 * @returns {JSX.Element} Address
 */
function Address(props) {
  const { maProp1, maProp2, onChange } = props;

  /**
   * Déclare une variable d'état 'federal' pour les états américains et une fonction de mise à jour 'setFederal'
   * @typedef {Array.<Object>} federal - Cette variable de State contient la liste des états fédéraux américains
   * @typedef {Function} setFederal - Cette fonction met à jour le State local
   */
  const [federal, setFederal] = useState([{}]);
  const handleFederalChange = (newState) => {
    setFederal(newState);
  };

  useEffect(() => {
    // 💡
  }, []);

  return (
    <Container>
      <legend>Address</legend>
      <DropdownList
        labelText={'State'}
        jsonUrl={'/data/states.json'}
        namedKey="abbreviation"
        onListChange={handleFederalChange}
        onChange={(e) => console.log(e.target.value)}
      />
    </Container>
  );
}

Address.propTypes = {
  /*
  maProp1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maProp2: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  */
};

Address.defaultProps = {
  /*
  maProp1: 'Hello',
  onListChange: (state) => {},
  */
};

export default Address;
