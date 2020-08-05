import styled from "styled-components";
export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RegisterBox = styled.div`
  width: 500px;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 20px;
  }
  a {
    margin-top: 20px;
  }
`;
