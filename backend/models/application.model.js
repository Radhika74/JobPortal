import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'interviewed', 'hired', 'rejected'],
        default: 'applied'
    },
    // resume: {
    //     type: String,
    //     required: true
    // },
    // coverLetter: {
    //     type: String,
    //     required: false
    // }
}, { timestamps: true });
export const Application = mongoose.model("Application", applicationSchema);