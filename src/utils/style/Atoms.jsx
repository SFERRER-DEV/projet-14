import styled from 'styled-components';
import colors from './colors.js';

/**
 * Des composants de base - atomiques - réutilisables
 */

/** @type {Object} Le conteneur d'un jeu de champs de formulaire est une balise `<fieldset>` */
export const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  width: 33%;
  height: auto;
  min-height: 100%;
  font-size: 1em;
  font-weight: 500;
  color: ${colors.textColor};
  background-color: ${colors.backgroundColor};
  & legend {
    font-size: 1em;
    padding: 0.5em;
  }
  @media (max-width: 767px) {
    height: fit-content;
    min-height: 12em;
    width: 100%;
  }
`;
