import { createGlobalStyle } from 'styled-components';

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
      border: 3px blue dotted;
    }

    main section {
      border: 1px red dotted;
    }
`;

function GlobalStyle() {
  return <StyledGlobalStyle />;
}

export default GlobalStyle;
