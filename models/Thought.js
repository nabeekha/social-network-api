const { Schema, model, Types } = require('mongoose');
//utilizing moment for time stamp formatting 
const moment = require('moment')

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("hh:mm [at] MMM DD, YYYY"),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
    }, 
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

const User = model('Thought', thoughtSchema)
module.exports = Thought;