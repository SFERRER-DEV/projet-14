import styled from 'styled-components';
import colors from './colors.js';

/**
 * Des composants de base - atomiques - réutilisables
 */

/**
 * Le conteneur d'un jeu de champs de formulaire est une balise `<fieldset>`
 *  @type {Object}
 *
 */
export const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-basis: 30%;
  max-width: 50%;
  flex-grow: 1;
  margin: 0 0.5em;
  font-size: 1em;
  font-weight: 500;
  color: ${colors.textColor};
  background-color: ${colors.backgroundColor};
  & legend {
    font-size: 1em;
    padding: 0.5em;
  }
  height: 100%;
  min-height: 28em;
  @media (max-width: 767px) {
    height: fit-content;
    max-width: 100%;
  }
`;
