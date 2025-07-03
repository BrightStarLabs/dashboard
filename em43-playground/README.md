# 🧠 EM43 Playground - Emergent Models Research Platform

A professional web application for experimenting with emergent AI models. Features a beautiful landing page, authentication system, and modern dashboard for managing machine learning experiments.

## 🚀 Quick Start

```bash
git clone <this repo>
cd em43-playground/em43-playground
docker compose -f docker/docker-compose.yml up --build
```

**🌐 Access the Application:**
- **Landing Page:** http://localhost:5173
- **Backend API:** http://localhost:5000

## 🎯 How to Use

### 1. **Landing Page** (`/`)
- Professional introduction to emergent models
- Learn about the platform capabilities
- Click "Get Started" or "Sign In" to proceed

### 2. **Login** (`/login`)
- **Demo Mode:** Use any email and password to sign in
- Example: `demo@example.com` / `password123`
- Automatically redirects to the dashboard after login

### 3. **Dashboard** (`/app`)
- View experiment statistics and metrics
- Create new experiments with the "New Experiment" button
- Browse and access your existing experiments
- Track performance across all your models

### 4. **Experiment Details** (`/app/tasks/:id`)
- Upload model files via drag & drop or file browser
- Add submission notes and track iterations
- View leaderboard with ranked results
- Monitor fitness scores and performance metrics

## ✨ Key Features

### 🎨 **Professional UI/UX**
- Modern gradient landing page with glassmorphism effects
- Responsive design that works on all devices
- Smooth animations and micro-interactions
- Professional typography and spacing

### 🔐 **Authentication System**
- Fake authentication for demo purposes
- Protected routes requiring login
- User session management
- Logout functionality

### 📊 **Enhanced Dashboard**
- Real-time experiment statistics
- Visual status indicators
- Improved task creation forms
- Better organization and filtering

### 📁 **Advanced File Handling**
- Drag & drop model upload
- JSON file validation
- Visual upload feedback
- File management interface

### 🏆 **Professional Leaderboard**
- Ranked submission display
- Detailed fitness metrics
- Submission timestamps and notes
- Performance tracking over time

## 🛠 Technology Stack

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Heroicons** for consistent iconography

### **Backend**
- **FastAPI** with Python
- **Dummy validation** (random fitness scores)
- **CORS enabled** for development
- **RESTful API** design

### **Infrastructure**
- **Docker & Docker Compose** for containerization
- **Hot reload** for development
- **Optimized builds** with layer caching

## 📁 Project Structure

```
em43-playground/
├── README.md
└── docker/
    ├── docker-compose.yml          # Container orchestration
    ├── backend/                    # FastAPI application
    │   ├── Dockerfile
    │   ├── requirements.txt
    │   └── app/
    │       ├── __init__.py
    │       └── main.py             # API endpoints
    └── frontend/                   # React application
        ├── Dockerfile
        ├── package.json            # Dependencies
        ├── public/
        └── src/
            ├── main.tsx            # App entry point
            ├── index.css           # Global styles
            ├── api.ts              # API client
            ├── contexts/
            │   └── AuthContext.tsx # Authentication
            ├── components/
            │   └── AppLayout.tsx   # Main layout
            └── pages/
                ├── LandingPage.tsx # Homepage
                ├── LoginPage.tsx   # Authentication
                ├── Dashboard.tsx   # Main dashboard
                └── TaskDetail.tsx  # Experiment details
```

## 🔧 Development

### **Building Individual Services**
```bash
# Build only frontend
docker compose -f docker/docker-compose.yml build frontend

# Build only backend
docker compose -f docker/docker-compose.yml build backend
```

### **Running in Development Mode**
```bash
# Start with logs
docker compose -f docker/docker-compose.yml up --build

# Start in background
docker compose -f docker/docker-compose.yml up --build -d

# Stop services
docker compose -f docker/docker-compose.yml down
```

### **Accessing Logs**
```bash
# View all logs
docker compose -f docker/docker-compose.yml logs

# View specific service logs
docker compose -f docker/docker-compose.yml logs frontend
docker compose -f docker/docker-compose.yml logs backend
```

## 🎮 Demo Data

The application includes **dummy validation** - the backend assigns random fitness scores (0-1) to all model submissions. This allows you to focus on the UI/UX and workflow without implementing actual ML validation.

### **Sample Workflow:**
1. Visit http://localhost:5173
2. Click "Get Started" → Login with any credentials
3. Create a new experiment with a descriptive title
4. Upload a JSON file (any JSON file works for demo)
5. Add notes about your submission
6. View results in the leaderboard

## 🚀 Production Deployment

For production deployment, you'll want to:

1. **Replace dummy validation** with real ML model evaluation
2. **Add real authentication** (OAuth, JWT, etc.)
3. **Add database persistence** (PostgreSQL, MongoDB, etc.)
4. **Configure environment variables** for different stages
5. **Set up proper logging** and monitoring
6. **Add API rate limiting** and security headers

## 📝 License

This project is for educational and research purposes. Feel free to modify and extend for your emergent AI research needs.

---

**🧠 Built for Emergent AI Research** - Advancing the future of adaptive intelligent systems.
