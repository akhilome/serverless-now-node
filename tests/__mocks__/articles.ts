const articles: {
  title: string;
  author: string;
  body: string;
}[] = [
  {
    title: 'First Post',
    author: 'Tester',
    body: "This is the article's body"
  },
  {
    title: 'Second Post',
    author: 'Tester',
    body: "This is the article's body"
  },
  {
    title: 'Third Post',
    author: 'Tester',
    body: "This is the article's body"
  }
];

export default articles;

export const mockNewArticleBody = {
  title: 'Article from Test',
  author: 'Awesome Tester',
  body:
    'This is an article which originated from the test environment right into the test database. I mean, how cool is that?'
};
