import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { EmployeesContext } from '../../utils/context';
import { styled } from '@mui/material/styles';
import colors from '../../utils/style/colors';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
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
const FilterContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1em;
`;

// L'entête de la table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.primary,
    color: colors.tertiary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

// Le style des lignes
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

/**
 * Tri un tableau d'utilisateurs en fonction de la configuration de tri donnée.
 *
 * @param {Array} users - Tableau d'objets représentant les utilisateurs.
 * @param {Object|null} sortConfig - Objet de configuration de tri avec les clés "key" (la propriété selon laquelle trier) et "direction" (la direction de tri : 'asc' pour croissant et 'desc' pour décroissant).
 * @returns {void} -  Les objets du tableau en entrée sont triés sur place
 */
const sortData = (users, sortConfig) => {
  users.sort((a, b) => {
    if (sortConfig !== null) {
      const key = sortConfig.key;
      switch (key) {
        case 'startDate':
        case 'birthDate':
          const dateA = dayjs(a[key], 'DD/MM/YYYY');
          const dateB = dayjs(b[key], 'DD/MM/YYYY');
          if (dateA.isBefore(dateB)) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (dateA.isAfter(dateB)) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          break;
        default:
          if (a[key] < b[key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (a[key] > b[key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          break;
      }
    }
    return 0;
  });
};

/**
 * Filtre un tableau d'objets en fonction d'un texte de recherche.
 *
 * @param {Array} users - Le tableau d'objets à filtrer.
 * @param {string} filterText - Le texte de recherche.
 * @returns {Array} - Un nouveau tableau d'objets contenant uniquement les éléments qui correspondent au filtre.
 */
const filterData = (users, filterText) => {
  return users.filter((row) =>
    // Parmis toutes les propriétés de l'objet
    Object.keys(row).some((key) =>
      // est-ce qu'au moins une correspond au filtre ?
      row[key].toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );
};

/**
 * Met à jour le texte de filtre et réinitialise la page courante à 0.
 *
 * @param {string} key - Propriété de l'objet à utiliser pour trier
 * @typedef {string} sortConfig - Le nom de la colonne selon laquelle trier les données et la direction de tri ('asc' pour croissant ou 'desc' pour décroissant)..
 * @typedef {Function} setSortConfig - Cette fonction met à jour le State local
 * @returns {void}
 */
const handleSort = (key, sortConfig, setSortConfig) => {
  let direction = 'asc';
  if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  }
  setSortConfig({ key, direction });
};

/**
 * Cette fonction permet de mettre à jour le texte du filtre et la page courante.
 *
 * @param {Object} event - L'événement qui a déclenché cette fonction.
 * @param {Function} setFilterText - La fonction qui met à jour le texte du filtre.
 * @param {Function} setPage - La fonction qui met à jour la page courante.
 */
const handleFilterChange = (event, setFilterText, setPage) => {
  setFilterText(event.target.value);
  setPage(0);
};

/**
 * Gère le changement de page de la pagination.
 *
 * @param {object} event - L'événement déclencheur.
 * @param {number} newPage - Le numéro de la nouvelle page.
 * @param {Function} setPage - La fonction qui met à jour la page courante.
 * @returns {void}
 */
const handleChangePage = (event, newPage, setPage) => {
  setPage(newPage);
};

/**
 * Gère le changement du nombre de lignes affichées par page dans le tableau.
 *
 * @param {object} event - L'événement de changement de la valeur de sélection.
 * @param {Function} setRowsPerPage - Fonction pour modifier le nombre de lignes par page.
 * @param {Function} setPage - Fonction pour modifier la page courante.
 */
const handleChangeRowsPerPage = (event, setRowsPerPage, setPage) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const Datatable = ({ columns }) => {
  /**
   * Déclare une variable d'état 'users' pour la liste des utilisateurs et une fonction de mise à jour 'setUsers'
   *
   * @typedef {Array.<Object>} users - Cette variable de State contient la liste des utilisateurs
   * @typedef {Function} setUsers - Cette fonction met à jour le State local
   */
  const { users, setUsers } = useContext(EmployeesContext);

  /**
   * Déclare une variable d'état 'filteredData' pour la liste des utilisateurs filtrés et une fonction de mise à jour 'setFilteredData'
   *
   * @typedef  {Array.<Object>} filteredData - Tableau qui contient les données filtrées
   * @typedef {Function} setFilteredData - Fonction qui permet de modifier le tableau filteredData
   */
  const [filteredData, setFilteredData] = useState([]);

  /**
   * Déclare une variable d'état 'departement' pour la liste des départements et une fonction de mise à jour 'setDepartement'
   * qui peut être utilisée pour mettre à jour la variable d'état "list".
   *
   * @typedef {Array.<Object>} department - Cette variable de State contient les éléments de la liste des départements
   * @typedef {Function} setDepartment - Cette fonction met à jour le State local
   */
  const { department, setDepartment } = useContext(EmployeesContext);

  /**
   * Utilisé pour stocker et mettre à jour le texte de filtre entré par l'utilisateur.
   *
   * @typedef {string} filterText - Cette variable de State contient la filtre saisi par l'utilisateur
   * @typedef {Function} setFilterText - Cette fonction met à jour le State local
   */
  const [filterText, setFilterText] = useState('');

  /**
   * Définit l'état de tri des données dans un tableau et permet de le mettre à jour.
   *
   * @typedef {string} sortConfig - Le nom de la colonne selon laquelle trier les données et la direction de tri ('asc' pour croissant ou 'desc' pour décroissant)..
   * @typedef {Function} setSortConfig - Cette fonction met à jour le State local
   */
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  /**
   * Déclare un état local "page" pour le numéro de la page courante.
   *
   * @typedef {number} page - La page par défaut est la zéro
   * @typedef {Function} setPage - Cette fonction met à jour le State local
   */
  const [page, setPage] = useState(0);

  /**
   * État de la quantité de lignes à afficher par page dans une grille de données.
   *
   * @typedef {number} rowsPerPage - Quantité de lignes
   * @typedef {Function} setRowsPerPage - Cette fonction met à jour le State local
   */
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (users.length > 0) {
      if (sortConfig.key !== null) {
        sortData(users, sortConfig);
      }
      const filteredUsers = filterData(users, filterText);
      setFilteredData(filteredUsers);
    }
  }, [sortConfig, filterText, users]);

  return (
    <div>
      <FilterContainer>
        <TextField
          variant="outlined"
          label="Filter"
          value={filterText}
          onChange={(event) =>
            handleFilterChange(event, setFilterText, setPage)
          }
        />
      </FilterContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.field} width={column.width}>
                  <TableSortLabel
                    active={sortConfig && sortConfig.key === column.field}
                    direction={
                      sortConfig && sortConfig.key === column.field
                        ? sortConfig.direction
                        : 'asc'
                    }
                    onClick={() =>
                      handleSort(column.field, sortConfig, setSortConfig)
                    }
                  >
                    {column.headerName}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={1000 + index}>
                  {columns.map((column) => {
                    switch (column.field) {
                      case 'department':
                        return (
                          <TableCell key={column.field}>
                            {department.find((dep) => dep.id === row.department)
                              ?.name || ''}
                          </TableCell>
                        );
                      default:
                        return (
                          <TableCell key={column.field}>
                            {row[column.field]}
                          </TableCell>
                        );
                    }
                  })}
                </StyledTableRow>
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
        onPageChange={(event, newPage) =>
          handleChangePage(event, newPage, setPage)
        }
        onRowsPerPageChange={(event) =>
          handleChangeRowsPerPage(event, setRowsPerPage, setPage)
        }
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
