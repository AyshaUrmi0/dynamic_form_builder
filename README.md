# 🚀 Dynamic Form Builder

A powerful, drag-and-drop form builder built with Next.js 15, React 19, TypeScript and dnd kit. Create beautiful, responsive forms with ease using an intuitive visual interface.

## 🌐 Live Demo

**🔗 [View Live Application](https://musical-stardust-60e15c.netlify.app/)**

## ✨ Features

### 🎨 **Visual Form Builder**
- **Drag & Drop Interface** - Intuitive field placement and reordering
- **Real-time Preview** - See your form as you build it
- **Responsive Design** - Works perfectly on all devices
- **Column Width Control** - Flexible field layouts (25%, 50%, 100%, etc.)

### 📝 **Field Types**
- **Text Input** - Single-line text fields
- **Email Input** - Email validation included
- **Date Picker** - Native date selection
- **Time Picker** - Time input fields
- **Select Dropdown** - Customizable options
- **Checkbox Group** - Multiple selection options
- **Radio Buttons** - Single selection options
- **File Upload** - File input with styling
- **Acceptance Field** - Terms and conditions with checkbox

### ⚙️ **Field Settings**
- **Label** - Custom field labels
- **Name** - Field identifiers for form submission
- **Placeholder** - Hint text for users
- **Required Fields** - Validation toggle with visual indicators
- **Options Management** - Easy key=value editing for select/checkbox/radio fields
- **Content Editor** - Rich content for acceptance fields

### 🔧 **Form Management**
- **Schema Export/Import** - Save and load form configurations
- **Field Duplication** - Quick field copying
- **Field Deletion** - Remove unwanted fields
- **Form Reset** - Restore to original schema
- **Local Storage** - Automatic form persistence

### 🎯 **Advanced Features**
- **TypeScript** - Full type safety throughout
- **Modern React** - Built with React 19 and Next.js 15
- **Drag & Drop** - Powered by @dnd-kit
- **Static Export** - Deploy anywhere with static hosting
- **SEO Optimized** - Meta tags and structured data

## 🛠️ **Tech Stack**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Deployment**: Netlify (Static Export)
- **Build Tool**: Turbopack

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dynamic_form_builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Build the application
npm run build

# The static files will be in the 'out' directory
# Upload the 'out' folder to any static hosting service
```

## 📁 **Project Structure**

```
dynamic_form_builder/
├── app/                          # Next.js App Router
│   ├── components/               # Main application components
│   │   ├── FormBuilder.tsx      # Main form builder component
│   │   ├── FormPreview.tsx      # Form preview component
│   │   ├── PreviewField.tsx     # Individual field preview
│   │   ├── DragHandler.tsx      # Drag and drop logic
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useFormBuilder.ts
│   │   │   └── useFormPreview.ts
│   │   └── utils/               # Utility functions
│   │       └── schemaUtils.ts
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── component/                    # Reusable components
│   ├── FormCanvas/              # Form canvas components
│   │   ├── FormCanvas.tsx       # Main canvas
│   │   ├── DraggableFormField.tsx
│   │   ├── FieldRenderer.tsx
│   │   ├── FieldActions.tsx
│   │   ├── EmptyState.tsx
│   │   └── types.ts
│   ├── Navbar.tsx               # Navigation bar
│   ├── SidebarLeft.tsx          # Field palette
│   └── SidebarRight.tsx         # Field settings
├── data/                        # Static data
│   └── formSchema.json          # Default form schema
└── public/                      # Static assets
```

## 🎮 **How to Use**

### 1. **Building a Form**
- Drag field types from the left sidebar to the canvas
- Fields will appear in the form builder
- Use drag handles (⋮⋮) to reorder fields

### 2. **Configuring Fields**
- Click the **Settings** button (⚙️) on any field
- Edit field properties in the right sidebar:
  - **Label**: What users see
  - **Name**: Field identifier
  - **Placeholder**: Hint text
  - **Required**: Validation toggle
  - **Options**: For select/checkbox/radio fields

### 3. **Previewing Forms**
- Click **Preview** in the navbar to see the live form
- Test form functionality and validation
- Switch back to **Builder** to continue editing

### 4. **Managing Forms**
- **Export**: Download form schema as JSON
- **Import**: Upload existing form schemas
- **Reset**: Restore to original template

## 🔧 **Configuration**

### Field Options Format
For select, checkbox, and radio fields, use the key=value format:
```
Display Text=value
Option 1=option1
Yes=yes
No=no
```

### Column Widths
Available column widths:
- **25%** - Quarter width (4 fields per row)
- **33%** - Third width (3 fields per row)  
- **50%** - Half width (2 fields per row)
- **66%** - Two-thirds width
- **75%** - Three-quarters width
- **100%** - Full width (1 field per row)

## 🚀 **Deployment**

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify
3. Your form builder is live!



## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request





## 📞 **Support**

If you have any questions or need help:
- Open an issue on GitHub
- Check the live demo: [https://musical-stardust-60e15c.netlify.app/](https://musical-stardust-60e15c.netlify.app/)



