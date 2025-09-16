import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

// 获取当前文件的目录路径（ES模块兼容性）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadResumeImage = async (req, res) => {
    try {
        // 正确的fields使用方法
        upload.fields([
            { name: "thumbnail", maxCount: 1 },
            { name: "profileImage", maxCount: 1 }
        ])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "File upload failed", error: err.message });
            }

            const resumeId = req.params.id;
            const resume = await Resume.findOne({
                _id: resumeId,
                userId: req.user._id
            });

            if (!resume) {
                return res.status(404).json({ message: "Resume not found or unauthorized" });
            }

            // 确保上传目录存在
            const uploadedFolder = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadedFolder)) {
                fs.mkdirSync(uploadedFolder, { recursive: true });
            }

            const baseUrl = `${req.protocol}://${req.get("host")}`;
            
            // 使用 req.files 而不是 req.file
            const newThumbnail = req.files?.thumbnail?.[0];
            const newProfileImage = req.files?.profileImage?.[0];

            if (newThumbnail) {
                if (resume.thumbnailLink) {
                    const oldThumbnail = path.join(uploadedFolder, path.basename(resume.thumbnailLink));
                    if (fs.existsSync(oldThumbnail)) {
                        fs.unlinkSync(oldThumbnail);
                    }
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
            }

            if (newProfileImage) {
                if (resume.profileInfo?.profilePreviewUrl) {
                    const oldProfile = path.join(uploadedFolder, path.basename(resume.profileInfo.profilePreviewUrl));
                    if (fs.existsSync(oldProfile)) {
                        fs.unlinkSync(oldProfile);
                    }
                }
                // 确保profileInfo对象存在
                if (!resume.profileInfo) {
                    resume.profileInfo = {};
                }
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
            }

            await resume.save();
            res.status(200).json({
                message: "Images uploaded successfully",
                thumbnailLink: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo?.profilePreviewUrl || null
            });
        });
    } catch (err) {
        console.error("Error uploading image:", err);
        res.status(500).json({ 
            message: "Failed to upload images", 
            error: err.message 
        });
    }
};