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
// This creates a new record with only an ID and Date, but no exercises yet
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


// Update a workout
// This updates an existing workout's exercises
// Workout is found by it's ID
router.put('/api/workouts/:id', ({body, params}, res) => {
    console.log({body});
    Workout.findByIdAndUpdate(
        params.id,
        {$push: {exercises: body}},
        {new: true, runValidators: true}
    )
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err);
    });
});


// Get most recent workout
router.get('/api/workouts/mostRecent', (req, res) => {
    Workout.find()
    .sort({ _id: -1 })       // sort in reverse chronological order
    .limit(1)                // limit results to just the most recent result
    .then(dbWorkout => {
        console.log("Most recent workout", dbWorkout);
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});


// Get last 7 workouts
// Workouts are sorted in chronological order
router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .sort({ _id: 1 })
    .limit(7)
    .then(dbWorkout => {
        console.log("Last 7 workouts", dbWorkout);
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});


// delete a workout
router.delete('/api/workouts/delete', ({body}, res) => {
    Workout.findByIdAndRemove(body.id)
    .then (() => {
        res.json(true)
    })
    .catch(err => {
        res.json(err);
    });
});


module.exports = router;