import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
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
  TableSortLabel,
  TablePagination,
} from '@mui/material';
import dayjs from 'dayjs';

// Style pour la zone de recherche/filtrage
const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1em;
`;

const Datatable = ({ columns }) => {
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

  /**
   * Utilisé pour stocker et mettre à jour le texte de filtre entré par l'utilisateur.
   * @typedef {string} filterText - Cette variable de State contient la filtre saisi par l'utilisateur
   * @typedef {Function} setFilterText - Cette fonction met à jour le State local
   */
  const [filterText, setFilterText] = useState('');

  /**
   * Définit l'état de tri des données dans un tableau et permet de le mettre à jour.
   * @typedef {string} sortConfig - Le nom de la colonne selon laquelle trier les données et la direction de tri ('asc' pour croissant ou 'desc' pour décroissant)..
   * @typedef {Function} setSortConfig - Cette fonction met à jour le State local
   */
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  /**
   * Déclare un état local "page" pour le numéro de la page courante.
   * @typedef {number} page - La page par défaut est la zéro
   * @typedef {Function} setPage - Cette fonction met à jour le State local
   */
  const [page, setPage] = useState(0);

  /**
   * État de la quantité de lignes à afficher par page dans une grille de données.
   * @typedef {number} rowsPerPage - Quantité de lignes
   * @typedef {Function} setRowsPerPage - Cette fonction met à jour le State local
   */
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    setPage(0);
  };

  /**
   * Met à jour le texte de filtre et réinitialise la page courante à 0.
   * @param {Object} event - L'événement de changement de la valeur de l'élément de filtre.
   * @returns {void}
   */
  const handleSort = (key) => {
    let direction = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  /**
   * Trie les données du tableau des utilisateurs en fonction de la configuration de tri actuelle et renvoie un nouveau tableau trié avec la configuration de tri actuelle qui contient une clé de tri et une direction de tri ('asc' ou 'desc').
   * @returns {Array} Un nouveau tableau trié en fonction de la configuration de tri actuelle.
   */
  const sortedData = users.sort((a, b) => {
    if (sortConfig !== null) {
      const key = sortConfig.key;
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  /**
   * Filtre les données triées en fonction du texte de filtre entré par l'utilisateur
   * @returns {Array<Object>} Les données triées filtrées
   */
  const filteredData = sortedData.filter((row) =>
    Object.keys(row).some((key) =>
      row[key].toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  /**
   * Gère le changement de page de la pagination.
   * @param {object} event - L'événement déclencheur.
   * @param {number} newPage - Le numéro de la nouvelle page.
   * @returns {void}
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Gère le changement du nombre de lignes affichées par page dans le tableau.
   * @param {object} event - L'événement de changement de la valeur de sélection.
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <FilterContainer>
        <TextField
          variant="outlined"
          label="Filter"
          value={filterText}
          onChange={handleFilterChange}
        />
      </FilterContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  <TableSortLabel
                    active={sortConfig && sortConfig.key === column.field}
                    direction={
                      sortConfig && sortConfig.key === column.field
                        ? sortConfig.direction
                        : 'asc'
                    }
                    onClick={() => handleSort(column.field)}
                  >
                    {column.headerName}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={1000 + index}>
                  {columns.map((column) =>
                    column.field === 'department' ? (
                      <TableCell key={column.field}>
                        {
                          /** Jointure libellé */ department.find(
                            (dep) => dep.id === row.department
                          )?.name || ''
                        }
                      </TableCell>
                    ) : column.field === 'startDate' ||
                      column.field === 'birthDate' ? (
                      <TableCell key={column.field}>
                        {dayjs(row[column.field]).format('DD-MM-YYYY')}
                      </TableCell>
                    ) : (
                      <TableCell key={column.field}>
                        {row[column.field]}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

Datatable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Datatable;
