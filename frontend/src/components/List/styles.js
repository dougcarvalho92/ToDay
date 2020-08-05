import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  padding: 15px;
  height: 100%;
  flex: 0 0 320px;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  & + div {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    background: var(--color-border);
    padding: 10px; 
    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
      color: var(--color-secundary);
    }
  }

  @media (max-width: 540px) {
    margin-bottom: 50px;
  }
`;
export const ButtonHeader = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: #3b5bfd;
  border: 0;
  cursor: pointer;
`;
export const TaskList = styled.ul`
  margin-top: 30px;
  overflow: scroll;
  max-height: 500px;
  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;
export const Category = styled.span`
  top: -20px;
  border-radius: 2px;
  padding: 3px;
  display: inline-block;
  background: ${(props) => (!props.done ? "#7159C1" : "#748396")}; 
  position: absolute;
  min-width: 100px;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
`;
export const ButtonGroupHeader = styled.div`
  button {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 0;
    cursor: pointer;
    + button {
      margin-left: 5px;
    }
  }
`;
export const AddButton = styled.button`
  background-color: ${(props) => (!props.done ? "#7159C1" : "#748396")};
`;
export const CheckButton = styled.button`
  background-color: ${(props) => (!props.done ? "#51c25b" : "#748396")};
`;
export const EditButton = styled.button`
  background-color: ${(props) => (!props.done ? "#ffca78" : "#748396")};
`;
export const DeleteButton = styled.button`
  background-color: ${(props) => (!props.done ? "#ff4e4e" : "#748396")};
  position:absolute;
  top: -25px;
    right: 2px;
}
`;
