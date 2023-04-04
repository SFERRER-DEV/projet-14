import { createGlobalStyle } from 'styled-components';
import colors from './colors.js';

const StyledGlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
    }

    #root {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1 0 auto;
      display:flex;
      flex-direction: column;
      @media (max-width:767px) {
        font-size: 0.85rem;
      }
    }

    header, footer {
      flex: 0 0 auto;
    }

    article {
      padding-left: 2em;
      padding-right: 2em;
    }

    article > h2 {
      text-indent: 2em;
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
      font-size: 1em;
      font-weight: 500;
      color:  ${colors.textColor};
      background-color: ${colors.backgroundColor};
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
