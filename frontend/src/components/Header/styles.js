import styled from "styled-components";

export const Container = styled.div`
  height: 80px;
  padding: 0 30px;
  background: #7159c1;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonGroup = styled.div`
  height: 80px;
  padding: 0 30px;
  background: #7159c1;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: 42px;
    height: 42px;
    border-radius: 42px;
    background: #fff;
    border: 0;
    cursor: pointer;

    + button {
      margin-left: 10px;
    }
  }
`;
