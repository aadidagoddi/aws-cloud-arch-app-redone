## Component Structure Overview

### Authentication Flow

- `Login.jsx` - Login form
- `Register.jsx` - Registration form
- `AWSLinking.jsx` - AWS account connection interface

### Dashboard

- `Dashboard.jsx` - Main project overview
- `ProjectCard.jsx` - Individual project display with dynamic cloud icons
- `ProjectIcon.jsx` - SVG cloud with status-based rendering (empty, construction, colored, MVP)
- `UserSettings.jsx` - User preferences and AWS account management

### Project Workspace

- `Workspace.jsx` - Main workspace container
- `AIChat.jsx` - Left sidebar chat with Claude for architecture questions
- `Architecture3DView.jsx` - Three.js 3D visualization of AWS architecture
- `ModuleEditor.jsx` - Individual AWS service configuration
- `SettingsPanel.jsx` - Right sidebar for service settings
- `TestCaseRunner.jsx` - Test case creation and execution
- `SimulationControls.jsx` - Animation controls for data flow

### Architecture Components

- `AWSServiceNode.jsx` - 3D representations of AWS services (Lambda, S3, etc.)
- `DataFlowPipe.jsx` - Animated pipes showing data movement
- `ModuleWarning.jsx` - Caution tape/siren lights for modules needing updates
- `SecurityVisualization.jsx` - Visual indicators for security zones

### Code Editor

- `CodeEditor.jsx` - Monaco editor integration for Lambda functions
- `CodePreview.jsx` - Quick preview in settings panel

## Services Layer

### api.js

Handles all API calls to backend for user management, project CRUD

### aws-service.js

AWS SDK integration for actual AWS account interaction

### claude-service.js

Anthropic API integration for AI-powered architecture generation and chat

### project-service.js

Project state management, architecture generation, module tracking

## State Management (Zustand)

### authStore.js

- User authentication state
- AWS account linking status
- User preferences

### projectStore.js

- Current projects list
- Project status (new, in-progress, MVP, running)
- Project metadata

### architectureStore.js

- Current architecture graph
- Module states
- Test cases
- Simulation state

## Installation Steps

```bash
# Initialize project
npm create vite@latest aws-cloud-architect -- --template react
cd aws-cloud-architect

# Install dependencies
npm install react-router-dom zustand three @react-three/fiber @react-three/drei
npm install aws-sdk monaco-editor @monaco-editor/react lucide-react framer-motion

# Install Electron dependencies
npm install -D electron electron-builder concurrently wait-on

# Create folder structure
mkdir -p electron src/components/{Auth,Dashboard,ProjectWorkspace,Architecture,CodeEditor}
mkdir -p src/{services,hooks,store,utils,assets}
```

## Development Workflow

1. Start development server: `npm run electron:dev`
2. Build for production: `npm run electron:build`
3. The app will open with the login screen
4. After AWS linking, users see the dashboard with project clouds
5. Creating a new project opens the AI chat for requirements gathering
6. Architecture is generated and displayed in 3D
7. Users can edit modules, run simulations, and refine with AI assistance
