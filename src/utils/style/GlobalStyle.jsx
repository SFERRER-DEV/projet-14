import { createGlobalStyle } from 'styled-components';
import colors from './colors.js';

const StyledGlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
      font-size: 16px;
      font-family: 'Montserrat', sans-serif;
    }

    main {
      display:flex;
      @media (max-width:767px) {
        font-size: 0.85rem;
      }
    }

    button {
      font-size: 1.25em;
      font-weight: bold;
      text-decoration: none;
      color: #${colors.backgroundColor};
      background-color: ${colors.primary};
      border: none;
      border-radius: 0.25em;
      padding: 0.75em 1.5em;
      margin: 0.5em 1em;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: ${colors.secondary};
      }
      cursor: pointer;
    }

    form {
      width: 100%;
      height: 22em;
      min-height:fit-content;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      font-size: 1rem;
      font-weight: 500;
      color: #000;
      background-color: #fff;
    }

    .formData {
      margin: 0.25em 0.5em;
    }

    .formData[data-error]::after {
      display: block;
      font-size: 0.85em;
      text-align: left;
      line-height: 1em;
      color: ${colors.errorColor};
      content: attr(data-error);
    }

    .formData[data-error-visible='true'] .text-control {
      border: 2px solid ${colors.errorColor};
    }

`;

function GlobalStyle() {
  return <StyledGlobalStyle />;
}

export default GlobalStyle;
