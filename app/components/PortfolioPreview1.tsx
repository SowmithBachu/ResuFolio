'use client';

import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  User,
  FileText,
  FolderOpen,
  Edit2,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { Button } from './ui/button';

interface PortfolioData {
  name?: string;
  email?: string;
  location?: string;
  professionalTitle?: string;
  phone?: string;
  birthday?: string;
  avatar?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  social?: {
    github?: string;
    twitter?: string;
    instagram?: string;
  };
  summary?: string;
  experience?: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  skills?: string[];
  projects?: Array<{
    title: string;
    description: string;
    technologies?: string;
  }>;
  customElements?: Array<{
    id: string;
    type: string;
    props?: any;
    section?: string;
  }>;
}

interface PortfolioPreviewProps {
  data: PortfolioData;
  customElements?: Array<{
    id: string;
    type: string;
    props?: any;
    section?: string;
  }>;
  onDrop?: (e: React.DragEvent, sectionId: string) => void;
  onDragOver?: (e: React.DragEvent, sectionId: string) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  isCustomizing?: boolean;
  activeDropZone?: string | null;
  onEditElement?: (elementId: string) => void;
}

// Simple UI Components


export default function PortfolioPreview1({ 
  data, 
  customElements = [],
  onDrop,
  onDragOver,
  onDragLeave,
  isCustomizing = false,
  activeDropZone = null,
  onEditElement
}: PortfolioPreviewProps) {
  const githubLink = (data.social?.github || data.githubUrl || '').trim();
  const linkedinLink = (data.linkedinUrl || '').trim();
  const avatarSrc = data.avatar;

  const renderCustomElement = (element: { type: string; id: string; props?: any }) => {
    const { type, props = {} } = element;
    
    if (type === 'wizard') {
      return (
        <div className="w-full py-8 px-6 bg-white rounded-lg border-[3px] border-black my-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {Array.from({ length: props.steps || 3 }).map((_, index) => {
              const stepNum = index + 1;
              const isActive = stepNum === (props.currentStep || 1);
              const isCompleted = stepNum < (props.currentStep || 1);
              
              return (
                <div key={index} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : isActive 
                        ? 'bg-blue-100 border-blue-600 text-blue-600' 
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <span className="text-white text-sm">✓</span>
                      ) : (
                        <span className="text-sm font-semibold">{stepNum}</span>
                      )}
                    </div>
                    <span className={`mt-2 text-xs font-medium ${
                      isActive || isCompleted 
                        ? 'text-blue-600' 
                        : 'text-gray-400'
                    }`}>
                      Step {stepNum}
                    </span>
                  </div>
                  {index < (props.steps || 3) - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      isCompleted 
                        ? 'bg-blue-600' 
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (type === 'steps') {
      const items = props.items || ['Step 1', 'Step 2', 'Step 3'];
      return (
        <div className="w-full py-6 px-6 bg-white rounded-lg border-[3px] border-black my-6">
          <div className="space-y-4">
            {items.map((item: string, index: number) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-base font-medium text-black">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (type === 'timeline') {
      const items = props.items || ['Event 1', 'Event 2', 'Event 3'];
      return (
        <div className="w-full py-6 px-6 bg-white rounded-lg border-[3px] border-black my-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-6">
              {items.map((item: string, index: number) => (
                <div key={index} className="relative flex items-start gap-4">
                  <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 border-4 border-white"></div>
                  <div className="flex-1 pt-1">
                    <p className="text-base font-medium text-black">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    if (type === 'stats') {
      const stats = props.stats || [
        { label: 'Projects', value: '50+' },
        { label: 'Clients', value: '30+' },
        { label: 'Experience', value: '5y' }
      ];
      return (
        <div className="w-full py-6 px-6 bg-white rounded-lg border-[3px] border-black my-6">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat: { label: string; value: string }, index: number) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (type === 'achievements') {
      const items = props.items || ['Achievement 1', 'Achievement 2', 'Achievement 3'];
      return (
        <div className="w-full py-6 px-6 bg-white rounded-lg border-[3px] border-black my-6">
          <div className="space-y-3">
            {items.map((item: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-blue-600 text-xl">🏆</span>
                <p className="text-base text-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (type === 'progress') {
      const items = props.items || [
        { label: 'Skill 1', progress: 90 },
        { label: 'Skill 2', progress: 75 },
        { label: 'Skill 3', progress: 60 }
      ];
      return (
        <div className="w-full py-6 px-6 bg-white rounded-lg border-[3px] border-black my-6">
          <div className="space-y-4">
            {items.map((item: { label: string; progress: number }, index: number) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-black">{item.label}</span>
                  <span className="text-sm text-gray-600">{item.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };

  const getCustomElementsForSection = (sectionId: string) => {
    return customElements.filter(el => el.section === sectionId);
  };

  return (
    <div className="min-h-full bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 pt-8 pb-4">
          <nav className="flex items-center justify-between bg-white border-4 border-black rounded-xl px-5 py-3 max-w-2xl mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
              <a href="#hero" className="text-[18px] font-bold leading-[20px] text-black hover:opacity-70 transition-opacity">
                Home
              </a>
              <a href="#about" className="text-[18px] font-bold leading-[20px] text-black hover:opacity-70 transition-opacity">
                About
              </a>
              <a href="#projects" className="text-[18px] font-bold leading-[20px] text-black hover:opacity-70 transition-opacity">
                Portfolio
              </a>
              <a href="#skills" className="text-[18px] font-bold leading-[20px] text-black hover:opacity-70 transition-opacity">
                Skills
              </a>
              <a href="#contact" className="text-[18px] font-bold leading-[20px] text-black hover:opacity-70 transition-opacity">
                Contact
              </a>
            </div>
            <Button className="bg-black text-white hover:bg-black/90 rounded-sm px-5 h-12 min-w-[48px] flex-shrink-0" size="icon" variant="default">
              <Mail className="w-5 h-5" strokeWidth={2.5} />
            </Button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section 
          id="hero"
          className={`container mx-auto px-4 py-16 md:py-24 relative transition-all ${
            isCustomizing && activeDropZone === 'hero' 
              ? 'ring-2 ring-blue-500 ring-dashed bg-blue-50/50' 
              : ''
          }`}
          onDrop={isCustomizing ? (e) => onDrop?.(e, 'hero') : undefined}
          onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'hero') : undefined}
          onDragLeave={isCustomizing ? onDragLeave : undefined}
        >
          {isCustomizing && activeDropZone === 'hero' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-lg px-8 py-4 backdrop-blur-sm">
                <p className="text-blue-600 font-semibold">Drop element here</p>
              </div>
            </div>
          )}
          {getCustomElementsForSection('hero').map((el) => (
            <div key={el.id} className="relative group mb-6">
              {isCustomizing && (
                <>
                  <button
                    onClick={() => onEditElement?.(el.id)}
                    className="absolute -top-2 -left-2 z-20 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 shadow-md"
                    title="Edit element"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(new CustomEvent('removeElement', { detail: { id: el.id } }));
                      }
                    }}
                    className="absolute -top-2 -right-2 z-20 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 shadow-md"
                    title="Remove element"
                  >
                    ×
                  </button>
                </>
              )}
              {renderCustomElement(el)}
            </div>
          ))}
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-[42px] leading-[50px] md:text-[72px] font-bold md:leading-[85px] text-black">
                I'm <span className="bg-[#FF6B7A] text-white px-3 py-1 inline-block">{data.name || 'Your Name'}</span>, <span className="text-black">a {data.professionalTitle || 'Professional'} from</span>{' '}
                <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">{data.location || 'Location'}</span>
              </h1>
              <p className="text-black text-[16px] md:text-[18px] font-medium leading-[28px] md:leading-[30px] max-w-xl">
                {data.summary || 'A passionate professional with a drive to explore new technologies. I adapt quickly to new environments, allowing me to integrate seamlessly with diverse teams and projects.'}
              </p>
              {(githubLink || linkedinLink) && (
                <div className="flex gap-3 pt-2">
                  {githubLink && (
                    <a href={githubLink} target="_blank" rel="noopener noreferrer">
                      <div className="w-12 h-12 bg-black border-2 border-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <Github className="h-6 w-6 text-white" />
                      </div>
                    </a>
                  )}
                  {linkedinLink && (
                    <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                      <div className="w-12 h-12 bg-[#0077B5] border-2 border-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <Linkedin className="h-6 w-6 text-white" />
                      </div>
                    </a>
                  )}
                </div>
              )}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-7 pt-4">
                <Button asChild className="w-full sm:w-auto sm:min-w-[240px] bg-[#0B0B0B] text-white hover:bg-black/90 h-auto py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold rounded-lg">
                  <a href="#contact">
                    <Mail className="w-5 h-5 mr-2" />
                    Get in touch
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full sm:w-auto sm:min-w-[240px] bg-white border-[3px] border-black hover:bg-gray-50 h-auto py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold rounded-lg text-black">
                  <a href="#projects" className="text-black">
                    <FolderOpen className="w-5 h-5 mr-2 text-black" />
                    View portfolio
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-md aspect-square bg-[#FDB927] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {avatarSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarSrc}
                    alt={data.name || 'Avatar'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-black">
                    {(data.name || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section 
            id="experience" 
            className={`bg-black py-16 md:py-24 scroll-mt-20 relative transition-all ${
              isCustomizing && activeDropZone === 'experience' 
                ? 'ring-2 ring-blue-500 ring-dashed bg-blue-950/20' 
                : ''
            }`}
            onDrop={isCustomizing ? (e) => onDrop?.(e, 'experience') : undefined}
            onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'experience') : undefined}
            onDragLeave={isCustomizing ? onDragLeave : undefined}
          >
            {isCustomizing && activeDropZone === 'experience' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-lg px-8 py-4 backdrop-blur-sm">
                  <p className="text-blue-400 font-semibold">Drop element here</p>
                </div>
              </div>
            )}
            {getCustomElementsForSection('experience').map((el) => (
              <div key={el.id} className="mb-6 relative group">
                {isCustomizing && (
                  <>
                    <button
                      onClick={() => onEditElement?.(el.id)}
                      className="absolute -top-2 -left-2 z-20 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 shadow-md"
                      title="Edit element"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(new CustomEvent('removeElement', { detail: { id: el.id } }));
                        }
                      }}
                      className="absolute -top-2 -right-2 z-20 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 shadow-md"
                      title="Remove element"
                    >
                      ×
                    </button>
                  </>
                )}
                {renderCustomElement(el)}
              </div>
            ))}
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                <div className="text-white pt-0 md:pt-12 md:sticky md:top-12 self-start">
                  <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 leading-[1.3]">
                    Take a look at my <span className="bg-[#6366F1] text-white px-3 py-1 inline-block">past experience</span>
                  </h2>
                </div>
                <div className="space-y-6">
                  {data.experience.map((exp, index) => (
                    <div key={index} className="bg-white border-4 border-black rounded-3xl min-h-[220px] md:min-h-[240px]">
                      <div className="flex items-center justify-between mb-4 md:mb-6 pt-6 md:pt-8 px-6 md:px-8">
                        <div className="text-base md:text-[22px] leading-tight md:leading-[34px] font-bold text-[#0B0B0B]">
                          {exp.duration}
                        </div>
                        <div className="rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-[#FDB927]">
                          <span className="text-xl font-bold">{(exp.company || 'C').charAt(0).toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="border-t-[3px] border-black mb-4 md:mb-6"></div>
                      <div className="px-6 md:px-8 pb-6 md:pb-8">
                        <h3 className="text-xl md:text-[28px] leading-tight md:leading-[40px] font-bold text-[#0B0B0B] mb-2 md:mb-3">
                          {exp.title} at {exp.company}
                        </h3>
                        <p className="text-black text-base md:text-[20px] leading-relaxed md:leading-[32px]">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section 
            id="projects" 
            className={`container mx-auto px-4 py-16 md:py-24 scroll-mt-20 relative transition-all ${
              isCustomizing && activeDropZone === 'projects' 
                ? 'ring-2 ring-blue-500 ring-dashed bg-blue-50/50' 
                : ''
            }`}
            onDrop={isCustomizing ? (e) => onDrop?.(e, 'projects') : undefined}
            onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'projects') : undefined}
            onDragLeave={isCustomizing ? onDragLeave : undefined}
          >
            {isCustomizing && activeDropZone === 'projects' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-lg px-8 py-4 backdrop-blur-sm">
                  <p className="text-blue-600 font-semibold">Drop element here</p>
                </div>
              </div>
            )}
            {getCustomElementsForSection('projects').map((el) => (
              <div key={el.id} className="mb-6 relative group">
                {isCustomizing && (
                  <>
                    <button
                      onClick={() => onEditElement?.(el.id)}
                      className="absolute -top-2 -left-2 z-20 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 shadow-md"
                      title="Edit element"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(new CustomEvent('removeElement', { detail: { id: el.id } }));
                        }
                      }}
                      className="absolute -top-2 -right-2 z-20 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 shadow-md"
                      title="Remove element"
                    >
                      ×
                    </button>
                  </>
                )}
                {renderCustomElement(el)}
              </div>
            ))}
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
                  Take a look at my <br />
                  <span className="bg-[#FFC224] text-black px-3 py-1 inline-block">design portfolio</span>
                </h2>
              </div>
              <div className="space-y-8 mb-12">
                {data.projects.map((project, index) => {
                  const bgColors = ['bg-[#6366F1]', 'bg-[#2F81F7]', 'bg-[#FF6B7A]', 'bg-[#FFC224]'];
                  const bgColor = bgColors[index % bgColors.length];
                  return (
                    <div
                      key={index}
                      className="group grid md:grid-cols-2 bg-white border-[3px] border-black rounded-[32px] overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <div className="p-6 md:p-12 flex flex-col justify-center bg-white">
                        <span className="inline-block bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 w-fit">
                          {project.technologies ? project.technologies.split(',')[0].trim() : 'Project'}
                        </span>
                        <h3 className="text-xl md:text-[28px] font-bold mb-4 leading-tight md:leading-[40px] text-[#0B0B0B]">
                          {project.title}
                        </h3>
                        <p className="text-base md:text-[18px] text-black mb-8 leading-relaxed md:leading-[30px] font-medium">
                          {project.description}
                        </p>
                        <a
                          href="#"
                          className="flex items-center gap-2 font-semibold text-[#0B0B0B] hover:gap-3 transition-all text-sm md:text-base"
                        >
                          View case study
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                      <div className={`${bgColor} relative overflow-hidden min-h-[250px] md:min-h-[500px] flex items-center justify-center`}>
                        <div className="text-white text-6xl font-bold">
                          {(project.title || 'P').charAt(0).toUpperCase()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section 
            id="skills" 
            className={`bg-white py-16 md:py-24 scroll-mt-20 relative transition-all ${
              isCustomizing && activeDropZone === 'skills' 
                ? 'ring-2 ring-blue-500 ring-dashed bg-blue-50/50' 
                : ''
            }`}
            onDrop={isCustomizing ? (e) => onDrop?.(e, 'skills') : undefined}
            onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'skills') : undefined}
            onDragLeave={isCustomizing ? onDragLeave : undefined}
          >
            {isCustomizing && activeDropZone === 'skills' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-lg px-8 py-4 backdrop-blur-sm">
                  <p className="text-blue-600 font-semibold">Drop element here</p>
                </div>
              </div>
            )}
            {getCustomElementsForSection('skills').map((el) => (
              <div key={el.id} className="mb-6 relative group">
                {isCustomizing && (
                  <>
                    <button
                      onClick={() => onEditElement?.(el.id)}
                      className="absolute -top-2 -left-2 z-20 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 shadow-md"
                      title="Edit element"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(new CustomEvent('removeElement', { detail: { id: el.id } }));
                        }
                      }}
                      className="absolute -top-2 -right-2 z-20 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 shadow-md"
                      title="Remove element"
                    >
                      ×
                    </button>
                  </>
                )}
                {renderCustomElement(el)}
              </div>
            ))}
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4 text-black">
                    My broad <span className="bg-[#FF4A60] text-white px-3 py-1 inline-block">set of services</span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-white border-[3px] border-black rounded-[32px] overflow-hidden hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center p-8"
                    >
                      <h3 className="text-[28px] leading-[40px] font-bold mb-3 text-[#0B0B0B] text-center">{skill}</h3>
                    </div>
                  ))}
                  <div className="bg-[#FFC224] border-[3px] border-black rounded-[32px] p-8 md:p-12 flex flex-col items-center justify-center text-center hover:translate-y-[-4px] transition-transform min-h-[200px] relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="mb-4">
                      <Mail className="w-12 h-12 text-black" />
                    </div>
                    <h3 className="text-[28px] leading-[40px] font-bold mb-4 text-[#0B0B0B]">Get in touch</h3>
                    <p className="text-[18px] leading-[30px] font-medium text-black mb-6">
                      Looking for another service? Get in touch with me!
                    </p>
                    <Button asChild className="w-full max-w-[340px] h-[64px] bg-[#0B0B0B] text-white hover:bg-black/90 rounded-[16px] px-12 py-6 font-medium text-[18px]">
                      <a href="#contact">
                        <Mail className="w-5 h-5 mr-2" />
                        Get in touch
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section 
            id="education" 
            className={`container mx-auto px-4 py-16 md:py-24 scroll-mt-20 relative transition-all ${
              isCustomizing && activeDropZone === 'education' 
                ? 'ring-2 ring-blue-500 ring-dashed bg-blue-50/50' 
                : ''
            }`}
            onDrop={isCustomizing ? (e) => onDrop?.(e, 'education') : undefined}
            onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'education') : undefined}
            onDragLeave={isCustomizing ? onDragLeave : undefined}
          >
            {isCustomizing && activeDropZone === 'education' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-lg px-8 py-4 backdrop-blur-sm">
                  <p className="text-blue-600 font-semibold">Drop element here</p>
                </div>
              </div>
            )}
            {getCustomElementsForSection('education').map((el) => (
              <div key={el.id} className="mb-6 relative group">
                {isCustomizing && (
                  <>
                    <button
                      onClick={() => onEditElement?.(el.id)}
                      className="absolute -top-2 -left-2 z-20 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 shadow-md"
                      title="Edit element"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(new CustomEvent('removeElement', { detail: { id: el.id } }));
                        }
                      }}
                      className="absolute -top-2 -right-2 z-20 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 shadow-md"
                      title="Remove element"
                    >
                      ×
                    </button>
                  </>
                )}
                {renderCustomElement(el)}
              </div>
            ))}
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
                  My <span className="bg-[#6366F1] text-white px-3 py-1 inline-block">Education</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
                {data.education.map((edu, index) => (
                  <div key={index} className="bg-white border-4 border-black rounded-3xl min-h-[280px] md:min-h-[320px]">
                    <div className="flex items-center justify-between mb-4 md:mb-6 pt-6 md:pt-8 px-6 md:px-8">
                      <div className="text-base md:text-[22px] leading-tight md:leading-[34px] font-bold text-[#0B0B0B]">
                        {edu.year}
                      </div>
                      <div className="rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-[#2F81F7]">
                        <span className="text-xl font-bold text-white">{(edu.institution || 'E').charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="border-t-[3px] border-black mb-4 md:mb-6"></div>
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <h3 className="text-xl md:text-[28px] leading-tight md:leading-[40px] font-bold text-[#0B0B0B] mb-2 md:mb-3">
                        {edu.degree}
                      </h3>
                      <p className="text-black text-base md:text-[20px] leading-relaxed md:leading-[32px]">
                        {edu.institution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section 
          id="contact" 
          className={`container mx-auto px-4 py-16 md:py-24 scroll-mt-20 relative transition-all ${
            isCustomizing && activeDropZone === 'contact' 
              ? 'ring-2 ring-blue-500 ring-dashed bg-blue-50/50' 
              : ''
          }`}
          onDrop={isCustomizing ? (e) => onDrop?.(e, 'contact') : undefined}
          onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'contact') : undefined}
          onDragLeave={isCustomizing ? onDragLeave : undefined}
        >
          {isCustomizing && activeDropZone === 'contact' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-lg px-8 py-4 backdrop-blur-sm">
                <p className="text-blue-600 font-semibold">Drop element here</p>
              </div>
            </div>
          )}
          {getCustomElementsForSection('contact').map((el) => (
            <div key={el.id} className="mb-6 relative group">
              {isCustomizing && (
                <>
                  <button
                    onClick={() => onEditElement?.(el.id)}
                    className="absolute -top-2 -left-2 z-20 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 shadow-md"
                    title="Edit element"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(new CustomEvent('removeElement', { detail: { id: el.id } }));
                      }
                    }}
                    className="absolute -top-2 -right-2 z-20 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 shadow-md"
                    title="Remove element"
                  >
                    ×
                  </button>
                </>
              )}
              {renderCustomElement(el)}
            </div>
          ))}
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
                Get <span className="bg-[#FF6B7A] text-white px-3 py-1 inline-block">In Touch</span>
              </h2>
              <p className="text-black text-base md:text-lg font-medium leading-relaxed md:leading-[30px] max-w-2xl">
                Feel free to reach out through any of these channels
              </p>
            </div>
            <div className="bg-white border-[3px] border-black rounded-[32px] p-8 md:p-12 max-w-2xl">
              <div className="space-y-6">
                {data.email && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#6366F1] border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg md:text-xl text-black">Email</p>
                      <p className="text-base md:text-lg text-black">{data.email}</p>
                    </div>
                  </div>
                )}
                {data.phone && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2F81F7] border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg md:text-xl text-black">Phone</p>
                      <p className="text-base md:text-lg text-black">{data.phone}</p>
                    </div>
                  </div>
                )}
                 {data.location && (
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-[#FF6B7A] border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                       <MapPin className="h-6 w-6 text-white" />
                     </div>
                     <div>
                       <p className="font-semibold text-lg md:text-xl text-black">Location</p>
                       <p className="text-base md:text-lg text-black">{data.location}</p>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

