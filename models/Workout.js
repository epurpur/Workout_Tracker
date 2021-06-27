const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// WorkoutSchema will have a date and an array of exercise information including: 
// name, type, weight, sets, reps, and duration of exercise. 
// If the exercise is a cardio exercise, I should be able to track my distance traveled.

const WorkoutSchema = new Schema({

    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        name: {
            type: String,
            required: "Workout name is required"
        },
        type: {
            type: String,
            unique: false,
            required: "Workout type is required"
        },
        weight: {
            type: Number
        },
        sets: {
            type: Number
        },
        reps: {
            type: Number
        },
        duration: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;