import { useState, useEffect, useCallback } from 'react';
import { Button, Input, InputContainer, Spinner, FetchMoreTitle } from './Display.style';
import DisplayBooks from './DisplayBooks/DisplayBooks';
import FadeLoader from 'react-spinners/FadeLoader';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

function Display() {
  const [searchInput, setSearchInput] = useState('');
  const [books, setBooks] = useState([]);
  const [original, setOriginal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEnable, setSearchEnable] = useState(false);

  const handleSearch = () => {
    let isnum = /^\d+$/.test(searchInput.trim());
    let numbersAndSemi = /[0-9]{1,2}-[0-9]{1,2}/.test(searchInput);
    setSearchEnable(true);
    if (numbersAndSemi) {
      const splitString = searchInput.split('-');
      const sliceArray = original.slice(splitString[0], +splitString[1] + 1);
      setBooks(sliceArray);
    } else if (isnum) {
      const filterBooks = original.filter((book, index) => index + 1 === +searchInput);
      setBooks(filterBooks);
    } else {
      const filterBooks = original.filter((book) => book.name.toLowerCase().includes(searchInput.toLowerCase()));
      setBooks(filterBooks);
    }
  };

  const fetchMoreListItems = () => {
    setTimeout(() => {
      if (books.length >= original.length) {
        setHasMore(false);
        setIsFetching(false);
      } else {
        setBooks((prevState) => {
          return [...prevState, ...original.slice(prevState.length, prevState.length + 20)];
        });
        setIsFetching(false);
      }
    }, 2000);
  };
  const [isFetching, setIsFetching, setHasMore, hasMore] = useInfiniteScroll(fetchMoreListItems, searchEnable);

  const fetchData = useCallback(async () => {
    try {
      const fetchData = await fetch(
        `https://cors-anywhere.herokuapp.com/https://rss.applemarketingtools.com/api/v2/gb/books/top-free/100/books.json`,
        {
          mode: 'cors',
          method: 'GET',
        }
      );
      const data = await fetchData.json();
      setLoading(false);
      setOriginal(data.feed.results);
      setBooks(data.feed.results.slice(0, 20));
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Spinner>
        <FadeLoader loading={loading} size={150} />
        <div className=''>Loading</div>
      </Spinner>
    );
  }
 
  return (
    <>
      <InputContainer>
        <Input
          type='text'
          placeholder='Search'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          name='searchbox'
        />
        <Button onClick={handleSearch}>Search</Button>
      </InputContainer>
      <DisplayBooks books={books} />
      {isFetching && hasMore && !searchEnable && <FetchMoreTitle> Fetching more... </FetchMoreTitle>}
    </>
  );
}

export default Display;
