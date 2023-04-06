import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/style/colors';

const HomeLogo = styled.img`
  width: 4.375em;
  height: 4.375em;
`;

const PageHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  padding: 1em 3em 0.5em 1em;
  color: ${colors.tertiary};
  & > h1 {
    margin-left: 0.5em;
  }
`;

function Header() {
  return (
    <PageHeader>
      <div>
        <HomeLogo
          src={process.env.PUBLIC_URL + '/logo192.png'}
          alt="Logo Wealth Health"
        />
      </div>
      <h1>HRnet</h1>
    </PageHeader>
  );
}

export default Header;
