const Post = require('./Models/postModel')

const resolvers = {
    Query: {
        hello: ()=>{
            return 'Hello world!'
        },
        getAllPosts: async () => {
            return await Post.find();
        },
        getPost: async (parent, { id }, context, info) => {
            return await Post.findById(id)
        },
    },
    Mutation:{
        createPost: async (parent, args, context, info) => {
            const { title, description } = args.post;
            const post = new Post({ title,description })
            await post.save()
            return post
        },
        deletePost: async (parent, { id }, context, info) => {
            await Post.findByIdAndDelete(id);
            return 'ok, post deleted'
        },
        updatePost: async(parent, { id, post }, context, info) => {
            return await Post.findByIdAndUpdate(id, post, { new: true})
        }
    }
}

module.exports = resolvers;