const { ApolloServer, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


const typeDefs = gql`
    type Author {
        name: String!
        bookCount: Int
        id: ID!
        born: Int
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String]!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            born: Int
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            born: Int!
        ): Author
    }
`

const resolvers = {
  Query: {
      bookCount: () => books.length,
      authorCount: () => authors.length,
      allBooks: (root, args) => {
          if (!args.author && !args.genre) {
              return books
          }
          let filteredBooks = books

          //   filter for author books
          filteredBooks = args.author ? filteredBooks.filter(book => book.author === args.author) : filteredBooks

          // filter for genres
          filteredBooks = args.genre ? filteredBooks.filter(book => book.genres.includes(args.genre)) : filteredBooks

          return filteredBooks
      },
      allAuthors: () => authors,
    },
    Author: {
        bookCount: (root) => {
            const author = books.filter(book => book.author === root.name)
            return author.length
        }
    },
    Mutation: {
        addBook: (root, args) => {
            const id  = uuidv4()
            const book = {
                title: args.title,
                published: args.published,
                author: args.author,
                genres: args.genres,
                id 
            }
            books = books.concat(book)
            authors = authors.some(author => author.name === args.author) 
                ? authors 
                : authors.concat({
                    name: args.author, 
                    born: args.born,
                    id 
                })
            return book
        },
        editAuthor: (root, args) => {
            let indexFound = authors.findIndex(author => author.name === args.name)
            if (indexFound === -1) {
                return null
            }

            const editedAuthor = {
                name: args.name,
                born: args.born
            }
            authors[indexFound] = editedAuthor
            return editedAuthor
            
        }
    }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})