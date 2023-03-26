import React, { useState } from 'react';
import { DropdownList } from 'basic-dropdown-list';

function HomePage() {
  /**
   * Déclare une variable d'état 'federal' pour les états américains et une fonction de mise à jour 'setFederal'
   */
  const [federal, setFederal] = useState([{}]);
  const handleFederalChange = (newState) => {
    setFederal(newState);
  };

  /**
   * Déclare une variable d'état 'departement' pour les départements et une fonction de mise à jour 'setDepartement'
   */
  const [department, setDepartment] = useState([{}]);
  const handleDepartmentChange = (newState) => {
    setDepartment(newState);
  };

  return (
    <main>
      <p>HR net</p>
      <DropdownList
        labelText={'State'}
        jsonUrl={'/data/states.json'}
        namedKey="abbreviation"
        onListChange={handleFederalChange}
        onChange={(e) => console.log(e.target.value)}
      />

      <DropdownList
        labelText={'Departement'}
        jsonUrl={'/data/departments.json'}
        onListChange={handleDepartmentChange}
        onChange={(e) => console.log(e.target.value)}
      />
    </main>
  );
}

export default HomePage;
