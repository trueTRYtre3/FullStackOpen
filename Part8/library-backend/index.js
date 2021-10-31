require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.connect(process.env.MONGODB_URI)
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
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
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({})
      }

      const books = await Book.find( { genres: { $in: args.genre } } )
      return books
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({
          name: args.author
        })
      } 
      author.bookCount+=1
      try {
        await author.save()
      } catch(error) {
        throw new UserInputError("Can't save Author")
      }

      const book = new Book({ 
        ...args,  
        author
      })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError("Can't save book")
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated') 
      }
      const authorExist = await Author.findOne({ name: args.name })
      if (!authorExist) {
        return null
      }
      let newAuthor = null
      try {
        newAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.born },
          { new : true }
        )
      } catch (error) {
        throw new UserInputError("Unable to edit author")
      }
      return newAuthor
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      return user.save()
          .catch(error => {
            throw new UserInputError('Unable to create User')
          })

    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password  !== 'secret') {
        throw new UserInputError('invalid credentials')
      }

      const userToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userToken, process.env.SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})