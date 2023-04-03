import React from 'react';
import DataTable from '../DataTable';

function Tab2Content() {
  /**
   * Liste des colonnes pour la DataTable
   * @typedef {Object} Column
   * @property {string} field - Nom du champ associé à la colonne
   * @property {string} headerName - Titre de la colonne
   */
  /**
   *Les colonnes à afficher dans la table
   * @type {Column[]}
   */
  const columns = [
    { field: 'firstname', headerName: 'First Name' },
    { field: 'lastname', headerName: 'Last Name' },
    { field: 'startDate', headerName: 'Start Date' },
    { field: 'department', headerName: 'Department' },
    { field: 'birthDate', headerName: 'Date of Birth' },
    { field: 'street', headerName: 'Street' },
    { field: 'city', headerName: 'City' },
    { field: 'federal', headerName: 'State' },
    { field: 'zipcode', headerName: 'Zip Code' },
  ];

  return (
    <React.Fragment>
      <h2>Current Employees</h2>
       <DataTable columns={columns} /> 
    </React.Fragment>
  );
}

export default Tab2Content;
