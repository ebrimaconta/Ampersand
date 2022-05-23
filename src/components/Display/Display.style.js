import styled from 'styled-components';

export const Button = styled.button`
  background: papayawhip;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  width: 10%;
  height: 50px;
  margin-top: 4px;
  min-width: 100px;
`;
export const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;
export const Spinner = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0px;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px;
`;

export const FetchMoreTitle = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  margin: 10px 0px;
`;
