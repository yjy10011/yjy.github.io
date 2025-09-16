import React,{ useContext, useState } from 'react';
import { LayoutTemplate, X, Menu, ArrowRight, Zap, Download} from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { landingPageStyles } from '../assets/dummystyle';
import { useNavigate } from 'react-router-dom';
import Model from '../components/Model';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ProfileInfoCard from'../components/Cards'

const LandingPage = () => {
    const {user} = useContext(UserContext); 
    const navigation = useNavigate();
    const [openAuthModal, setOpenAuthModal] = useState(false);//控制登录注册弹窗
    const [mobileMenuOpen , setMobileMenuOpen] = useState(false);//移动端菜单按钮状态
    const [currentPage,setCurrentPage] = useState("login")


    const handleCTA=()=>{
        if(!user){
            setOpenAuthModal(true)
        }
        else{
            NavigationType('/dashboard')
        }

    }

    return (
        <div className = {landingPageStyles.container}>
            {/* HEADER */}
            <header className={landingPageStyles.header}>
                <div className={landingPageStyles.headerContainer}>
                    <div className={landingPageStyles.logoContainer}>
                        <div className={landingPageStyles.logoIcon}>
                            <LayoutTemplate className={landingPageStyles.logoIconInner} />
                        </div>
                        <span className={landingPageStyles.logoText}>YResume</span>
                    </div>
                    
                    {/* MENU */}
                    <button className={landingPageStyles.mobileMenuButton}
                         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? 
                            <X size={24} className={landingPageStyles.mobileMenuIcon} /> :
                        <Menu size= {24} className= {landingPageStyles.mobileMenuIcon} />}
                    </button>

                    {/*desktop navigation*/}
                    <div className='hidden md:flex items-center'>
                        {user?(
                            <ProfileInfoCard/>

                        ):(
                            <button className={landingPageStyles.desktopAuthButton} onClick={()=>setOpenAuthModal(true)}>
                                <div className={landingPageStyles.desktopAuthButtonOverlay}> </div>
                                <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
                            </button>
                        )
                        
                        }
                    </div> 
                </div>
            </header>
            {/*主要内容*/}
            <main className= {landingPageStyles.main}>
                <section className={landingPageStyles.heroSection}>
                    <div className={landingPageStyles.heroGrid}>

                        {/*LEFT */}
                        <div className={landingPageStyles.heroLeft}>
                            <div className={landingPageStyles.tagline}>Professional Resume Builder
                            </div>
                            <h1 className={landingPageStyles.heading}>
                                <span className={landingPageStyles.headingText}>Craft</span>
                                <span className={landingPageStyles.headingGradient}>Professional</span>
                                <span className={landingPageStyles.headingText}>Resume</span>
                            </h1>
                            <p className={landingPageStyles.description}>
                                Creat your job-winning resumes with experty designed templates.
                                ATS-friendly,recruiter-aprroved,and tailored to your career goals.
                            </p>
                            <div className={landingPageStyles.ctaButtons}>
                                <button className={landingPageStyles.primaryButton}
                                onClick={handleCTA}>
                                    <div className={landingPageStyles.primaryButtonOverlay}>
                                    </div>
                                    <span className={landingPageStyles.primaryButtonContent}>Start Building
                                        <ArrowRight className={landingPageStyles.primaryButtonIcon} size={18}/>
                                    </span>
                                </button>
                                <button className={landingPageStyles.secondaryButton} onClick={handleCTA}>
                                    View Template
                                </button>
                            </div>

                            {/*STATS GRID */}
                            <div className={landingPageStyles.statsContainer}>
                                {[
                                    { value: '50K+', label: 'Resumes Created', gradient: 'from-violet-600 to-fuchsia-600' },
                                    { value: '4.9★', label: 'User Rating', gradient: 'from-orange-500 to-red-500' },
                                    { value: '5 Min', label: 'Build Time', gradient: 'from-emerald-500 to-teal-500' }
                                ].map((stat, idx) => (
                                    <div className={landingPageStyles.statItem} key={idx}>
                                        <div className={`${landingPageStyles.statNumber} ${stat.gradient}`}>
                                            {stat.value}
                                        </div>
                                        <div className={landingPageStyles.statLabel}>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Right Content - SVG Illustration */}
                        <div className={landingPageStyles.heroIllustration}>
                            <div className={landingPageStyles.heroIllustrationBg}></div>
                            <div className={landingPageStyles.heroIllustrationContainer}>
                                <svg
                                    viewBox="0 0 400 500"
                                    className={landingPageStyles.svgContainer}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Background */}
                                    <defs>
                                        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#d946ef" />
                                        </linearGradient>
                                        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ffffff" />
                                            <stop offset="100%" stopColor="#f8fafc" />
                                        </linearGradient>
                                    </defs>

                                    {/* SVG elements */}
                                    <rect x="50" y="50" width="300" height="400" rx="20" className={landingPageStyles.svgRect} />
                                    <circle cx="120" cy="120" r="25" className={landingPageStyles.svgCircle} />
                                    <rect x="160" y="105" width="120" height="8" rx="4" className={landingPageStyles.svgRectPrimary} />
                                    <rect x="160" y="120" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                                    <rect x="70" y="170" width="260" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="185" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="200" width="240" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="230" width="60" height="6" rx="3" className={landingPageStyles.svgRectPrimary} />
                                    <rect x="70" y="250" width="40" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="120" y="250" width="50" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="180" y="250" width="45" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="70" y="290" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                                    <rect x="70" y="310" width="180" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="325" width="150" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="340" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />

                                    {/* Animated elements */}
                                    <circle cx="320" cy="100" r="15" className={landingPageStyles.svgAnimatedCircle}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="translate"
                                            values="0,0; 0,-10; 0,0"
                                            dur="3s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <rect x="30" y="300" width="12" height="12" rx="6" className={landingPageStyles.svgAnimatedRect}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="translate"
                                            values="0,0; 5,0; 0,0"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                    <polygon points="360,200 370,220 350,220" className={landingPageStyles.svgAnimatedPolygon}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            values="0 360 210; 360 360 210; 0 360 210"
                                            dur="4s"
                                            repeatCount="indefinite"
                                        />
                                    </polygon>
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features section*/}
                <section className={landingPageStyles.featuresSection}>
                    <div className={landingPageStyles.featuresContainer}>
                        <div className={landingPageStyles.featuresHeader}>
                            <h2 className={landingPageStyles.featuresTitle}>
                                Why choose <span className={landingPageStyles.featuresTitleGradient}>
                                    YResume?
                                </span>
                            </h2>
                            <p className={landingPageStyles.featuresDescription}>
                                Everything you need to create a professional resume that stands out
                            </p>
                        </div>
                        
                        <div className={landingPageStyles.featuresGrid}>
                            {[
                                {
                                    icon: <Zap className={landingPageStyles.featureIcon} />,
                                    title: "Lightning Fast",
                                    description: "Create professional resumes in under 5 minutes with our streamlined process",
                                    gradient: landingPageStyles.featureIconViolet,
                                    bg: landingPageStyles.featureCardViolet
                                },
                                {
                                    icon: <LayoutTemplate className={landingPageStyles.featureIcon} />,
                                    title: "Pro Templates",
                                    description: "Choose from dozens of recruiter-approved, industry-specific templates",
                                    gradient: landingPageStyles.featureIconFuchsia,
                                    bg: landingPageStyles.featureCardFuchsia
                                },
                                {
                                    icon: <Download className={landingPageStyles.featureIcon} />,
                                    title: "Instant Export",
                                    description: "Download high-quality PDFs instantly with perfect formatting",
                                    gradient: landingPageStyles.featureIconOrange,
                                    bg: landingPageStyles.featureCardOrange
                                }
                            ].map((feature,index)=>(
                                <div key={index} className={landingPageStyles.featureCard}>
                                    <div className={landingPageStyles.featureCardHover}></div>
                                    <div className={`${landingPageStyles.featureCardContent} ${feature.bg}`}>
                                        <div className={`${landingPageStyles.featureIconContainer} ${feature.gradient}`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className={landingPageStyles.featureTitle}>
                                            {feature.title}
                                        </h3>
                                        <p className={landingPageStyles.featureDescription}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/*CTA*/}
                <section className={landingPageStyles.ctaSection}>
                    <div className={landingPageStyles.ctaContainer}>
                            <div className={landingPageStyles.ctaCard}>
                                <div className={landingPageStyles.ctaCardBg}></div>
                                <div className={landingPageStyles.ctaCardContent}>
                                    <h2 className={landingPageStyles.ctaTitle}>
                                        Ready to Build Your <span className={landingPageStyles.ctaTitleGradient}>
                                            Standout Resume</span>
                                    </h2>
                                    <p className={landingPageStyles.ctaDescription}>
                                        Join thousands of professional who landed their dream jobs with our platform
                                    </p>
                                    <button className={landingPageStyles.ctaButton} onClick={handleCTA}>
                                        <div className={landingPageStyles.ctaButtonOverlay}> </div>
                                        <span className={landingPageStyles.ctaButtonText}>Start Buliding</span>
                                    </button>
                                </div>
                            </div>
                    </div>
                </section>

                {/*footer */}
                <footer className={landingPageStyles.footer}>
                    <div className={landingPageStyles.footerContainer}>
                        <p className={landingPageStyles.footerText}>
                            Crafted with Crafted with <span className={landingPageStyles.footerHeart}>❤️</span> by{' '}
                        </p>
                    </div>
                </footer>
                
                {/* Model for login and signup */}
                <Model isOpen={openAuthModal} onClick={()=>{
                    setOpenAuthModal(false)
                    setCurrentPage("login")
                }} hideHeader>
                    <div>
                        {currentPage ==="login"&& <Login setCurrentPage={setCurrentPage}/> }
                        {currentPage ==="signup"&&<SignUp setCurrentPage={setCurrentPage}/>}
                    </div>

                </Model>

            </main>
        </div>
    )
};

export default LandingPage;
