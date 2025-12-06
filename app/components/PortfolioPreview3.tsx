'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Edit2,
  Download,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { downloadPortfolioHTML } from '../utils/generatePortfolioHTML';

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

export default function PortfolioPreview3({
  data,
  customElements = [],
  onDrop,
  onDragOver,
  onDragLeave,
  isCustomizing = false,
  activeDropZone = null,
  onEditElement,
}: PortfolioPreviewProps) {
  const [isDark, setIsDark] = useState(true);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const githubLink = (data.social?.github || data.githubUrl || '').trim();
  const linkedinLink = (data.linkedinUrl || '').trim();
  const twitterLink = (data.social?.twitter || '').trim();
  const currentYear = new Date().getFullYear();
  const startYear = data.experience && data.experience.length > 0 
    ? data.experience[data.experience.length - 1]?.duration?.split('—')[0]?.trim() || currentYear.toString()
    : currentYear.toString();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -20% 0px' },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleDownload = () => {
    downloadPortfolioHTML(data, customElements, '3');
  };

  const getCustomElementsForSection = (sectionId: string) => {
    return customElements.filter(el => el.section === sectionId);
  };

  const renderCustomElement = (element: { type: string; id: string; props?: any }) => {
    // Simple rendering for custom elements - can be expanded
    return null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Download Button */}
      {isCustomizing && (
        <div className="fixed top-8 right-8 z-50">
          
        </div>
      )}


      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* About Section */}
        <header
          id="about"
          ref={(el) => { sectionsRef.current[0] = el; }}
          className="min-h-[70vh] flex items-center opacity-0 py-12 sm:py-16"
        >
          <div
            className={`w-full ${
              isCustomizing && activeDropZone === 'about'
                ? 'ring-2 ring-blue-500 ring-dashed p-4 rounded-lg'
                : ''
            }`}
            onDrop={isCustomizing ? (e) => onDrop?.(e, 'about') : undefined}
            onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'about') : undefined}
            onDragLeave={isCustomizing ? onDragLeave : undefined}
          >
            {getCustomElementsForSection('about').map((el) => (
              <div key={el.id} className="mb-4 relative group">
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
            <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
              <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-2">
                  <div className="text-sm text-muted-foreground font-mono tracking-wider">
                    PORTFOLIO / {currentYear}
                  </div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                    {data.name?.split(' ')[0] || 'Your'}
                    <br />
                    <span className="text-muted-foreground">
                      {data.name?.split(' ').slice(1).join(' ') || 'Name'}
                    </span>
                  </h1>
                </div>
                <div className="space-y-6 max-w-md">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    {data.summary || 'A passionate professional with a drive to explore new technologies. I adapt quickly to new environments, allowing me to integrate seamlessly with diverse teams and projects.'}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Available for work
                    </div>
                    {data.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {data.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                {data.professionalTitle && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                    <div className="space-y-2">
                      <div className="text-foreground">{data.professionalTitle}</div>
                      {data.experience && data.experience.length > 0 && (
                        <>
                          <div className="text-muted-foreground">
                            @ {data.experience[0].company}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {data.experience[0].duration || 'Present'}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Experience Section */}
        <section
          id="experience"
          ref={(el) => { sectionsRef.current[1] = el; }}
          className="py-12 sm:py-16 opacity-0"
        >
          <div
            className={`space-y-12 sm:space-y-16 ${
              isCustomizing && activeDropZone === 'experience'
                ? 'ring-2 ring-blue-500 ring-dashed p-4 rounded-lg'
                : ''
            }`}
            onDrop={isCustomizing ? (e) => onDrop?.(e, 'experience') : undefined}
            onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'experience') : undefined}
            onDragLeave={isCustomizing ? onDragLeave : undefined}
          >
            {getCustomElementsForSection('experience').map((el) => (
              <div key={el.id} className="mb-4 relative group">
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
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">
                {startYear} — {currentYear}
              </div>
            </div>
            <div className="space-y-8 sm:space-y-12">
              {data.experience && data.experience.length > 0 ? (
                data.experience.map((exp, index) => {
                  const year = exp.duration?.split('—')[0]?.trim() || currentYear.toString();
                  return (
                    <div
                      key={index}
                      className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                    >
                      <div className="lg:col-span-2">
                        <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                          {year}
                        </div>
                      </div>
                      <div className="lg:col-span-6 space-y-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-medium">{exp.title}</h3>
                          <div className="text-muted-foreground">{exp.company}</div>
                        </div>
                        {exp.description && (
                          <p className="text-muted-foreground leading-relaxed max-w-lg">
                            {exp.description}
                          </p>
                        )}
                      </div>
                      <div className="lg:col-span-4"></div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted-foreground">No experience added yet</p>
              )}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={(el) => { sectionsRef.current[2] = el; }}
          className="py-12 sm:py-16 opacity-0"
        >
          <div
            className={`space-y-12 sm:space-y-16 ${
              isCustomizing && activeDropZone === 'projects'
                ? 'ring-2 ring-blue-500 ring-dashed p-4 rounded-lg'
                : ''
            }`}
            onDrop={isCustomizing ? (e) => onDrop?.(e, 'projects') : undefined}
            onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'projects') : undefined}
            onDragLeave={isCustomizing ? onDragLeave : undefined}
          >
            {getCustomElementsForSection('projects').map((el) => (
              <div key={el.id} className="mb-4 relative group">
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
            <h2 className="text-3xl sm:text-4xl font-light">Selected Projects</h2>
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {data.projects && data.projects.length > 0 ? (
                data.projects.map((project, index) => {
                  const tech = project.technologies ? project.technologies.split(',').map(t => t.trim()) : [];
                  const date = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                  const readTime = Math.ceil((project.description?.length || 0) / 200) || 5;
                  return (
                    <article
                      key={index}
                      className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                          <span>{date}</span>
                          <span>{readTime} min</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                        {tech.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {tech.map((t) => (
                              <Badge
                                key={t}
                                variant="outline"
                                className="text-xs border-muted-foreground/30"
                              >
                                {t}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <span>View project</span>
                          <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="text-muted-foreground">No projects added yet</p>
              )}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={(el) => { sectionsRef.current[3] = el; }}
          className="py-12 sm:py-16 opacity-0"
        >
          <div
            className={`space-y-12 sm:space-y-16 ${
              isCustomizing && activeDropZone === 'skills'
                ? 'ring-2 ring-blue-500 ring-dashed p-4 rounded-lg'
                : ''
            }`}
            onDrop={isCustomizing ? (e) => onDrop?.(e, 'skills') : undefined}
            onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'skills') : undefined}
            onDragLeave={isCustomizing ? onDragLeave : undefined}
          >
            {getCustomElementsForSection('skills').map((el) => (
              <div key={el.id} className="mb-4 relative group">
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
            <h2 className="text-3xl sm:text-4xl font-light">Technical Skills</h2>
            <div className="flex flex-wrap gap-3">
              {data.skills && data.skills.length > 0 ? (
                data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground">No skills added yet</p>
              )}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          ref={(el) => { sectionsRef.current[4] = el; }}
          className="py-12 sm:py-16 opacity-0"
        >
          <div
            className={`space-y-12 sm:space-y-16 ${
              isCustomizing && activeDropZone === 'education'
                ? 'ring-2 ring-blue-500 ring-dashed p-4 rounded-lg'
                : ''
            }`}
            onDrop={isCustomizing ? (e) => onDrop?.(e, 'education') : undefined}
            onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'education') : undefined}
            onDragLeave={isCustomizing ? onDragLeave : undefined}
          >
            {getCustomElementsForSection('education').map((el) => (
              <div key={el.id} className="mb-4 relative group">
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
            <h2 className="text-3xl sm:text-4xl font-light">Education</h2>
            <div className="space-y-8 sm:space-y-12">
              {data.education && data.education.length > 0 ? (
                data.education.map((edu, index) => (
                  <div
                    key={index}
                    className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                  >
                    <div className="lg:col-span-2">
                      <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                        {edu.year}
                      </div>
                    </div>
                    <div className="lg:col-span-10 space-y-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium">{edu.degree}</h3>
                        <div className="text-muted-foreground">{edu.institution}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No education added yet</p>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={(el) => { sectionsRef.current[5] = el; }}
          className="py-12 sm:py-16 opacity-0"
        >
          <div
            className={`grid lg:grid-cols-2 gap-12 sm:gap-16 ${
              isCustomizing && activeDropZone === 'contact'
                ? 'ring-2 ring-blue-500 ring-dashed p-4 rounded-lg'
                : ''
            }`}
            onDrop={isCustomizing ? (e) => onDrop?.(e, 'contact') : undefined}
            onDragOver={isCustomizing ? (e) => onDragOver?.(e, 'contact') : undefined}
            onDragLeave={isCustomizing ? onDragLeave : undefined}
          >
            {getCustomElementsForSection('contact').map((el) => (
              <div key={el.id} className="mb-4 relative group">
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
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>
              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>
                <div className="space-y-4">
                  {data.email && (
                    <a
                      href={`mailto:${data.email}`}
                      className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-base sm:text-lg">{data.email}</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  )}
                  {data.phone && (
                    <a
                      href={`tel:${data.phone}`}
                      className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="text-base sm:text-lg">{data.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        <Github className="w-4 h-4" />
                        GitHub
                      </div>
                      <div className="text-sm text-muted-foreground">{githubLink.replace('https://github.com/', '@')}</div>
                    </div>
                  </a>
                )}
                {linkedinLink && (
                  <a
                    href={linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {linkedinLink.replace('https://www.linkedin.com/in/', '').replace('/', '')}
                      </div>
                    </div>
                  </a>
                )}
                {twitterLink && (
                  <a
                    href={twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        <Twitter className="w-4 h-4" />
                        Twitter
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {twitterLink.replace('https://twitter.com/', '@').replace('https://x.com/', '@')}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                © {currentYear} {data.name || 'Your Name'}. All rights reserved.
              </div>
              <div className="text-xs text-muted-foreground">Built with ResuFolio</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

    </div>
  );
}

