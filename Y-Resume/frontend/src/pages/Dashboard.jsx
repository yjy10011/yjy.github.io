import React, { use, useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout.jsx'
import {dashboardStyles as styles} from '../assets/dummystyle.js'
import { useNavigate } from 'react-router-dom'
import { LucideFilePlus, LucideTrash2 } from 'lucide-react'
import axiosInstance from '../utlis/axiosIntance.js'
import { API_PATHS } from '../utlis/apiPaths.js'
import { ResumeSummaryCard } from '../components/Cards.jsx'
import toast from 'react-hot-toast'
import dayjs from "dayjs";//mopment和react19无法兼容，替换成dayjs
import Modal from '../components/Model.jsx'
import CreateResumeForm from '../components/CreateResumeForm.jsx'

const Dashboard = () => {

  const navigate = useNavigate();
  const [openCreateModal,setOpenCreateModal] = useState(false)
  const [allResumes,setAllResumes] =useState([])
  const [loading,setLoading] = useState(true)
  const [resumeToDelete,setResumeToDelete]=useState(null)
  const [showDeleteConfirm,setShowDeleteConfirm] = useState(false)

  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach(exp => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resume.education?.forEach(edu => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resume.skills?.forEach(skill => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resume.projects?.forEach(project => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resume.certifications?.forEach(cert => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resume.languages?.forEach(lang => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += (resume.interests?.length || 0);
    completedFields += (resume.interests?.filter(i => i?.trim() !== "")?.length || 0);

    return Math.round((completedFields / totalFields) * 100);
  };

  const fetchAllResumes = async() =>{
    try{
      setLoading(true)
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL)

      const resumeWithCompletion = response.data.map(resume => ({
        ...resume,
        completion:calculateCompletion(resume)
      }))
      setAllResumes(resumeWithCompletion)
    }
    catch(error){
      console.error('Error fetching resumes',error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllResumes()
  },[])

  const handleDeleteResume = async()=>{
    if(!resumeToDelete) return;

    try{
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete))
      toast.success('Resume deleted successfully')
      fetchAllResumes()
    }
    catch(error){
      console.error('Error deleting resume:',error)
      toast.error('failed to delete')
    }
    finally{
      setResumeToDelete(null)
      setShowDeleteConfirm(false)
    }
  }

  const handleDelelteClick=(id) =>{
    setResumeToDelete(id);
    setShowDeleteConfirm(true)
  }
  
  return (
  <DashboardLayout>
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div>
          <h1 className={styles.headerTitle}>My Resume</h1>
          <p className={styles.headerSubtitle}>
            {allResumes.length>0 ?`You have ${allResumes.length} resumes${allResumes.length!==1 ? 's' :''}`
            : 'Start building your professional resumes'}
          </p>
        </div>
        <div className='flex gap-4'>
          <button className={styles.createButton}
          onClick={()=>setOpenCreateModal(true)}>
            <div className={styles.createButtonOverlay}></div>
            <span className={styles.createButtonContent}>
              Create Now
              <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={18}/>
            </span>
          </button>
        </div>
      </div>

      {/*loading */}
      {loading && (
        <div className={styles.spinnerWrapper}>
          <div className={styles.spinner}></div>
        </div>
      )}

      {/*empty state */}
      {!loading && allResumes.length ===0 &&(
        <div className={styles.emptyStateWrapper}>
          <div className={styles.emptyIconWrapper}>
            <LucideFilePlus size={32} className='text-violet-600'/>
          </div>

          <h3 className={styles.emptyTitle}>No Resumes yet</h3>
          <p className={styles.emptyText}>
            You have not created any resumes yet.Start building your professional resume to land 
            your dream job.
          </p>
          <button className={styles.createButton} onClick={()=>setOpenCreateModal(true)}>
            <div className={styles.createButtonOverlay}>
            </div>
            <span className={styles.createButtonContent}>
              Create your first resume
              <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={20}/>

            </span>
          </button>
        </div>
      )}

      {/*grid*/}
      {!loading && allResumes.length>0&&(
        <div className={styles.grid}>
          <div className={styles.newResumeCard} onClick={()=>setOpenCreateModal(true)}>
            <div className={styles.newResumeIcon}>
                <LucideFilePlus className='text-white' size={32}/>
            </div>
            <h3 className={styles.newResumeTitle}>Create New Resume</h3>
            <p className={styles.newResumeText}>Start building your career</p>
          </div>
          {allResumes.map((resume)=>(
            <ResumeSummaryCard key={resume._id} imgUrl={resume.thumbnailLink}
            title={resume.title} createdAt={resume.createdAt} updatedAt={resume.updatedAt}
            onSelect={()=>navigate(`/resume/${resume._id}`)}
            onDelete={()=>handleDelelteClick(resume._id)}
            completion={resume.completion || 0}
            isPremium={resume.isPremium}
            isNew={dayjs().diff(dayjs(resume.createdAt), 'day') < 7}/>
          ))}

        </div>
      )}
    </div>
    {/*create modal */}
    <Modal isOpen={openCreateModal} onClose={()=> setOpenCreateModal(false)}
      hideHeader maxWidth='max-w-2xl'>
        <div className='p-6'>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Create New Resume</h3>
            <button onClick={()=>setOpenCreateModal(false)} className={styles.modalCloseButton}>
              X
            </button>
          </div>
          <CreateResumeForm onSucess={()=>{
            setOpenCreateModal(false);
            fetchAllResumes();
          }}/>
        </div>
    </Modal>

    {/*delete modal */}
    <Modal isOpen={showDeleteConfirm} onClose={()=>setShowDeleteConfirm(false)} title='Confirm Deletion' 
      showActionBtn actionBtnText='Delete' actionBtnClassName='bg-red-600 hover:bg-red-700'
      onActionClick={handleDeleteResume}>
        <div className='P-4'>
          <div className='flex flex-col items-center text-center'>
            <div className={styles.deleteIconWrapper}>
              <LucideTrash2 className='text-orange-600' size={24}/>
            </div>

            <h3 className={styles.deleteTitle}>Delete Resume?</h3>
            <p className={styles.deleteText}>
              Are you sure you want to delete this resume? This action can not be undone.
            </p>

          </div>

        </div>

    </Modal>

  </DashboardLayout>
  )
}

export default Dashboard

