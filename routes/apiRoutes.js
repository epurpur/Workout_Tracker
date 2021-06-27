const router = require('express').Router();
const Workout = require('../models/Workout.js');


// get all workouts
router.get('/api/allWorkouts', (req, res) => {
    Workout.find({})
        .sort({ date: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// create a workout
router.post('/api/workouts', (req, res) => {
    Workout.create({})
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        console.log('There is an error', err)
        res.json(err);
    });
});

// delete a workout
router.delete('/api/workouts/delete', ({body}, res) => {
    Workout.findByIdAndDelete(body.id)
    .then (() => {
        res.json(true)
    })
    .catch(err => {
        res.json(err);
    });
})


module.exports = router;