const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    id:ID
    name:String
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

input postInput {
    user:ID
    question:String
    answers:[answersInput]
}


type Query {
    getAllPosts: [Post]
    getPost(id: ID):Post
    getUsers:[User]
    getQuestions:[Question]
    getSearchResult:[Post]
}

type Mutation {
    createPost(post:postInput):Post
    deletePost(id: ID):String
    updatePost(id: ID, post: postInput):Post
    postAnswer(id:ID, answer:answersInput):Post
}
`
module.exports = typeDefs;