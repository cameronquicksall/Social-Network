const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

// /api/thoughts 
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

router
    .route('/:thoughtId/reactions')
    .post(createReaction)

router
    .route('/:thoughtId/reactions/"reactionId')
    .delete(deleteReaction)


module.exports = router;