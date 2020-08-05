import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  padding: 30px 0;
  /* height: calc(100% - 80px); */
  margin: 15px 3%;
  @media (max-width: 540px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 30px 3%;
  }
`;
export const HeaderFilter = styled.div`
  display: flex;
  margin: 15px 3% 20px;

`;
