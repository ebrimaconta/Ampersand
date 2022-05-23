import styled from 'styled-components';

export const Book = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  width: 90%;
  min-width: 300px;
  @media (min-width: 600px) {
    margin: 20px 20px;
  }
  @media (min-width: 800px) {
    width: 40%;
  }
`;
export const Details = styled.div`
  padding: 3px 50px;
`;
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px 20px;
`;

export const Title = styled.div`
  font-size: 25px;
`;
export const Number = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  margin-bottom: 10px;
  padding: 10px;
`;
export const DetailsContainer = styled.div`
  display: flex;
  padding: 20px;
`;
