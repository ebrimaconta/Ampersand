import { Book, Details, Container, Title, Number, DetailsContainer } from './DisplayBooks.style';

function DisplayBooks({ books }) {
  return (
    <Container>
      {books.map((book, index) => {
        return (
          <Book key={index}>
            <Number>{index + 1}</Number>
            <DetailsContainer>
              <img src={book.artworkUrl100} alt='' />
              <Details>
                <Title>
                  Title:
                  {book.name}
                </Title>
                <div className=''>Author: {book.artistName}</div>
                <div className=''>Year Published: {book.releaseDate.split('-')[0]}</div>
              </Details>
            </DetailsContainer>
          </Book>
        );
      })}
    </Container>
  );
}

export default DisplayBooks;
