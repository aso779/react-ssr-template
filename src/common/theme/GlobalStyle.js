import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
}

*,
*::before,
*::after{
    box-sizing: inherit;
}`;

export default GlobalStyle;
