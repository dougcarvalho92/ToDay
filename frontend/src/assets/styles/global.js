import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  
  :root{
    --color-background: #ecf1f8;
    --color-primary: #7159C1;
    --color-secundary: #293e52;
    --color-success: #51C25B;
    --color-danger:#FF4E4E;
    --color-border: #ECF1F8;
  }
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root , .DefaultLayout{
    height: 100%;
  }
  body {
    font: 14px 'Roboto', sans-serif;
    background: var(--color-background);
    color: #333;
    -webkit-font-smoothing: antialiased !important;
  }
  ul {
    list-style: none;
  }
  form input {
    width: 100%;
    height: 60px;
    color: #333;
    border: 1px solid var(--color-border)
    border-radius: 8px;
    padding: 0 24px;
    margin-bottom:10px
}
.decoration-none{
  text-decoration:none !important;
  font: 14px 'Roboto', sans-serif;
    color: #333;
    -webkit-font-smoothing: antialiased !important;
}
.decoration-none:hover{
  font-weight:500
}
input,
.default-button,
textarea {
  font: 14px 'Roboto', sans-serif;
}
form .default-button {
    width: 100%;
    height: 60px;
    background: var(--color-danger);
    color: #fff;
 
    transition: filter 0.2s;
}

form .default-button:hover{
  color: var(--color-secundary);
}

.max-width{
  width:100%;
  margin-bottom:10px !important;
}
`;
