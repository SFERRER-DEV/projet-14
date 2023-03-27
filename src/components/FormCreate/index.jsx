import React, { useState } from 'react';
import Department from '../Department';
import Employee from '../Employee';
import Address from '../Address';
import styled from 'styled-components';
import '../../styles/form.css';

/** @type {Object} Le formulaire est une balise `<form>` */
const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  @media (max-width: 767px) {
    font-size: 0.85rem;
  }
`;

const SaveButton = styled.button`
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem 1rem;
  margin-left: auto;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2e8b57;
  }
  cursor: pointer;
`;

const saveUser = (e) => {
  // Rester sur le formulaire
  e.preventDefault();
  console.log('Save');
};

function FormCreate() {
  return (
    <Form onSubmit={(e) => saveUser(e)}>
      <Employee />
      <Address />
      <Department />

      <SaveButton type="submit">Save</SaveButton>
    </Form>
  );
}

export default FormCreate;
