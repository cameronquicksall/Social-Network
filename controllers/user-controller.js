
const { User } = require('../models');

// userController
const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // get single user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //create a user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update single user by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { 
            new: true, 
            runValidators: true
        })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json
            ({ message: 'No user found with this id'});
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete single user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({
            _id: params.id
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json
                ({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add friend
    addToFriendList({ params }, res) {
        User.findOneAndUpdate({
            _id: params.userId
        },
        {
            $push: { friends: params.friendId }
        },
        {
            new: true,
            runValidators: true
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json
                ({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete single friend by id
    removeFromFriendList({ params }, res) {
        User.findOneAndUpdate({
            _id: params.userId
        },
        {
            $pull: { friends: params.friendId }
        },
        {
            new: true
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
}
}

module.exports = userController;