import Resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path';

// 创建简历
export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: '',
        fullName: '',
        designation: '',
        summary: '',
      },
      contactInfo: {
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
      },
      workExperience: [
        { company: '', role: '', startDate: '', endDate: '', description: '' },
      ],
      education: [
        { degree: '', institution: '', startDate: '', endDate: '' },
      ],
      skills: [{ name: '', progress: 0 }],
      projects: [{ title: '', description: '', github: '', liveDemo: '' }],
      certifications: [{ title: '', issuer: '', year: '' }],
      languages: [{ name: '', progress: '' }],
      interests: [''],
    };

    const newResume = await Resume.create({
      userId: req.user._id, // 保留 userId
      title,
      ...defaultResumeData,
      ...req.body
    });

    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resume",
      error: error.message
    });
  }
};

// 获取用户所有简历
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get resumes",
      error: error.message
    });
  }
};

// 根据ID获取简历
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get resume",
      error: error.message
    });
  }
};

// 更新简历
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    Object.assign(resume, req.body);
    const savedResume = await resume.save();
    res.json(savedResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update resume",
      error: error.message
    });
  }
};

// 删除简历
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const uploadFolder = path.join(process.cwd(), 'uploads');

    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail);
      }
    }

    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(uploadFolder, path.basename(resume.profileInfo.profilePreviewUrl));
      if (fs.existsSync(oldProfile)) {
        fs.unlinkSync(oldProfile);
      }
    }

    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete resume",
      error: error.message
    });
  }
};
