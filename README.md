# Portfolio Builder - Resume to Portfolio Converter

Transform your PDF resume into a stunning, professional portfolio website with AI-powered parsing. Upload your resume and instantly get a beautiful, editable portfolio that you can customize and share.

## ✨ Features

### Core Functionality
- 📄 **PDF Resume Upload** - Upload your resume in PDF format
- 🤖 **AI-Powered Parsing** - Uses Google Gemini AI to extract structured information from your resume
- 🎨 **Automatic Portfolio Generation** - Instantly creates a modern, responsive portfolio website
- ✏️ **Live Editing** - Split-screen workspace to edit and preview your portfolio in real-time
- 🧩 **UI Customization Workspace** - Drag-and-drop minimal UI elements (timelines, stats, achievements, progress bars) onto your portfolio
- 🔗 **Shareable Links** - Generate unique shareable URLs for your portfolio
- 💾 **Downloadable Source Code** - Export your portfolio as a standalone HTML file with built-in dark/light mode toggle
- 📱 **Responsive Design** - Beautiful portfolio that works on all devices

### Portfolio Sections
- 👤 **Hero Section** - Professional header with name, title, and summary
- 📝 **About Me** - Professional summary and skills overview
- 💼 **Work Experience** - Timeline view of your work history
- 📁 **Projects** - Showcase your projects with descriptions and technologies
- ⚡ **Technical Skills** - Grid layout with rounded borders for skills
- 🎓 **Education** - Academic background and achievements
- 📧 **Contact Information** - Contact details with social media links

### Editing Features
- ➕ **Add New Items** - Easily add new experience, projects, education entries, and skills
- 🗑️ **Delete Items** - Remove unwanted sections or entries
- 📝 **Real-time Updates** - See changes instantly in the preview
- 🎯 **Intuitive Interface** - User-friendly forms with collapsible sections

### Modern UI/UX
- 🌓 **Dark Mode Support** - Automatic dark mode based on system preferences
- 🎨 **Modern Design** - Clean, professional aesthetic with smooth animations and minimal, tidy UI
- 📐 **Resizable Panels** - Adjustable split-screen workspace with a styled draggable divider
- ✨ **Smooth Interactions** - Hover effects and transitions throughout

## 📖 Usage

### Creating Your Portfolio

1. **Upload Resume**
   - Click "Upload Resume (PDF)" on the homepage
   - Select your PDF resume file
   - Click "Proceed" to start processing

2. **Review & Edit**
   - After parsing, you'll be redirected to the editing workspace
   - Edit any information on the left panel
   - See live preview on the right panel
   - Use the resizable divider to adjust panel sizes

3. **Add Content**
   - Click "Add New" buttons in any section to add more items
   - Click the trash icon to remove items
   - All changes are saved automatically (Supabase + localStorage fallback)

4. **Customize UI**
   - From the edit workspace, click **Customize UI**
   - Drag and drop UI elements from the left palette onto sections of your portfolio
   - Edit each element’s content (timeline items, stats, achievements, progress bars, etc.)

5. **Share Your Portfolio**
   - Click "Share Link" to copy your portfolio URL
   - Share the link with anyone - it's publicly viewable
   - The portfolio link is read-only for viewers

6. **Download Source Code**
   - Click **Download Source** in the header (Edit or Customize workspace, or share page)
   - Opens a standalone HTML file with your current portfolio and custom UI elements
   - Includes a dark/light mode toggle and can be hosted on any static hosting provider

### Portfolio Routes

- `/` - Landing page
- `/upload` - Upload and parse resume
- `/upload/[id]` - Edit portfolio workspace (live editor)
- `/customize/[id]` - UI customization workspace with drag-and-drop elements
- `/portfolio/[id]` - View shareable portfolio (read-only, with download button)

## 🛠️ Technology Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **Google Gemini AI** - AI-powered resume parsing and extraction
- **PDF.js** - Client-side PDF processing
- **Canvas API** - PDF to image conversion
- **Lucide React** - Beautiful icon library
- **React Hooks** - State management and effects

## 📁 Project Structure

```
resume/
├── app/
│   ├── api/
│   │   └── parse-resume/     # API route for resume parsing
│   ├── components/
│   │   ├── LandingPage.tsx   # Homepage landing page
│   │   ├── PortfolioPreview.tsx  # Portfolio display component
│   │   └── ResumePreview.tsx     # Resume editing form
│   ├── portfolio/
│   │   └── [id]/             # Shareable portfolio route
│   ├── upload/
│   │   ├── page.tsx          # Upload page
│   │   └── [id]/
│   │       └── page.tsx      # Editing workspace
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/                    # Static assets
└── README.md
```

## 🎯 Key Features Explained

### AI Resume Parsing
The application uses Google's Gemini AI to intelligently extract:
- Personal information (name, email, location, professional title)
- Professional summary
- Work experience (top 2-3 positions)
- Education (highest degree)
- Skills (most relevant 8-12 skills)
- Projects (top 2-4 projects with technologies)

### Real-time Editing
- Split-screen workspace with resizable panels
- Left panel: Editing forms with collapsible sections
- Right panel: Live portfolio preview
- Changes sync automatically and appear instantly

### UI Customization & Download
- Separate `/customize/[id]` workspace for drag-and-drop UI elements
- Edit the content of each custom element (steps, timelines, stats, achievements, progress bars)
- Download a fully self-contained HTML file with dark/light mode toggle

### Shareable Portfolio
- Each portfolio gets a unique ID stored in Supabase
- Shareable URL format: `/portfolio/[unique-id]`
- Share links built from `NEXT_PUBLIC_APP_BASE_URL` in production (fallback to browser origin in development)
- Publicly accessible (read-only) with a download button

## 📝 Notes

- The application processes PDFs by converting them to images and sending them to Gemini for OCR and structured extraction
- Ensure your PDFs are clear and readable for best parsing results
- Portfolio data is persisted in **Supabase** (per authenticated user) with **localStorage** as a fallback/cache
- The Gemini API key is required for the application to function
- All editing and UI customization happen client-side with real-time preview; saving and sharing use API routes backed by Supabase

## 🔮 Future Enhancements

- Payment integration for premium features
- Custom domain support
- Analytics dashboard
- Multiple portfolio templates

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the project owner.
