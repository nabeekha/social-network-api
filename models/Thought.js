const { Schema, model, Types } = require('mongoose');
//utilizing moment for time stamp formatting 
const moment = require('moment')

//reaction schema
const reactionSchema = new Schema (
  {
     reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
     },
     reactionText: {
      type: String,
      required: true,
      maxlength: 280
     },
     username: {
      type: String,
      required: true,
     },
     createTime: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format("hh:mm [at] MMM DD, YYYY"),
     },
  },
  {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
}
)

//schema for thoughts
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createTime: {
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