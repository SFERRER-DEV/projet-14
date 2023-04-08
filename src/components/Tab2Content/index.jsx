import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '../DataTable';

function Tab2Content({ activeTab, setActiveTab }) {
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
    { field: 'firstname', headerName: 'First Name', width: '10%' },
    { field: 'lastname', headerName: 'Last Name', width: '10%' },
    { field: 'startDate', headerName: 'Start Date', width: '10%' },
    { field: 'department', headerName: 'Department', width: '15%' },
    { field: 'birthDate', headerName: 'Date of Birth', width: '10%' },
    { field: 'street', headerName: 'Street', width: '20%' },
    { field: 'city', headerName: 'City', width: '10%' },
    { field: 'federal', headerName: 'State', width: '5%' },
    { field: 'zipcode', headerName: 'Zip Code', width: '10%' },
  ];

  return (
    <React.Fragment>
      <h2>Current Employees</h2>
      <DataTable columns={columns} />
    </React.Fragment>
  );
}

Tab2Content.defaultProps = {
  activeTab: 1,
};

Tab2Content.propTypes = {
  activeTab: PropTypes.number,
  setActiveTab: PropTypes.func.isRequired,
};

export default Tab2Content;
