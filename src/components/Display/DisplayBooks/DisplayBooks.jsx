import styled from 'styled-components';

const Book = styled.div`
  background-color: white;
  display: flex;
  margin: 20px 0px;
  padding: 10px 20px;
`;
const Details = styled.div`
  padding: 3px 50px;
`;
const AuthorName = styled.span`
  padding: 0px 5px;
`;

const Title = styled.div`
  font-size: 25px;
`;
function DisplayBooks({ books }) {
  return (
    <>
      {books.map((book, index) => {
        const removeSpace = book.isbn?.[0];
        return (
          <Book key={index}>
            <img src={`https://covers.openlibrary.org/b/isbn/${removeSpace}-M.jpg`} alt='' />
            <Details>
              <Title>Title: {book.title}</Title>
              <div className=''>
                Author:{' '}
                {book.author_name?.map((author, index) => (
                  <AuthorName key={author + index}>{author}</AuthorName>
                ))}
              </div>
              <div className=''>Year Published:{book.first_publish_year}</div>
            </Details>
          </Book>
        );
      })}
    </>
  );
}

export default DisplayBooks;
