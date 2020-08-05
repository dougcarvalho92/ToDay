import styled from "styled-components";

export const Container = styled.div`
  background: rgba(230, 236, 245, 0.4);
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  opacity: ${(props) => (props.done !== 0 ? 0.6 : 1)};
  font-weight: 500;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content:space-between;
`;
export const ButtonGroupHeader = styled.div`

  button {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 0;
    cursor: pointer;
    + button {
      margin-left: 5px;
    }
  }
`;
export const CheckButton = styled.button`
  background-color: ${(props) => (!props.done ? "#51c25b" : "#748396")};
`;
export const EditButton = styled.button`
  background-color: ${(props) => (!props.done ? "#ffca78" : "#748396")};
`;
export const DeleteButton = styled.button`
  background-color: ${(props) => (!props.done ? "#ff4e4e" : "#748396")};
`;
