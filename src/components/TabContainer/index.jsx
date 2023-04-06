import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Tab1Content from '../Tab1Content';
import Tab2Content from '../Tab2Content';
import { EmployeesContext } from '../../utils/context';
import colors from '../../utils/style/colors';

/** @type {Object} Le conteneur des boutons est une balise `<div>` */
const TabButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  border-bottom: 3px solid ${colors.tertiary};
`;

/** @type {Object} Un onglet s'affiche en cliquant sur une balise `<button>` */
const TabButton = styled.button`
  width: 16em;
  font-size: 1.25em;
  font-weight: 600;
  padding: 0.5em;
  margin: 0 0.25em;
  border-radius: 0.5em 0.5em 0 0;
  background-color: ${(props) =>
    props.active ? colors.tertiary : colors.secondary};
  color: ${(props) =>
    props.active ? colors.backgroundColor : colors.tertiary};
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  &:hover {
    background-color: ${colors.tertiary};
    color: ${colors.backgroundColor};
  }
  border: none;
  cursor: pointer;
`;

const TabContent = styled.article`
  display: ${(props) => (props.active ? 'block' : 'none')};
  width: 100%;
`;

function TabContainer() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  /**
   * Déclare une variable d'état 'users' pour la liste des utilisateurs et une fonction de mise à jour 'setUsers'
   * @typedef {Array.<Object>} users - Cette variable de State contient la liste des utilisateurs
   * @typedef {Function} setUsers - Cette fonction met à jour le State local
   */
  const { users, setUsers } = useContext(EmployeesContext);
  useEffect(() => {
    const storedData = localStorage.getItem('hrnetfs_users');
    if (storedData) {
      setUsers(JSON.parse(storedData));
      console.log('⏯');
    }
  }, [setUsers]);

  return (
    <main>
      <TabButtonsContainer>
        <TabButton active={activeTab === 1} onClick={() => handleTabClick(1)}>
          Create Employee
        </TabButton>
        <TabButton active={activeTab === 2} onClick={() => handleTabClick(2)}>
          View current Employees
        </TabButton>
      </TabButtonsContainer>
      <TabContent active={activeTab === 1}>
        {/** Contenu de l'onglet 1 */}
        <Tab1Content activeTab={activeTab} setActiveTab={setActiveTab} />
      </TabContent>
      <TabContent active={activeTab === 2}>
        {/** Contenu de l'onglet 2 */}
        <Tab2Content activeTab={activeTab} setActiveTab={setActiveTab} />
      </TabContent>
    </main>
  );
}

export default TabContainer;
