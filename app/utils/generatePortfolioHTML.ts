interface PortfolioData {
  name?: string;
  email?: string;
  location?: string;
  professionalTitle?: string;
  phone?: string;
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
  template?: '1' | '2' | '3';
}

interface CustomElement {
  id: string;
  type: string;
  props?: any;
  section?: string;
}

function escapeHtml(text: string): string {
  if (!text) return '';
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function renderCustomElementHTML(element: CustomElement): string {
  const { type, props = {} } = element;
  
  if (type === 'wizard') {
    const steps = props.steps || 3;
    const currentStep = props.currentStep || 1;
    let wizardHTML = '<div class="custom-element wizard"><div class="wizard-container">';
    
    for (let i = 0; i < steps; i++) {
      const stepNum = i + 1;
      const isActive = stepNum === currentStep;
      const isCompleted = stepNum < currentStep;
      
      wizardHTML += '<div class="wizard-step-wrapper">';
      wizardHTML += '<div class="wizard-step">';
      wizardHTML += `<div class="wizard-circle ${isCompleted ? 'completed' : isActive ? 'active' : ''}">`;
      wizardHTML += isCompleted ? '<span class="wizard-check">G��</span>' : `<span class="wizard-number">${stepNum}</span>`;
      wizardHTML += '</div>';
      wizardHTML += `<span class="wizard-label ${isActive || isCompleted ? 'active' : ''}">Step ${stepNum}</span>`;
      wizardHTML += '</div></div>';
      
      if (i < steps - 1) {
        wizardHTML += `<div class="wizard-connector ${isCompleted ? 'completed' : ''}"></div>`;
      }
    }
    
    wizardHTML += '</div></div>';
    return wizardHTML;
  }
  
  if (type === 'steps') {
    const items = props.items || ['Step 1', 'Step 2', 'Step 3'];
    let stepsHTML = '<div class="custom-element steps"><div class="steps-container">';
    
    items.forEach((item: string, index: number) => {
      stepsHTML += '<div class="step-item">';
      stepsHTML += `<div class="step-number">${index + 1}</div>`;
      stepsHTML += `<div class="step-content">${escapeHtml(item)}</div>`;
      stepsHTML += '</div>';
    });
    
    stepsHTML += '</div></div>';
    return stepsHTML;
  }
  
  if (type === 'timeline') {
    const items = props.items || ['Event 1', 'Event 2', 'Event 3'];
    let timelineHTML = '<div class="custom-element timeline"><div class="timeline-wrapper">';
    timelineHTML += '<div class="timeline-line"></div>';
    timelineHTML += '<div class="timeline-items">';
    
    items.forEach((item: string) => {
      timelineHTML += '<div class="timeline-item">';
      timelineHTML += '<div class="timeline-dot"></div>';
      timelineHTML += `<div class="timeline-content">${escapeHtml(item)}</div>`;
      timelineHTML += '</div>';
    });
    
    timelineHTML += '</div></div></div>';
    return timelineHTML;
  }
  
  if (type === 'stats') {
    const stats = props.stats || [
      { label: 'Projects', value: '50+' },
      { label: 'Clients', value: '30+' },
      { label: 'Experience', value: '5y' }
    ];
    let statsHTML = '<div class="custom-element stats"><div class="stats-grid">';
    
    stats.forEach((stat: { label: string; value: string }) => {
      statsHTML += '<div class="stat-item">';
      statsHTML += `<div class="stat-value">${escapeHtml(stat.value)}</div>`;
      statsHTML += `<div class="stat-label">${escapeHtml(stat.label)}</div>`;
      statsHTML += '</div>';
    });
    
    statsHTML += '</div></div>';
    return statsHTML;
  }
  
  if (type === 'achievements') {
    const items = props.items || ['Achievement 1', 'Achievement 2', 'Achievement 3'];
    let achievementsHTML = '<div class="custom-element achievements"><div class="achievements-list">';
    
    items.forEach((item: string) => {
      achievementsHTML += '<div class="achievement-item">';
      achievementsHTML += '<span class="achievement-icon">=���</span>';
      achievementsHTML += `<span class="achievement-text">${escapeHtml(item)}</span>`;
      achievementsHTML += '</div>';
    });
    
    achievementsHTML += '</div></div>';
    return achievementsHTML;
  }
  
  if (type === 'progress') {
    const items = props.items || [
      { label: 'Skill 1', progress: 90 },
      { label: 'Skill 2', progress: 75 },
      { label: 'Skill 3', progress: 60 }
    ];
    let progressHTML = '<div class="custom-element progress"><div class="progress-list">';
    
    items.forEach((item: { label: string; progress: number }) => {
      progressHTML += '<div class="progress-item">';
      progressHTML += '<div class="progress-header">';
      progressHTML += `<span class="progress-label">${escapeHtml(item.label)}</span>`;
      progressHTML += `<span class="progress-percent">${item.progress}%</span>`;
      progressHTML += '</div>';
      progressHTML += '<div class="progress-bar">';
      progressHTML += `<div class="progress-fill" style="width: ${item.progress}%"></div>`;
      progressHTML += '</div>';
      progressHTML += '</div>';
    });
    
    progressHTML += '</div></div>';
    return progressHTML;
  }
  
  return '';
}

function getCustomElementsForSection(customElements: CustomElement[], sectionId: string): CustomElement[] {
  return customElements.filter(el => el.section === sectionId);
}

export function generatePortfolioHTML(data: PortfolioData, customElements: CustomElement[] = [], template?: '1' | '2' | '3'): string {
  const templateId = template || data.template || '1';
  
  // Generate template-specific HTML
  if (templateId === '3') {
    return generateTemplate3HTML(data, customElements);
  } else if (templateId === '2') {
    return generateTemplate2HTML(data, customElements);
  }
  
  // Default to template 1
  return generateTemplate1HTML(data, customElements);
}

function generateTemplate1HTML(data: PortfolioData, customElements: CustomElement[] = []): string {
  const portfolioName = data.name || 'Portfolio';
  const githubLink = (data.social?.github || data.githubUrl || '').trim();
  const linkedinLink = (data.linkedinUrl || '').trim();
  
  // Generate custom elements HTML for each section
  const heroElements = getCustomElementsForSection(customElements, 'hero').map(el => renderCustomElementHTML(el)).join('');
  const aboutElements = getCustomElementsForSection(customElements, 'about').map(el => renderCustomElementHTML(el)).join('');
  const experienceElements = getCustomElementsForSection(customElements, 'experience').map(el => renderCustomElementHTML(el)).join('');
  const projectsElements = getCustomElementsForSection(customElements, 'projects').map(el => renderCustomElementHTML(el)).join('');
  const skillsElements = getCustomElementsForSection(customElements, 'skills').map(el => renderCustomElementHTML(el)).join('');
  const educationElements = getCustomElementsForSection(customElements, 'education').map(el => renderCustomElementHTML(el)).join('');
  const contactElements = getCustomElementsForSection(customElements, 'contact').map(el => renderCustomElementHTML(el)).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(portfolioName)} - Portfolio</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #111827;
      background: #ffffff;
    }
    
    header {
      position: sticky;
      top: 0;
      z-index: 40;
      width: 100%;
      border-bottom: 1px solid #e5e7eb;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
    }
    
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    nav {
      display: flex;
      height: 5rem;
      align-items: center;
      justify-content: space-between;
    }
    
    nav a {
      text-decoration: none;
      color: #374151;
      font-weight: 500;
      font-size: 1rem;
      transition: color 0.2s;
    }
    
    nav a:hover {
      color: #2563eb;
    }
    
    main {
      padding: 2.5rem 1.5rem;
    }
    
    section {
      padding: 4rem 0;
      scroll-margin-top: 5rem;
    }
    
    h1 {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1rem;
    }
    
    h2 {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 2rem;
    }
    
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .hero {
      padding: 4rem 0;
    }
    
    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    
    @media (min-width: 768px) {
      .hero-content {
        flex-direction: row;
        align-items: center;
      }
    }
    
    .hero-text {
      flex: 2;
    }
    
    .hero-avatar {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    
    .avatar {
      width: 12rem;
      height: 12rem;
      border-radius: 9999px;
      border: 4px solid rgba(37, 99, 235, 0.2);
      object-fit: cover;
    }
    
    .avatar-fallback {
      width: 12rem;
      height: 12rem;
      border-radius: 9999px;
      border: 4px solid rgba(37, 99, 235, 0.2);
      background: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: 700;
      color: #6b7280;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.625rem 1rem;
      border-radius: 0.375rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }
    
    .btn-primary {
      background: #000;
      color: #fff;
    }
    
    .btn-primary:hover {
      background: rgba(0, 0, 0, 0.9);
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .btn-outline {
      border: 1px solid #d1d5db;
      background: transparent;
      color: #111827;
    }
    
    .btn-outline:hover {
      background: #f9fafb;
    }
    
    .card {
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      background: #fff;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .badge {
      display: inline-flex;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      border: 1px solid #e5e7eb;
      background: #f9fafb;
      color: #111827;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .section-divider {
      flex: 1;
      height: 1px;
      background: #e5e7eb;
    }
    
    .social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    
    .social-btn {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 9999px;
      border: 1px solid #d1d5db;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: all 0.2s;
    }
    
    .social-btn:hover {
      background: #f9fafb;
      transform: scale(1.1);
    }
    
    /* Custom Elements Styles */
    .custom-element {
      margin: 1.5rem 0;
      padding: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      background: #fff;
    }
    
    /* Wizard Styles */
    .wizard-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 42rem;
      margin: 0 auto;
    }
    
    .wizard-step-wrapper {
      display: flex;
      align-items: center;
      flex: 1;
    }
    
    .wizard-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }
    
    .wizard-circle {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #d1d5db;
      background: #f9fafb;
      color: #9ca3af;
      font-weight: 600;
      font-size: 0.875rem;
    }
    
    .wizard-circle.completed {
      background: #2563eb;
      border-color: #2563eb;
      color: #fff;
    }
    
    .wizard-circle.active {
      background: #dbeafe;
      border-color: #2563eb;
      color: #2563eb;
    }
    
    .wizard-check {
      color: #fff;
      font-size: 0.875rem;
    }
    
    .wizard-label {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: #9ca3af;
    }
    
    .wizard-label.active {
      color: #2563eb;
    }
    
    .wizard-connector {
      flex: 1;
      height: 2px;
      margin: 0 0.5rem;
      background: #e5e7eb;
    }
    
    .wizard-connector.completed {
      background: #2563eb;
    }
    
    /* Steps Styles */
    .steps-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .step-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .step-number {
      flex-shrink: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 9999px;
      background: #2563eb;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .step-content {
      flex: 1;
      padding-top: 0.25rem;
      font-size: 1rem;
      font-weight: 500;
      color: #111827;
    }
    
    /* Timeline Styles */
    .timeline-wrapper {
      position: relative;
    }
    
    .timeline-line {
      position: absolute;
      left: 1rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #e5e7eb;
    }
    
    .timeline-items {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .timeline-item {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .timeline-dot {
      position: relative;
      z-index: 10;
      flex-shrink: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 9999px;
      background: #2563eb;
      border: 4px solid #fff;
    }
    
    .timeline-content {
      flex: 1;
      padding-top: 0.25rem;
      font-size: 1rem;
      font-weight: 500;
      color: #111827;
    }
    
    /* Stats Styles */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      text-align: center;
    }
    
    .stat-item {
      display: flex;
      flex-direction: column;
    }
    
    .stat-value {
      font-size: 1.875rem;
      font-weight: 700;
      color: #2563eb;
      margin-bottom: 0.25rem;
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
    }
    
    /* Achievements Styles */
    .achievements-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .achievement-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .achievement-icon {
      font-size: 1.25rem;
      color: #2563eb;
    }
    
    .achievement-text {
      font-size: 1rem;
      color: #111827;
    }
    
    /* Progress Styles */
    .progress-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .progress-item {
      display: flex;
      flex-direction: column;
    }
    
    .progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .progress-label {
      color: #111827;
    }
    
    .progress-percent {
      color: #6b7280;
    }
    
    .progress-bar {
      width: 100%;
      height: 0.5rem;
      background: #e5e7eb;
      border-radius: 9999px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: #2563eb;
      transition: width 0.5s;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
    
    .skill-card {
      border-radius: 0.5rem;
      border: 2px solid #e5e7eb;
      background: #fff;
      padding: 1rem 1.25rem;
      text-align: center;
      transition: all 0.3s;
    }
    
    .skill-card:hover {
      border-color: #2563eb;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    /* Theme Toggle */
    .theme-toggle {
      border: 1px solid #d1d5db;
      background: rgba(0, 0, 0, 0.05);
      color: #111827;
      border-radius: 9999px;
      padding: 0.45rem 0.9rem;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .theme-toggle:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    /* Dark mode overrides */
    body.dark {
      color: #f3f4f6;
      background: #0a0a0a;
    }

    body.dark header {
      background: rgba(10, 10, 10, 0.92);
      border-color: #1f2937;
    }

    body.dark nav a {
      color: #d1d5db;
    }

    body.dark nav a:hover {
      color: #60a5fa;
    }

    body.dark .theme-toggle {
      border-color: #374151;
      background: rgba(255, 255, 255, 0.1);
      color: #f3f4f6;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
    }

    body.dark .card,
    body.dark .custom-element,
    body.dark .skill-card {
      background: #111827;
      border-color: #1f2937;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
    }

    body.dark .badge,
    body.dark .social-btn {
      border-color: #374151;
      background: #1f2937;
      color: #f3f4f6;
    }

    body.dark .avatar-fallback {
      background: #1f2937;
      border-color: rgba(96, 165, 250, 0.25);
      color: #d1d5db;
    }

    body.dark .wizard-circle {
      border-color: #374151;
      background: #1f2937;
      color: #9ca3af;
    }

    body.dark .wizard-circle.completed {
      background: #60a5fa;
      border-color: #60a5fa;
      color: #0f172a;
    }

    body.dark .wizard-circle.active {
      background: rgba(96, 165, 250, 0.2);
      border-color: #60a5fa;
      color: #60a5fa;
    }

    body.dark .wizard-label {
      color: #9ca3af;
    }

    body.dark .wizard-label.active {
      color: #60a5fa;
    }

    body.dark .wizard-connector {
      background: #1f2937;
    }

    body.dark .wizard-connector.completed {
      background: #60a5fa;
    }

    body.dark .timeline-line {
      background: #1f2937;
    }

    body.dark .timeline-dot {
      background: #60a5fa;
      border-color: #0a0a0a;
    }

    body.dark .stat-value {
      color: #60a5fa;
    }

    body.dark .stat-label,
    body.dark .progress-percent,
    body.dark .step-content,
    body.dark p,
    body.dark span {
      color: #d1d5db;
    }

    body.dark .achievement-text {
      color: #f3f4f6;
    }

    body.dark .progress-bar {
      background: #1f2937;
    }

    body.dark .progress-fill {
      background: #60a5fa;
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 2.25rem;
      }
      
      h2 {
        font-size: 2rem;
      }
      
      nav {
        flex-wrap: wrap;
        height: auto;
        padding: 1rem 0;
      }
      
      nav > div:first-child {
        width: 100%;
        margin-bottom: 1rem;
      }
      
      .stats-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }
      
      .hero-content {
        flex-direction: column;
      }
    }
  </style>
</head>
<body class="dark">
  <header>
    <nav class="container">
      <div>
        <span style="font-size: 1.5rem; font-weight: 700;">${escapeHtml(portfolioName)}</span>
      </div>
      <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap; justify-content: flex-end;">
        <button class="theme-toggle" id="themeToggle">Light Mode</button>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  </header>
  
  <main class="container">
    <section class="hero" id="hero">
      ${heroElements}
      <div class="hero-content">
        <div class="hero-text">
          <h1>Hi, I'm <span style="color: #2563eb;">${escapeHtml(data.name || 'Your Name')}</span></h1>
          <h2 style="font-size: 2rem; font-weight: 600; color: #6b7280; margin-bottom: 1rem;">
            ${escapeHtml(data.professionalTitle || 'Professional')}
          </h2>
          <p style="font-size: 1.25rem; color: #6b7280; max-width: 48rem; margin-bottom: 2rem; line-height: 1.75;">
            ${escapeHtml(data.summary || 'A passionate professional with a drive to explore new technologies.')}
          </p>
          <div style="display: flex; flex-wrap: gap: 1rem; margin-bottom: 1.5rem;">
            <a href="#contact" class="btn btn-primary">Get in Touch</a>
            <a href="#projects" class="btn btn-outline">View Projects</a>
          </div>
          <div class="social-links">
            ${githubLink ? `<a href="${escapeHtml(githubLink)}" target="_blank" rel="noopener noreferrer" class="social-btn">GitHub</a>` : ''}
            ${linkedinLink ? `<a href="${escapeHtml(linkedinLink)}" target="_blank" rel="noopener noreferrer" class="social-btn">LinkedIn</a>` : ''}
            ${data.email ? `<a href="mailto:${escapeHtml(data.email)}" class="social-btn">Email</a>` : ''}
          </div>
        </div>
        <div class="hero-avatar">
          ${data.avatar ? `<img src="${escapeHtml(data.avatar)}" alt="${escapeHtml(data.name || 'Profile')}" class="avatar" />` : `<div class="avatar-fallback">${(data.name || 'U').charAt(0).toUpperCase()}</div>`}
        </div>
      </div>
    </section>
    
    <section id="about">
      ${aboutElements}
      <div class="section-header">
        <h2>About Me</h2>
        <div class="section-divider"></div>
      </div>
      <div class="card">
        <p style="font-size: 1.125rem; margin-bottom: 1rem; line-height: 1.75;">
          ${escapeHtml(data.summary || 'Professional summary...')}
        </p>
        ${data.skills && data.skills.length > 0 ? `
          <div style="margin-top: 1.5rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">What I'm good at</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
              ${data.skills.map((skill: string) => `<span class="badge">${escapeHtml(skill)}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </section>
    
    ${data.experience && data.experience.length > 0 ? `
      <section id="experience">
        ${experienceElements}
        <div class="section-header">
          <h2>Work Experience</h2>
          <div class="section-divider"></div>
        </div>
        ${data.experience.map((exp: any) => `
          <div class="card">
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">
              <h3>
                <span style="color: #2563eb;">${escapeHtml(exp.title)}</span> at <span style="font-weight: 600;">${escapeHtml(exp.company)}</span>
              </h3>
              <span class="badge">${escapeHtml(exp.duration)}</span>
            </div>
            <p style="color: #6b7280; line-height: 1.75;">${escapeHtml(exp.description)}</p>
          </div>
        `).join('')}
      </section>
    ` : ''}
    
    ${data.projects && data.projects.length > 0 ? `
      <section id="projects">
        ${projectsElements}
        <div class="section-header">
          <h2>Projects</h2>
          <div class="section-divider"></div>
        </div>
        <div class="projects-grid">
          ${data.projects.map((project: any) => `
            <div class="card">
              <h3 style="margin-bottom: 0.5rem;">${escapeHtml(project.title)}</h3>
              <p style="color: #6b7280; margin-bottom: 1rem; line-height: 1.75;">${escapeHtml(project.description)}</p>
              ${project.technologies ? `
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                  ${project.technologies.split(',').map((tech: string) => `<span class="badge">${escapeHtml(tech.trim())}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}
    
    ${data.skills && data.skills.length > 0 ? `
      <section id="skills">
        ${skillsElements}
        <div class="section-header">
          <h2>Technical Skills</h2>
          <div class="section-divider"></div>
        </div>
        <div class="skills-grid">
          ${data.skills.map((skill: string) => `
            <div class="skill-card">
              <span style="font-weight: 600; font-size: 1rem;">${escapeHtml(skill)}</span>
            </div>
          `).join('')}
        </div>
      </section>
    ` : ''}
    
    ${data.education && data.education.length > 0 ? `
      <section id="education">
        ${educationElements}
        <div class="section-header">
          <h2>Education</h2>
          <div class="section-divider"></div>
        </div>
        ${data.education.map((edu: any) => `
          <div class="card">
            <h3 style="margin-bottom: 0.5rem;">${escapeHtml(edu.institution || 'Institution')}</h3>
            <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">${escapeHtml(edu.degree || 'Degree')}</p>
            ${edu.year ? `<span class="badge">${escapeHtml(edu.year)}</span>` : ''}
          </div>
        `).join('')}
      </section>
    ` : ''}
    
    <section id="contact">
      ${contactElements}
      <div class="section-header">
        <h2>Get In Touch</h2>
        <div class="section-divider"></div>
      </div>
      <div class="card">
        ${data.email ? `
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span style="font-weight: 600; font-size: 1.125rem;">Email</span>
            <a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(data.email)}</a>
          </div>
        ` : ''}
        ${data.phone ? `
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span style="font-weight: 600; font-size: 1.125rem;">Phone</span>
            <span>${escapeHtml(data.phone)}</span>
          </div>
        ` : ''}
        ${data.location ? `
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-weight: 600; font-size: 1.125rem;">Location</span>
            <span>${escapeHtml(data.location)}</span>
          </div>
        ` : ''}
        ${(githubLink || linkedinLink) ? `
          <div style="margin-top: 1.5rem;">
            <p style="font-weight: 600; font-size: 1.125rem; margin-bottom: 1rem;">Social Profiles</p>
            <div class="social-links">
              ${githubLink ? `<a href="${escapeHtml(githubLink)}" target="_blank" rel="noopener noreferrer" class="social-btn">GitHub</a>` : ''}
              ${linkedinLink ? `<a href="${escapeHtml(linkedinLink)}" target="_blank" rel="noopener noreferrer" class="social-btn">LinkedIn</a>` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    </section>
</main>
<script>
(function() {
  const body = document.body;
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio_theme');
  if (savedTheme === 'light') {
    body.classList.remove('dark');
  }

  function updateToggleLabel() {
    if (!toggle) return;
    toggle.textContent = body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
  }

  updateToggleLabel();

  toggle?.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('portfolio_theme', body.classList.contains('dark') ? 'dark' : 'light');
    updateToggleLabel();
  });
})();
</script>
</body>
</html>`;
}

export function downloadPortfolioHTML(data: PortfolioData, customElements: CustomElement[] = [], template?: '1' | '2' | '3') {
  const templateId = template || data.template || '1';
  const html = generatePortfolioHTML(data, customElements, templateId);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(data.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateTemplate2HTML(data: PortfolioData, customElements: CustomElement[] = []): string {
  const portfolioName = data.name || 'Portfolio';
  const githubLink = (data.social?.github || data.githubUrl || '').trim();
  const linkedinLink = (data.linkedinUrl || '').trim();
  const avatarSrc = data.avatar;

  const heroElements = getCustomElementsForSection(customElements, 'hero').map(el => renderCustomElementHTML(el)).join('');
  const experienceElements = getCustomElementsForSection(customElements, 'experience').map(el => renderCustomElementHTML(el)).join('');
  const projectsElements = getCustomElementsForSection(customElements, 'projects').map(el => renderCustomElementHTML(el)).join('');
  const skillsElements = getCustomElementsForSection(customElements, 'skills').map(el => renderCustomElementHTML(el)).join('');
  const educationElements = getCustomElementsForSection(customElements, 'education').map(el => renderCustomElementHTML(el)).join('');
  const contactElements = getCustomElementsForSection(customElements, 'contact').map(el => renderCustomElementHTML(el)).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(portfolioName)} - Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #0B0B0B; background: #ffffff; }
    header { position: sticky; top: 0; z-index: 40; width: 100%; background: #ffffff; border-bottom: 4px solid #000000; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
    nav { display: flex; align-items: center; justify-content: space-between; background: #ffffff; border: 4px solid #000000; border-radius: 0.75rem; padding: 0.75rem 1.25rem; max-width: 42rem; margin: 2rem auto 1rem; box-shadow: 6px 6px 0px 0px rgba(0,0,0,1); }
    .nav-logo { width: 2.5rem; height: 2.5rem; background: #000000; border-radius: 9999px; display: flex; align-items: center; justify-content: center; }
    .nav-logo-inner { width: 1.5rem; height: 1.5rem; background: #ffffff; border-radius: 9999px; }
    .nav-links { display: none; align-items: center; gap: 1.5rem; flex: 1; justify-content: center; }
    @media (min-width: 768px) { .nav-links { display: flex; } }
    .nav-links a { font-size: 1.125rem; font-weight: 700; color: #000000; text-decoration: none; transition: opacity 0.3s; }
    .nav-links a:hover { opacity: 0.7; }
    .nav-button { background: #000000; color: #ffffff; border: none; border-radius: 0.25rem; padding: 0 1.25rem; height: 3rem; min-width: 3rem; cursor: pointer; }
    section { padding: 4rem 0; }
    @media (min-width: 768px) { section { padding: 6rem 0; } }
    h1 { font-size: 2.625rem; line-height: 3.125rem; font-weight: 700; color: #000000; }
    @media (min-width: 768px) { h1 { font-size: 4.5rem; line-height: 5.3125rem; } }
    h2 { font-size: 1.875rem; font-weight: 700; color: #000000; margin-bottom: 1rem; }
    @media (min-width: 768px) { h2 { font-size: 2.25rem; } }
    @media (min-width: 1024px) { h2 { font-size: 3rem; } }
    h3 { font-size: 1.25rem; font-weight: 700; color: #0B0B0B; }
    @media (min-width: 768px) { h3 { font-size: 1.75rem; line-height: 2.5rem; } }
    .highlight-pink { background: #FF6B7A; color: #ffffff; padding: 0.25rem 0.75rem; display: inline-block; }
    .highlight-blue { background: #2F81F7; color: #ffffff; padding: 0.25rem 0.75rem; display: inline-block; }
    .highlight-yellow { background: #FFC224; color: #000000; padding: 0.25rem 0.75rem; display: inline-block; }
    .highlight-purple { background: #6366F1; color: #ffffff; padding: 0.25rem 0.75rem; display: inline-block; }
    .highlight-red { background: #FF4A60; color: #ffffff; padding: 0.25rem 0.75rem; display: inline-block; }
    .btn { display: inline-flex; align-items: center; justify-content: center; padding: 1.375rem 2rem; font-size: 1rem; font-weight: 600; border-radius: 0.5rem; text-decoration: none; transition: all 0.3s; border: none; cursor: pointer; }
    @media (min-width: 768px) { .btn { padding: 1.375rem 3.875rem; font-size: 1.125rem; } }
    .btn-black { background: #0B0B0B; color: #ffffff; }
    .btn-black:hover { background: rgba(0,0,0,0.9); }
    .btn-outline { background: #ffffff; border: 3px solid #000000; color: #000000; }
    .btn-outline:hover { background: #f9fafb; }
    .card { background: #ffffff; border: 4px solid #000000; border-radius: 1.5rem; padding: 1.5rem; min-height: 220px; }
    @media (min-width: 768px) { .card { padding: 2rem; min-height: 240px; } }
    .card-yellow { background: #FDB927; }
    .card-blue { background: #2F81F7; }
    .card-purple { background: #6366F1; }
    .card-pink { background: #FF6B7A; }
    .card-yellow-bg { background: #FFC224; }
    .shadow-bold { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
    .shadow-bold-sm { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
    .grid { display: grid; gap: 1.5rem; }
    @media (min-width: 768px) { .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1024px) { .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .bg-black { background: #000000; color: #ffffff; }
    .text-center { text-align: center; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .gap-3 { gap: 0.75rem; }
    .gap-4 { gap: 1rem; }
    .gap-6 { gap: 1.5rem; }
    .gap-12 { gap: 3rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mb-8 { margin-bottom: 2rem; }
    .mb-12 { margin-bottom: 3rem; }
    .p-6 { padding: 1.5rem; }
    @media (min-width: 768px) { .p-8 { padding: 2rem; } .p-12 { padding: 3rem; } }
    .rounded-full { border-radius: 9999px; }
    .rounded-3xl { border-radius: 1.5rem; }
    .border-2 { border-width: 2px; }
    .border-3 { border-width: 3px; }
    .border-4 { border-width: 4px; }
    .border-black { border-color: #000000; }
    .border-t-3 { border-top-width: 3px; }
    .w-12 { width: 3rem; }
    .h-12 { height: 3rem; }
    .w-14 { width: 3.5rem; }
    .h-14 { height: 3.5rem; }
    .hover-lift:hover { transform: translateY(-4px); transition: transform 0.3s; }
    .hover-shadow:hover { box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); transition: box-shadow 0.3s; }
    .avatar-container { position: relative; width: 100%; max-width: 28rem; aspect-ratio: 1; background: #FDB927; border: 4px solid #000000; border-radius: 1.5rem; overflow: hidden; box-shadow: 8px 8px 0px 0px rgba(0,0,0,1); }
    .avatar-container img { width: 100%; height: 100%; object-fit: cover; }
    .avatar-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3.75rem; font-weight: 700; color: #000000; }
    .social-icon { width: 3rem; height: 3rem; border: 2px solid #000000; border-radius: 9999px; display: flex; align-items: center; justify-content: center; transition: transform 0.3s; }
    .social-icon:hover { transform: scale(1.1); }
    .social-icon-black { background: #000000; color: #ffffff; }
    .social-icon-linkedin { background: #0077B5; color: #ffffff; }
    .space-y-6 > * + * { margin-top: 1.5rem; }
    .space-y-8 > * + * { margin-top: 2rem; }
    @media (max-width: 767px) { h1 { font-size: 2.625rem; line-height: 3.125rem; } .grid-cols-2 { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <div class="nav-logo"><div class="nav-logo-inner"></div></div>
        <div class="nav-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Portfolio</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <button class="nav-button">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      </nav>
    </div>
  </header>
  <main>
    <section id="hero" class="container" style="padding: 4rem 0;">
      ${heroElements}
      <div style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center;">
        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
          <h1>I'm <span class="highlight-pink">${escapeHtml(data.name || 'Your Name')}</span>, <span>a ${escapeHtml(data.professionalTitle || 'Professional')} from</span> <span class="highlight-blue">${escapeHtml(data.location || 'Location')}</span></h1>
          <p style="color: #000000; font-size: 1rem; font-weight: 500; line-height: 1.75rem; max-width: 36rem;">${escapeHtml(data.summary || 'A passionate professional with a drive to explore new technologies. I adapt quickly to new environments, allowing me to integrate seamlessly with diverse teams and projects.')}</p>
          ${(githubLink || linkedinLink) ? `
            <div class="flex gap-3" style="padding-top: 0.5rem;">
              ${githubLink ? `<a href="${escapeHtml(githubLink)}" target="_blank" rel="noopener noreferrer"><div class="social-icon social-icon-black"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></div></a>` : ''}
              ${linkedinLink ? `<a href="${escapeHtml(linkedinLink)}" target="_blank" rel="noopener noreferrer"><div class="social-icon social-icon-linkedin"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></div></a>` : ''}
            </div>
          ` : ''}
          <div class="flex" style="flex-wrap: wrap; gap: 1rem; padding-top: 1rem;">
            <a href="#contact" class="btn btn-black"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Get in touch</a>
            <a href="#projects" class="btn btn-outline"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>View portfolio</a>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="avatar-container">
            ${avatarSrc ? `<img src="${escapeHtml(avatarSrc)}" alt="${escapeHtml(data.name || 'Avatar')}" />` : `<div class="avatar-fallback">${escapeHtml((data.name || 'U').charAt(0).toUpperCase())}</div>`}
          </div>
        </div>
      </div>
    </section>
    ${data.experience && data.experience.length > 0 ? `
      <section id="experience" class="bg-black" style="padding: 4rem 0;">
        ${experienceElements}
        <div class="container">
          <div style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: start;">
            <div style="color: #ffffff; padding-top: 0;">
              <h2 style="color: #ffffff; margin-bottom: 1.5rem; font-size: 1.875rem; line-height: 1.3;">Take a look at my <span class="highlight-purple">past experience</span></h2>
            </div>
            <div class="space-y-6">
              ${data.experience.map((exp) => `
                <div class="card">
                  <div class="flex items-center justify-between" style="margin-bottom: 1rem; padding-top: 1.5rem;">
                    <div style="font-size: 0.875rem; font-weight: 700; color: #0B0B0B;">${escapeHtml(exp.duration)}</div>
                    <div class="rounded-full border-2 border-black shadow-bold-sm card-yellow" style="width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center;"><span style="font-size: 1.25rem; font-weight: 700;">${escapeHtml((exp.company || 'C').charAt(0).toUpperCase())}</span></div>
                  </div>
                  <div class="border-t-3 border-black" style="margin-bottom: 1rem;"></div>
                  <div>
                    <h3 style="margin-bottom: 0.5rem;">${escapeHtml(exp.title)} at ${escapeHtml(exp.company)}</h3>
                    <p style="color: #000000; font-size: 1rem; line-height: 1.75rem;">${escapeHtml(exp.description)}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    ` : ''}
    ${data.projects && data.projects.length > 0 ? `
      <section id="projects" class="container" style="padding: 4rem 0;">
        ${projectsElements}
        <div style="max-width: 1280px; margin: 0 auto;">
          <div class="text-center mb-12">
            <h2>Take a look at my <br /><span class="highlight-yellow">design portfolio</span></h2>
          </div>
          <div class="space-y-8">
            ${data.projects.map((project, index) => {
              const bgColors = ['#6366F1', '#2F81F7', '#FF6B7A', '#FFC224'];
              const bgColor = bgColors[index % bgColors.length];
              const tech = project.technologies ? project.technologies.split(',')[0].trim() : 'Project';
              return `
                <div class="card" style="border-width: 3px; border-radius: 2rem; overflow: hidden;" onmouseover="this.style.boxShadow='8px 8px 0px 0px rgba(0,0,0,1)'" onmouseout="this.style.boxShadow='none'">
                  <div style="display: grid; grid-template-columns: 1fr; gap: 0;">
                    <div style="padding: 1.5rem; background: #ffffff;">
                      <span style="display: inline-block; background: #000000; color: #ffffff; font-size: 0.75rem; font-weight: 600; padding: 0.375rem 1rem; border-radius: 9999px; margin-bottom: 1.5rem;">${escapeHtml(tech)}</span>
                      <h3 style="margin-bottom: 1rem;">${escapeHtml(project.title)}</h3>
                      <p style="color: #000000; font-size: 1rem; line-height: 1.875rem; font-weight: 500; margin-bottom: 2rem;">${escapeHtml(project.description)}</p>
                      <a href="#" style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: #0B0B0B; font-size: 0.875rem;">View case study<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></a>
                    </div>
                    <div style="background: ${bgColor}; min-height: 250px; display: flex; align-items: center; justify-content: center;">
                      <div style="color: #ffffff; font-size: 3.75rem; font-weight: 700;">${escapeHtml((project.title || 'P').charAt(0).toUpperCase())}</div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>
    ` : ''}
    ${data.skills && data.skills.length > 0 ? `
      <section id="skills" class="container" style="padding: 4rem 0;">
        ${skillsElements}
        <div style="max-width: 1280px; margin: 0 auto;">
          <div class="text-center mb-12">
            <h2 style="font-size: 2.25rem; line-height: 3.75rem;">My broad <span class="highlight-red">set of services</span></h2>
          </div>
          <div class="grid grid-cols-3 gap-6">
            ${data.skills.map((skill) => `
              <div class="card hover-lift hover-shadow" style="border-width: 3px; border-radius: 2rem; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem;">
                <h3 style="font-size: 1.75rem; line-height: 2.5rem; text-align: center; margin-bottom: 0.75rem;">${escapeHtml(skill)}</h3>
              </div>
            `).join('')}
            <div class="card-yellow-bg hover-lift shadow-bold" style="border-width: 3px; border-radius: 2rem; padding: 2rem; min-height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
              <div style="margin-bottom: 1rem;"><svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #000000;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
              <h3 style="font-size: 1.75rem; line-height: 2.5rem; margin-bottom: 1rem; color: #0B0B0B;">Get in touch</h3>
              <p style="font-size: 1.125rem; line-height: 1.875rem; font-weight: 500; color: #000000; margin-bottom: 1.5rem;">Looking for another service? Get in touch with me!</p>
              <a href="#contact" class="btn btn-black" style="width: 100%; max-width: 340px; height: 64px; border-radius: 1rem; padding: 1.5rem 3rem;"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Get in touch</a>
            </div>
          </div>
        </div>
      </section>
    ` : ''}
    ${data.education && data.education.length > 0 ? `
      <section id="education" class="container" style="padding: 4rem 0;">
        ${educationElements}
        <div style="max-width: 1280px; margin: 0 auto;">
          <div class="mb-12">
            <h2>My <span class="highlight-purple">Education</span></h2>
          </div>
          <div class="grid grid-cols-2 gap-6" style="max-width: 80rem;">
            ${data.education.map((edu) => `
              <div class="card" style="min-height: 280px;">
                <div class="flex items-center justify-between" style="margin-bottom: 1rem; padding-top: 1.5rem;">
                  <div style="font-size: 0.875rem; font-weight: 700; color: #0B0B0B;">${escapeHtml(edu.year)}</div>
                  <div class="rounded-full border-2 border-black shadow-bold-sm card-blue" style="width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center;"><span style="font-size: 1.25rem; font-weight: 700; color: #ffffff;">${escapeHtml((edu.institution || 'E').charAt(0).toUpperCase())}</span></div>
                </div>
                <div class="border-t-3 border-black" style="margin-bottom: 1rem;"></div>
                <div>
                  <h3 style="margin-bottom: 0.5rem;">${escapeHtml(edu.degree)}</h3>
                  <p style="color: #000000; font-size: 1rem; line-height: 2rem;">${escapeHtml(edu.institution)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    ` : ''}
    <section id="contact" class="container" style="padding: 4rem 0;">
      ${contactElements}
      <div style="max-width: 1280px; margin: 0 auto;">
        <div class="mb-12">
          <h2>Get <span class="highlight-pink">In Touch</span></h2>
          <p style="color: #000000; font-size: 1rem; font-weight: 500; line-height: 1.875rem; max-width: 42rem;">Feel free to reach out through any of these channels</p>
        </div>
        <div class="card" style="border-width: 3px; border-radius: 2rem; padding: 2rem; max-width: 42rem;">
          <div class="space-y-6">
            ${data.email ? `
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 card-purple border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #ffffff;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p style="font-weight: 600; font-size: 1.125rem; color: #000000;">Email</p>
                  <p style="font-size: 1rem; color: #000000;">${escapeHtml(data.email)}</p>
                </div>
              </div>
            ` : ''}
            ${data.phone ? `
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 card-blue border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #ffffff;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p style="font-weight: 600; font-size: 1.125rem; color: #000000;">Phone</p>
                  <p style="font-size: 1rem; color: #000000;">${escapeHtml(data.phone)}</p>
                </div>
              </div>
            ` : ''}
            ${data.location ? `
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 card-pink border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #ffffff;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p style="font-weight: 600; font-size: 1.125rem; color: #000000;">Location</p>
                  <p style="font-size: 1rem; color: #000000;">${escapeHtml(data.location)}</p>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`;
}

function generateTemplate3HTML(data: PortfolioData, customElements: CustomElement[] = []): string {
  const portfolioName = data.name || 'Portfolio';
  const githubLink = (data.social?.github || data.githubUrl || '').trim();
  const linkedinLink = (data.linkedinUrl || '').trim();
  const twitterLink = (data.social?.twitter || '').trim();
  const currentYear = new Date().getFullYear();
  const startYear = data.experience && data.experience.length > 0 
    ? data.experience[data.experience.length - 1]?.duration?.split('—')[0]?.trim() || currentYear.toString()
    : currentYear.toString();

  const aboutElements = getCustomElementsForSection(customElements, 'about').map(el => renderCustomElementHTML(el)).join('');
  const experienceElements = getCustomElementsForSection(customElements, 'experience').map(el => renderCustomElementHTML(el)).join('');
  const projectsElements = getCustomElementsForSection(customElements, 'projects').map(el => renderCustomElementHTML(el)).join('');
  const skillsElements = getCustomElementsForSection(customElements, 'skills').map(el => renderCustomElementHTML(el)).join('');
  const educationElements = getCustomElementsForSection(customElements, 'education').map(el => renderCustomElementHTML(el)).join('');
  const contactElements = getCustomElementsForSection(customElements, 'contact').map(el => renderCustomElementHTML(el)).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(portfolioName)} - Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root { --background: #ffffff; --foreground: #0a0a0a; --muted-foreground: #737373; --border: #e5e5e5; }
    body.dark { --background: #0a0a0a; --foreground: #fafafa; --muted-foreground: #a3a3a3; --border: #262626; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: var(--foreground); background: var(--background); transition: background-color 0.3s, color 0.3s; }
    .container { max-width: 56rem; margin: 0 auto; padding: 0 1.5rem; }
    @media (min-width: 640px) { .container { padding: 0 2rem; } }
    @media (min-width: 1024px) { .container { padding: 0 4rem; } }
    header { min-height: 70vh; display: flex; align-items: center; padding: 3rem 0; }
    h1 { font-size: 3rem; font-weight: 300; letter-spacing: -0.02em; line-height: 1.1; }
    @media (min-width: 640px) { h1 { font-size: 3.75rem; } }
    @media (min-width: 1024px) { h1 { font-size: 4.5rem; } }
    h2 { font-size: 1.875rem; font-weight: 300; }
    @media (min-width: 640px) { h2 { font-size: 2.25rem; } }
    h3 { font-size: 1.125rem; font-weight: 500; }
    @media (min-width: 640px) { h3 { font-size: 1.25rem; } }
    section { padding: 3rem 0; }
    @media (min-width: 640px) { section { padding: 4rem 0; } }
    .text-muted { color: var(--muted-foreground); }
    .border-bottom { border-bottom: 1px solid var(--border); opacity: 0.5; }
    .border-bottom:hover { opacity: 1; transition: opacity 0.5s; }
    .grid { display: grid; gap: 1rem; }
    @media (min-width: 1024px) { .grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); } .grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); } .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    .gap-12 { gap: 3rem; }
    @media (min-width: 640px) { .gap-16 { gap: 4rem; } }
    .space-y-8 > * + * { margin-top: 2rem; }
    @media (min-width: 640px) { .space-y-12 > * + * { margin-top: 3rem; } }
    .badge { display: inline-flex; padding: 0.25rem 0.75rem; font-size: 0.75rem; border: 1px solid var(--border); border-radius: 9999px; transition: border-color 0.3s; }
    .badge:hover { border-color: var(--muted-foreground); opacity: 0.5; }
    a { color: var(--foreground); text-decoration: none; transition: color 0.3s; }
    a:hover { color: var(--muted-foreground); }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .gap-2 { gap: 0.5rem; }
    .gap-3 { gap: 0.75rem; }
    .gap-4 { gap: 1rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mt-8 { margin-top: 2rem; }
    @media (min-width: 1024px) { .mt-0 { margin-top: 0; } }
    .font-mono { font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace; }
    .text-sm { font-size: 0.875rem; }
    .text-xs { font-size: 0.75rem; }
    .text-lg { font-size: 1.125rem; }
    @media (min-width: 640px) { .text-xl { font-size: 1.25rem; } }
    .leading-relaxed { line-height: 1.625; }
    .max-w-md { max-width: 28rem; }
    .max-w-lg { max-width: 32rem; }
    .p-6 { padding: 1.5rem; }
    @media (min-width: 640px) { .p-8 { padding: 2rem; } }
    .border { border: 1px solid var(--border); }
    .rounded-lg { border-radius: 0.5rem; }
    .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
    .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .w-2 { width: 0.5rem; }
    .h-2 { height: 0.5rem; }
    .w-4 { width: 1rem; }
    .h-4 { height: 1rem; }
    .w-5 { width: 1.25rem; }
    .h-5 { height: 1.25rem; }
    .rounded-full { border-radius: 9999px; }
    .bg-green-500 { background-color: #22c55e; }
    footer { padding: 3rem 0; border-top: 1px solid var(--border); }
    @media (min-width: 640px) { footer { padding: 4rem 0; } }
    @media (min-width: 1024px) { .flex-row { flex-direction: row; } .justify-between { justify-content: space-between; } }
  </style>
</head>
<body class="dark">
  <div class="container">
    <header id="about">
      ${aboutElements}
      <div class="grid grid-cols-5 gap-12" style="gap: 4rem;">
        <div style="grid-column: span 3;">
          <div style="margin-bottom: 1.5rem;">
            <div class="text-sm text-muted font-mono" style="letter-spacing: 0.05em; margin-bottom: 0.5rem;">PORTFOLIO / ${currentYear}</div>
            <h1>${escapeHtml((data.name?.split(' ')[0] || 'Your'))}<br><span class="text-muted">${escapeHtml((data.name?.split(' ').slice(1).join(' ') || 'Name'))}</span></h1>
          </div>
          <div style="margin-bottom: 1.5rem; max-width: 28rem;">
            <p class="text-lg text-muted leading-relaxed" style="margin-bottom: 1.5rem;">${escapeHtml(data.summary || 'A passionate professional with a drive to explore new technologies. I adapt quickly to new environments, allowing me to integrate seamlessly with diverse teams and projects.')}</p>
            <div class="flex items-center gap-3 text-sm text-muted" style="flex-wrap: wrap;">
              <div class="flex items-center gap-2"><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>Available for work</div>
              ${data.location ? `<div class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>${escapeHtml(data.location)}</div>` : ''}
            </div>
          </div>
        </div>
        <div style="grid-column: span 2; display: flex; flex-direction: column; justify-content: flex-end; margin-top: 2rem;">
          ${data.professionalTitle ? `
            <div style="margin-bottom: 1.5rem;">
              <div class="text-sm text-muted font-mono" style="margin-bottom: 1rem;">CURRENTLY</div>
              <div><div>${escapeHtml(data.professionalTitle)}</div>
              ${data.experience && data.experience.length > 0 ? `<div class="text-muted">@ ${escapeHtml(data.experience[0].company)}</div><div class="text-xs text-muted">${escapeHtml(data.experience[0].duration || 'Present')}</div>` : ''}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </header>
    <section id="experience" style="padding: 3rem 0;">
      ${experienceElements}
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <h2>Work Experience</h2>
        <div class="text-sm text-muted font-mono">${startYear} — ${currentYear}</div>
      </div>
      <div style="margin-top: 2rem;">
        ${data.experience && data.experience.length > 0 ? data.experience.map((exp) => {
          const year = exp.duration?.split('—')[0]?.trim() || currentYear.toString();
          return `<div class="border-bottom" style="padding: 1.5rem 0; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1rem;">
            <div style="grid-column: span 2;"><div class="text-xl text-muted" style="font-weight: 300;">${escapeHtml(year)}</div></div>
            <div style="grid-column: span 6;">
              <div style="margin-bottom: 0.75rem;"><h3>${escapeHtml(exp.title)}</h3><div class="text-muted">${escapeHtml(exp.company)}</div></div>
              ${exp.description ? `<p class="text-muted leading-relaxed" style="max-width: 32rem;">${escapeHtml(exp.description)}</p>` : ''}
            </div>
          </div>`;
        }).join('') : '<p class="text-muted">No experience added yet</p>'}
      </div>
    </section>
    <section id="projects" style="padding: 3rem 0;">
      ${projectsElements}
      <h2 style="margin-bottom: 2rem;">Selected Projects</h2>
      <div class="grid grid-cols-2" style="gap: 1.5rem;">
        ${data.projects && data.projects.length > 0 ? data.projects.map((project) => {
          const tech = project.technologies ? project.technologies.split(',').map(t => t.trim()) : [];
          return `<article class="border rounded-lg p-6" style="transition: all 0.5s;">
            <div style="margin-bottom: 1rem;"><h3 style="margin-bottom: 0.5rem;">${escapeHtml(project.title)}</h3><p class="text-muted leading-relaxed">${escapeHtml(project.description)}</p></div>
            ${tech.length > 0 ? `<div class="flex flex-wrap gap-2" style="margin-top: 0.5rem;">${tech.map(t => `<span class="badge">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
          </article>`;
        }).join('') : '<p class="text-muted">No projects added yet</p>'}
      </div>
    </section>
    <section id="skills" style="padding: 3rem 0;">
      ${skillsElements}
      <h2 style="margin-bottom: 2rem;">Technical Skills</h2>
      <div class="flex flex-wrap gap-3">
        ${data.skills && data.skills.length > 0 ? data.skills.map(skill => `<span class="border rounded-full" style="padding: 0.5rem 1rem; font-size: 0.875rem;">${escapeHtml(skill)}</span>`).join('') : '<p class="text-muted">No skills added yet</p>'}
      </div>
    </section>
    <section id="education" style="padding: 3rem 0;">
      ${educationElements}
      <h2 style="margin-bottom: 2rem;">Education</h2>
      <div style="margin-top: 2rem;">
        ${data.education && data.education.length > 0 ? data.education.map((edu) => `
          <div class="border-bottom" style="padding: 1.5rem 0; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1rem;">
            <div style="grid-column: span 2;"><div class="text-xl text-muted" style="font-weight: 300;">${escapeHtml(edu.year)}</div></div>
            <div style="grid-column: span 10;"><h3>${escapeHtml(edu.degree)}</h3><div class="text-muted">${escapeHtml(edu.institution)}</div></div>
          </div>
        `).join('') : '<p class="text-muted">No education added yet</p>'}
      </div>
    </section>
    <section id="contact" style="padding: 3rem 0;">
      ${contactElements}
      <div class="grid grid-cols-2" style="gap: 3rem;">
        <div>
          <h2 style="margin-bottom: 1.5rem;">Let's Connect</h2>
          <div style="margin-bottom: 1.5rem;"><p class="text-lg text-muted leading-relaxed">Always interested in new opportunities, collaborations, and conversations about technology and design.</p></div>
          <div style="margin-top: 1rem;">
            ${data.email ? `<a href="mailto:${escapeHtml(data.email)}" class="flex items-center gap-3" style="margin-bottom: 1rem;"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg><span>${escapeHtml(data.email)}</span></a>` : ''}
            ${data.phone ? `<a href="tel:${escapeHtml(data.phone)}" class="flex items-center gap-3"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg><span>${escapeHtml(data.phone)}</span></a>` : ''}
          </div>
        </div>
        <div>
          <div class="text-sm text-muted font-mono" style="margin-bottom: 1.5rem;">ELSEWHERE</div>
          <div class="grid grid-cols-2" style="gap: 1rem;">
            ${githubLink ? `<a href="${escapeHtml(githubLink)}" target="_blank" rel="noopener noreferrer" class="border rounded-lg p-4"><div class="flex items-center gap-2" style="margin-bottom: 0.5rem;"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>GitHub</div><div class="text-sm text-muted">${escapeHtml(githubLink.replace('https://github.com/', '@'))}</div></a>` : ''}
            ${linkedinLink ? `<a href="${escapeHtml(linkedinLink)}" target="_blank" rel="noopener noreferrer" class="border rounded-lg p-4"><div class="flex items-center gap-2" style="margin-bottom: 0.5rem;"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn</div><div class="text-sm text-muted">${escapeHtml(linkedinLink.replace('https://www.linkedin.com/in/', '').replace('/', ''))}</div></a>` : ''}
            ${twitterLink ? `<a href="${escapeHtml(twitterLink)}" target="_blank" rel="noopener noreferrer" class="border rounded-lg p-4"><div class="flex items-center gap-2" style="margin-bottom: 0.5rem;"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>Twitter</div><div class="text-sm text-muted">${escapeHtml(twitterLink.replace('https://twitter.com/', '@').replace('https://x.com/', '@'))}</div></a>` : ''}
          </div>
        </div>
      </div>
    </section>
    <footer style="padding: 3rem 0; border-top: 1px solid var(--border);">
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="text-sm text-muted">© ${currentYear} ${escapeHtml(data.name || 'Your Name')}. All rights reserved.</div>
        <div class="text-xs text-muted">Built with ResuFolio</div>
      </div>
    </footer>
  </div>
</body>
</html>`;
}

