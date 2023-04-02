import React, { useContext, useEffect, useState } from 'react';
import { EmployeesContext } from '../../utils/context';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';

// Création des données pour la datatable
const rows = [
  {
    firstname: 'John',
    lastname: 'Doe',
    startDate: '01/01/2001',
    department: '1',
    birthDate: '01/01/1984',
    street: '123 Main St',
    city: 'Anytown',
    federal: 'AK',
    zipcode: '99999',
  },
];

// Style pour la zone de recherche/filtrage
const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1em;
`;

const Datatable = () => {
  const [filter, setFilter] = useState('');

  /**
   * Déclare une variable d'état 'users' pour la liste des utilisateurs et une fonction de mise à jour 'setUsers'
   * @typedef {Array.<Object>} users - Cette variable de State contient la liste des utilisateurs
   * @typedef {Function} setUsers - Cette fonction met à jour le State local
   */
  const { users, setUsers } = useContext(EmployeesContext);

  /**
   * Déclare une variable d'état 'departement' pour la liste des départements et une fonction de mise à jour 'setDepartement'
   * qui peut être utilisée pour mettre à jour la variable d'état "list".
   * @typedef {Array.<Object>} department - Cette variable de State contient les éléments de la liste des départements
   * @typedef {Function} setDepartment - Cette fonction met à jour le State local
   */
  const { department, setDepartment } = useContext(EmployeesContext);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filtrage des données
  const filteredRows = users.filter((user) => {
    return (
      user.firstname.toLowerCase().includes(filter.toLowerCase()) ||
      user.lastname.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div>
      <FilterContainer>
        <TextField
          label="Filtrer"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
        />
      </FilterContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Zip Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={1000 + index}>
                <TableCell>{row.firstname}</TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>
                  {department.find((dep) => dep.id === row.department)?.name ||
                    ''}
                </TableCell>
                <TableCell>{row.birthDate}</TableCell>
                <TableCell>{row.street}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.federal}</TableCell>
                <TableCell>{row.zipcode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Datatable;
