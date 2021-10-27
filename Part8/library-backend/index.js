const { ApolloServer, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const book = require('./models/book')
const author = require('./models/author')

let { authors, books } = require('./data/fake_data')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('connected to MongoDB '))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

const typeDefs = gql`
  type Author {
      name: String!
      bookCount: Int
      id: ID!
      born: Int
  }

  type Book {
      title: String!
      author: Author!
      published: Int!
      genres: [String]
      id: ID!
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
          genres: [String]
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
            const book = { ...args, id }
            books = books.concat(book)
            authors = authors.some(author => author.name === args.author) 
                ? authors 
                : authors.concat({
                    name: args.author, 
                    born: null,
                    id 
                })
            return book
        },
        editAuthor: (root, args) => {
            let indexFound = authors.findIndex(author => author.name === args.name)
            if (indexFound === -1) return null

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