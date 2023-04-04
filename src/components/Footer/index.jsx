import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/style/colors';

const PageFooter = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border: 1px red dotted;
  border-top: 3px solid ${colors.tertiary};
  color: ${colors.backgroundColor};
  background-color: ${colors.secondary};
  padding-top: 1em;
  padding-bottom: 1em;
  & > h4 {
    font-size: 1.75em;
    font-weight: 600;
    text-indent: 2em;
  }
`;

function Footer() {
  return (
    <PageFooter>
      <h4>{new Date().getFullYear()} - Wealth Health</h4>
    </PageFooter>
  );
}

export default Footer;
