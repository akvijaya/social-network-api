const {Schema, model} = require ('mongoose');

const userSchema = new Schema (
    {
        username:{
            type:String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true, 
            unique:true,
            match: [/.+@.+\..+/, 'Please enter a valid email address!'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjestId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjestId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

userSchema.virutal ('friendCount').get(function (){
    return this.friends.length;
});

const User = model ('User', userSchema);

module.exports = User;