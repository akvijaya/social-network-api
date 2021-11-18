const { Thought, User } = require("../models");

const thoughtController = { 

    getAllThoughts (req, res){
        Thought.find ({})
        .select ('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
    },

    getThoughtById ({params}, res){
        Thought.findOne ({ _id: params.Id})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found!' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
    },

    addThought ({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.Id },
                { $push: {thoughts: _id }},
                { new: true }
            )
        })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found!' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
    },


    updateThought ({params, body}, res){
        Thought.findOneAndUpdate ({ _id: params.thoughtId}, body,  { new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found!' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
    },

    deleteThought ({params}, res){
        Thought.findOneAndDelete ({ _id: params.thoughtId})
        .then((deletedThought) => {
            if (!deletedThought) {
              return res.status(404).json({ message: "No thought found!" });
            }
            User.findOneAndUpdate(
              { username: deletedThought.username },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found!' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
    },


    addReaction ({params}, res){
        User.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions:body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found!' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
    },

    deleteReaction ({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: { reactions: { reactionId: params.reactionId }}},
            {new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found!' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
    },

};

module.exports = thoughtController;
