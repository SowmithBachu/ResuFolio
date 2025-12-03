# Portfolio Builder - Resume to Portfolio Converter

Transform your PDF resume into a stunning, professional portfolio website with AI-powered parsing. Upload your resume and instantly get a beautiful, editable portfolio that you can customize and share.

## ✨ Features

### Core Functionality
- 📄 **PDF Resume Upload** - Upload your resume in PDF format
- 🤖 **AI-Powered Parsing** - Uses Google Gemini AI to extract structured information from your resume
- 🎨 **Automatic Portfolio Generation** - Instantly creates a modern, responsive portfolio website
- ✏️ **Live Editing** - Split-screen workspace to edit and preview your portfolio in real-time
- 🔗 **Shareable Links** - Generate unique shareable URLs for your portfolio
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
- 🎨 **Modern Design** - Clean, professional aesthetic with smooth animations
- 📐 **Resizable Panels** - Adjustable split-screen workspace
- ✨ **Smooth Interactions** - Hover effects and transitions throughout

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd resume
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**
```bash
npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

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
   - All changes are saved automatically

4. **Share Your Portfolio**
   - Click "Share Link" to copy your portfolio URL
   - Share the link with anyone - it's publicly viewable
   - The portfolio link is read-only for viewers

### Portfolio Routes

- `/` - Landing page
- `/upload` - Upload and parse resume
- `/upload/[id]` - Edit portfolio workspace
- `/portfolio/[id]` - View shareable portfolio (read-only)

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

### Shareable Portfolio
- Each portfolio gets a unique ID
- Shareable URL format: `/portfolio/[unique-id]`
- Publicly accessible (read-only)
- No login required for viewers

## 📝 Notes

- The application processes PDFs by converting them to images and sending them to Gemini for OCR and structured extraction
- Ensure your PDFs are clear and readable for best parsing results
- Portfolio data is stored in browser localStorage (client-side only)
- The Gemini API key is required for the application to function
- All editing happens client-side with real-time preview

## 🔮 Future Enhancements

- Database integration for persistent storage
- User authentication and accounts
- Payment integration for premium features
- Custom domain support
- Analytics dashboard
- Multiple portfolio templates
- Export portfolio as static site

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the project owner.
