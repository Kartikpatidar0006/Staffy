# Staffy

A lightweight and modern Human Resource Management System built with React and FastAPI.

![Staffy](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.128-green) ![Python](https://img.shields.io/badge/Python-3.11+-yellow) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4)

## Project Overview

Staffy is a modern web-based application that allows HR administrators to efficiently manage their workforce. Built with a beautiful, responsive UI and a robust backend, it simplifies employee management and attendance tracking.

### Core Features

- **👥 Employee Management** – Add, view, update, and delete employee records with department organization
- **📅 Attendance Tracking** – Mark daily attendance (Present/Absent) and view comprehensive records
- **📊 Dashboard** – Real-time overview with attendance rates, employee statistics, and department breakdown
- **🔍 Advanced Search & Filtering** – Find employees by name, ID, email, or department instantly
- **🎨 Modern UI/UX** – Beautiful, responsive design with dark mode support
- **📱 Mobile-Responsive** – Works seamlessly on desktop, tablet, and mobile devices

### Premium Features Implemented

- **Department-based color coding** for better visual organization
- **Attendance rate tracking** with percentage calculations per employee
- **Real-time stats** with trend indicators on dashboard
- **Advanced table** with sortable columns for easy data management
- **Smart filtering** by date ranges and department categories
- **Beautiful animations** and smooth transitions throughout the app
- **Dark mode support** for comfortable usage in any lighting condition
- **Responsive design** that adapts to all screen sizes

### Pages Overview

#### 📊 Dashboard
- Real-time statistics with employee counts and attendance metrics
- Attendance rate percentage calculations
- Top employee summary table with individual attendance records
- Trend indicators showing performance changes

#### 👥 Employees
- Complete employee directory with search and filter capabilities
- Add, edit, and delete employee records
- Department-based filtering with visual color coding
- Responsive table view with sortable columns
- Bulk operations support

#### 📅 Attendance
- Mark daily attendance (Present/Absent) for employees
- View attendance history by employee or date
- Date-based filtering and searching
- Comprehensive attendance records with employee details
- Sticky form panel for quick attendance marking

## Tech Stack

| Layer      | Technology                                 |
| ---------- | ------------------------------------------ |
| Frontend   | React 18, Vite, Tailwind CSS, Lucide Icons |
| Backend    | Python 3.14, FastAPI 0.128, SQLAlchemy    |
| Database   | SQLite (development) / PostgreSQL (production) |
| UI Library | React Hot Toast, React Router v6          |
| Styling    | Tailwind CSS with custom animations       |

## Project Structure

```
Staffy/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── database.py          # Database configuration & session
│   │   ├── models.py            # SQLAlchemy ORM models
│   │   ├── schemas.py           # Pydantic validation schemas
│   │   ├── crud.py              # Database operations (CRUD)
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── employees.py     # Employee management endpoints
│   │       ├── attendance.py    # Attendance tracking endpoints
│   │       └── dashboard.py     # Dashboard analytics endpoint
│   ├── requirements.txt         # Python dependencies
│   ├── Procfile                 # Deployment configuration
│   └── .venv/                   # Virtual environment (local)
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Badge.jsx        # Status & department badges
│   │   │   ├── Card.jsx         # Card container component
│   │   │   ├── EmptyState.jsx   # Empty state display
│   │   │   ├── ErrorState.jsx   # Error handling display
│   │   │   ├── Layout.jsx       # Main layout with sidebar
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Modal.jsx        # Reusable modal component
│   │   │   ├── SearchInput.jsx  # Smart search component
│   │   │   ├── Stats.jsx        # Stats card components
│   │   │   ├── Table.jsx        # Advanced table with sorting
│   │   │   └── FilterBar.jsx    # Filtering component
│   │   ├── context/
│   │   │   └── ThemeContext.jsx # Dark mode theme context
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # Dashboard page
│   │   │   ├── Employees.jsx    # Employees management page
│   │   │   └── Attendance.jsx   # Attendance tracking page
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.jsx              # Main app component
│   │   ├── index.css            # Global styles & Tailwind
│   │   └── main.jsx             # React entry point
│   ├── public/                  # Static assets
│   ├── package.json             # Node dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── postcss.config.js        # PostCSS configuration
│
└── README.md
```

## API Endpoints

### Employees

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| GET    | `/api/employees/`       | List all employees  |
| GET    | `/api/employees/{id}`   | Get single employee |
| POST   | `/api/employees/`       | Create employee     |
| DELETE | `/api/employees/{id}`   | Delete employee     |

### Attendance

| Method | Endpoint                              | Description                    |
| ------ | ------------------------------------- | ------------------------------ |
| POST   | `/api/attendance/`                    | Mark attendance                |
| GET    | `/api/attendance/employee/{id}`       | Get employee attendance        |
| GET    | `/api/attendance/employee/{id}?date=` | Filter attendance by date      |
| GET    | `/api/attendance/date/{date}`         | Get all attendance for a date  |

### Dashboard

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| GET    | `/api/dashboard/`  | Get summary stats  |

## Steps to Run Locally

### Prerequisites

- **Python 3.11+** – [Download Python](https://www.python.org/)
- **Node.js 18+** – [Download Node.js](https://nodejs.org/)
- **Git** – For version control

### Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
# source .venv/bin/activate

# Install dependencies
uv pip install -r requirements.txt
# or: pip install -r requirements.txt

# Run the development server
uvicorn app.main:app --reload --port 8000
```

✅ **Backend running at:** `http://localhost:8000`  
📚 **Interactive API docs:** `http://localhost:8000/docs`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ **Frontend running at:** `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:8000`
- **API Documentation:** `http://localhost:8000/docs`

### Environment Variables

#### Frontend (`.env` in `frontend/` directory)
```env
VITE_API_URL=http://localhost:8000
```

#### Backend
No additional environment variables needed for local development. SQLite is used by default at `backend/hrms.db`.

For production with PostgreSQL:
```env
DATABASE_URL=postgresql://user:password@localhost/staffy_db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## Assumptions & Limitations

- **No authentication/authorization** – Currently set up for single admin usage (can be extended with JWT auth)
- **SQLite for development** – PostgreSQL recommended for production deployments
- **Manual Employee ID** – Not auto-generated to allow custom ID schemes (e.g., EMP001, HR-2024-001)
- **Attendance upsert** – Recording attendance for the same employee + date combination updates the existing record
- **Out of scope features** – Leave management, payroll, performance reviews, and advanced HR workflows
- **No file uploads** – Employee documents/profiles not supported in current version
- **Date-based operations** – Attendance tracking is date-based without time-of-day specifics

## Deployment Notes

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend/`
3. Set `VITE_API_URL` environment variable to your backend URL
4. Deploy with automatic builds on push

### Backend Deployment (Render, Railway, or Heroku)
1. Create a new Web Service
2. Connect your repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Set `DATABASE_URL` environment variable for PostgreSQL connection
6. Deploy

### Database for Production
- Use **PostgreSQL** instead of SQLite
- Create a database and update `DATABASE_URL` environment variable
- SQLAlchemy will auto-create tables on first run

---

## Contributing

Contributions are welcome! Please feel free to submit a pull request with improvements.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
