import mongoose from "mongoose";   


const resumeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnailLink: {
        type: String,  
    },
    template:{
        theme: String,  
        colorPalette: [String],
    },
    profileInfo: {
        profilePreviewUrl: String,
        fullName: String,
        designation: String,
        summary: String,
    },
    contactInfo: {
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
        website: String,
    },

    //工作经历
    workExperience: [
        {
            company: String,
            position: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
    ],
    //教育经历
    education: [
        {
            degree: String,
            institution: String,
            startDate: Date,
            endDate: Date,
        },
    ],

    //技能
    skills: [
        {
            name: String,
            progress: Number, 
        },
    ],

    //项目经历
    projects: [
        {
            title: String,
            description: String, 
            gethub: String,
            liveDemo: String,
        },
    ],

    //证书
    certifications: [
        {
            title: String,
            issuer: String,
            year: Date,
        },
    ],

    //语言
    languages: [
        {
            name: String,
            progress: Number,
        },
    ],

    interests: [String],
    
},

{
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
}
);

export default mongoose.model('Resume', resumeSchema);  