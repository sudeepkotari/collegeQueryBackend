const Post = require('./Models/postModel');
const User = require('./Models/User.model');

const resolvers = {
    Query: {

        getUsers: async () => {
            return await User.find();
        },

        getAllPosts: async () => {
            return await Post.find( {}, { answers: { $slice: -1 } })
            .sort({updatedAt: -1})
            .populate('user','name')
            .populate('answers.user')
        },

        getPost: async (parent, { id }, context, info) => {
            return await Post.findById(id)
        },

        getQuestions: async () => {
            return await Post.find( {}, { question:1 })
            .populate('user','name');
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
        createPost: async (parent, args, context, info) => {
            const { user, question, answers } = args.post;

            const post = new Post({ user, question, answers })
            return await post.save()
        },

        deletePost: async (parent, { id }, context, info) => {
            await Post.findByIdAndDelete(id);
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