const {Schema, model} = require ('mongoose');
const reactionSchema = require('./Reaction.js');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema (
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now, 
            get: creeatedAt => dateFormat (creeatedAt)
        },
        username:{
                type: String,
                required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
);

thoughtSchema.virutal ('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;