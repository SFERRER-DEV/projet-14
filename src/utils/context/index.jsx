import React, { createContext, useState } from 'react';

const EmployeesContext = createContext();

const EmployeesProvider = (props) => {
  const { children } = props;

  /**
   * Déclare une variable d'état 'federal' pour les états américains et une fonction de mise à jour 'setFederal'
   * qui peut être utilisée pour mettre à jour la variable d'état "federal".
   * @typedef {Array.<Object>} federal - Cette variable de State contient la liste des états fédéraux américains
   * @typedef {Function} setFederal - Cette fonction met à jour le State local
   */
  const [federal, setFederal] = useState([{}]);

  /**
   * Déclare une variable d'état 'departement' pour les départements et une fonction de mise à jour 'setDepartement'
   * qui peut être utilisée pour mettre à jour la variable d'état "department".
   * @typedef {Array.<Object>} department - Cette variable de State contient les éléments de la liste des départements
   * @typedef {Function} setDepartment - Cette fonction met à jour le State local
   */
  const [department, setDepartment] = useState([{}]);

  /**
   * Un état local avec des valeurs initiales pour stocker les données de formulaire.
   * @typedef {Object} FormData
   * @property {string} firstname - Prénom employé
   * @property {string} lastname - Nom de famille employé
   * @property {string} street - Adresse
   * @property {string} city - Ville
   * @property {string} federal - Etat fédéral
   * @property {string} zipcode - Code postal
   * @property {string} startDate - Date d'embauche
   * @property {string} department - Service
   */
  /**
   * Déclare une variable d'état pour stocker les données du formulaire employé et une fonction de mise à jour 'setFormData'
   * qui peut être utilisée pour mettre à jour la variable d'état "formData".
   * @typedef {FormData} formData - Un objet à destructurer contenant l'état actuel de formData
   * @typedef {Function} setFormData - Cette fonction met à jour le State de données du formulaire
   */
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    street: '',
    city: '',
    federal: '',
    zipcode: '',
    startDate: new Date().toISOString().split('T')[0], // Aujourd'hui
    department: '',
  });

  const contextValue = {
    federal,
    setFederal,
    department,
    setDepartment,
    formData,
    setFormData,
  };

  return (
    <EmployeesContext.Provider value={contextValue}>
      {children}
    </EmployeesContext.Provider>
  );
};

export { EmployeesContext, EmployeesProvider };
