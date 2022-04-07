import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import DisplayBooks from './DisplayBooks/DisplayBooks';
import FadeLoader from 'react-spinners/FadeLoader';

const Button = styled.button`
  background: papayawhip;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
`;
const Input = styled.input`
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
const Spinner = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0px;
`;
function Display() {
  const [searchInput, setSearchInput] = useState('the lord of the rings');
  const [bookInfo, setBookInfo] = useState([]);
  const [loading, setLoading] = useState();

  const hasWhiteSpace = (s) => /\s/g.test(s);
  const fetchData = useCallback(async (search) => {
    try {
      const replaceString = hasWhiteSpace(search) ? search.replace(/\s/g, '+') : search;
      const fetchData = await fetch(`http://openlibrary.org/search.json?q=${replaceString}`);
      const response = await fetchData.json();
      setBookInfo(response.docs.slice(0, 10));
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    fetchData(searchInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookInfo]);
  if (loading) {
    return (
      <Spinner>
        <FadeLoader loading={loading} size={150} />
      </Spinner>
    );
  }
  return (
    <>
      <Input type='text' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} name='searchbox' />
      <Button
        onClick={() => {
          setLoading(true);
          fetchData(searchInput);
        }}
      >
        OK
      </Button>
      <DisplayBooks books={bookInfo} />
    </>
  );
}

export default Display;
