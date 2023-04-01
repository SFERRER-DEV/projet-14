import { useState } from 'react';
import styled from 'styled-components';
import Tab1Content from '../Tab1Content';
import Tab2Content from '../Tab2Content';
import { EmployeesProvider } from '../../utils/context';

const TabsContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/** @type {Object} Le conteneur des boutons est une balise `<div>` */
const TabButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

/** @type {Object} Un onglet s'affiche en cliquant sur une balise `<button>` */
const TabButton = styled.button`
  min-width: 16rem;
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0.5rem;
  margin: 0 0.25rem;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: ${(props) => (props.active ? '#333' : '#f0f0f0')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  &:hover {
    background-color: #333;
    color: #fff;
  }
  border: none;
  cursor: pointer;
  // border: 3px blue dotted;
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

  return (
    <TabsContainer>
      <TabButtonsContainer>
        <TabButton active={activeTab === 1} onClick={() => handleTabClick(1)}>
          Create Employee
        </TabButton>
        <TabButton active={activeTab === 2} onClick={() => handleTabClick(2)}>
          View current Employees
        </TabButton>
      </TabButtonsContainer>
      <EmployeesProvider>
        <TabContent active={activeTab === 1}>
          {/** Contenu de l'onglet 1 */}
          <Tab1Content />
        </TabContent>
        <TabContent active={activeTab === 2}>
          {/** Contenu de l'onglet 2 */}
          <Tab2Content />
        </TabContent>
      </EmployeesProvider>
    </TabsContainer>
  );
}

export default TabContainer;
