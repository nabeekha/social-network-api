const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        //not sure if this is the proper length
        validate: thoughtText.length >= 1 && thoughtText.length <= 280,
    },
    createdAt: {
        type: Date, 
        //need to add additional criteria here 
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        // not sure if this is the correct reference 
        ref: 'reactionSchema',
    }],
    }, 
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

const User = model('User', userSchema)

module.exports = User;