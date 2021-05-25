const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Post {
    id:ID
    title:String
    description:String
}

input postInput {
    title:String
    description:String
}

type Query {
    hello: String

    getAllPosts: [Post]

    getPost(id: ID):Post
}

type Mutation {
    createPost(post:postInput):Post
    deletePost(id: ID):String
    updatePost(id: ID, post: postInput):Post
}
`
module.exports = typeDefs;