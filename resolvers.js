const Post = require('./Models/postModel');
const User = require('./Models/User.model');

const resolvers = {
    Query: {

        getUsers: async () => {
            return await User.find();
        },

        getUser: async (parent, { id }, context, info) => {
            return await User.findById(id);
        },

        getAllPosts: async (parent, { page, size }, context, info) => {
            if(!page){
                page = 1;
            }
            if(!size){
                size = 20;
            }
            const limit = parseInt(size);
            const skip = (page - 1) * size;

            return await Post.find( {}, { answers: { $slice: -1 } }, { limit: limit,skip: skip } )
            .sort({updatedAt: -1})
            .populate('user')
            .populate('answers.user')
        },

        getPost: async (parent, { id }, context, info) => {
            return await Post.findById(id)
            .populate('user')
            .populate('answers.user')
        },

        getQuestions: async ( parent, { page, size }, context, info ) => {
            if(!page){
                page = 1;
            }
            if(!size){
                size = 20;
            }
            
            const limit = parseInt(size);
            const skip = (page - 1) * size;

            return await Post.find( {}, { question:1 }, { limit: limit,skip: skip })
            .populate('user');
        },

        getPostsByUser: async ( parent, { id }, context, info ) => {
             return await Post.find( { user : { $in: id }})
             .populate('user')
             .populate('answers.user');
        },

        getSearchResult: async (parent, { question }, context, info) => {
            const searchResult = await Post.aggregate([
                {
                    "$search": {
                        "autocomplete": {
                            "query": `${question}`,
                            "path": "question",
                            "fuzzy": {
                                "maxEdits": 1
                            }
                        }
                    }
                },
                {
                    $limit: 10
                }
            ])
            return searchResult;
        }
    },
    Mutation:{

        updateUser: async(parent, { id, user }, context, info) => {
            return await User.findByIdAndUpdate(id, user, { new: true })
        },
        createPost: async (parent, args, context, info) => {
            const { user, question, answers } = args.post;

            const post = new Post({ user, question, answers })
            return await post.save()
        },

        deletePost: async (parent, { id }, context, info) => {
            await Post.findByIdAndDelete(id)
            return 'ok, post deleted'
        },

        updatePost: async(parent, { id, post }, context, info) => {
            return await Post.findByIdAndUpdate(id, post, { new: true})
        },

        postAnswer:async (parent, {id, answer }, context, info) => {
            return await Post.findByIdAndUpdate( id, { $push: { answers: answer } }, {new: true})
            .populate('user','name')
        }
    }
}

module.exports = resolvers;