import colors from './colors';
import styled from 'styled-components';

/** @type {Object} Le conteneur d'un jeu de champs de formulaire est une balise `<fieldset>` */
export const FieldSet = styled.fieldset`
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
