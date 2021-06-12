const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    id:ID
    name:String
    about:String
    profileUrl:String
}

type Answers {
    user:User
    answer:String
}

input answersInput {
    user:ID
    answer:String
}

type Post {
    id:ID
    user:User
    question:String
    answers: [Answers]
}
type Question {
    user:User
    question:String
}

type searchResult {
    _id:ID
    question: String
}

input postInput {
    user:ID
    question:String
    answers:[answersInput]
}

input userInput {
    about: String
    name:String
    profileUrl: String
}


type Query {
    getAllPosts(page: Int, size: Int): [Post]
    getPost(id: ID): Post
    getUsers: [User]
    getUser(id: ID):User
    getQuestions(page: Int, size: Int): [Question]
    getSearchResult(question: String): [searchResult]
    getPostsByUser(id: ID): [Post]
}

type Mutation {
    updateUser(id: ID, user: userInput): User
    createPost(post:postInput):Post
    deletePost(id: ID):String
    updatePost(id: ID, post: postInput):Post
    postAnswer(id:ID, answer:answersInput):Post
}
`
module.exports = typeDefs;