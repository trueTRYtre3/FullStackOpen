require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to MongoDB '))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

const typeDefs = gql`
  type Author {
      name: String
      bookCount: Int
      id: ID
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
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
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
      allAuthors: () => Author.find({}) 
    },
    Author: {
        bookCount: (root) => {
          const books = Book.find( { author: { $in: root.name } } )
          return books.length
          // const author = books.filter(book => book.author === root.name)
          // return author.length
        }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const book = new Book({ ...args })
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }

        try {
          await book.save()

        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

      },
        // addBook: (root, args) => {
        //     const id  = uuidv4()
        //     const book = { ...args, id }
        //     books = books.concat(book)
        //     authors = authors.some(author => author.name === args.author) 
        //         ? authors 
        //         : authors.concat({
        //             name: args.author, 
        //             born: null,
        //             id 
        //         })
        //     return book
        // },
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