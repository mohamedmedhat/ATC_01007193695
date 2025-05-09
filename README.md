# Event Booking System

This is a **full-stack event booking system** that allows users to browse and book events, manage their bookings, and provides an admin panel for event management. The app supports user authentication, role-based access (Admin/User), and a simple, responsive design.

### Features

- **Frontend**: Built using **Angular** for a smooth and interactive user experience.
- **Backend**: Developed with **Spring Boot** and supports **REST APIs** for managing events and bookings.
- **Authentication**: Users can register, log in, and book events. Admins can manage events (Create, Read, Update, Delete).
- **AI Tools Integration**: Developed with assistance from AI tools (GitHub Copilot, ChatGPT) to improve the development workflow.

### Features:
- **Frontend:**
  - Event listing with a responsive grid layout.
  - Event details page showing detailed event information.
  - "Book Now" functionality for users to book events.
  - Admin panel to manage events (Admin users only).
  
- **Backend:**
  - Event management API (CRUD operations).
  - User authentication and role-based access (Admin, User).
  - Event booking API (Users can book events).
  
- **Optional Enhancements**:
  - Pagination for event listings.
  - Event image upload functionality.
  - Multi-language support (English, Arabic).
  - Dark mode support.

---

### Tech Stack

- **Frontend**:
  - Angular
  - Angular Material for UI components
  - JWT (JSON Web Tokens) for authentication
- **Backend**:
  - Spring Boot
  - PostgreSQL for data storage
  - Redis for caching (optional)
  - Spring Security for authentication and role-based authorization
- **Tools**:
  - GitHub Copilot for code generation and suggestions
  - ChatGPT for problem-solving and learning

---

### Prerequisites

Before you start, ensure you have the following installed on your machine:

- **Node.js** (for frontend)
- **Angular CLI** (for Angular project)
- **Java JDK 17+** (for backend development with Spring Boot)
- **Maven** (for managing Spring Boot dependencies)
- **PostgreSQL** (for the database)
- **Redis** (optional for caching)
- **Git** (for version control)

---

### Project Setup

#### Frontend Setup (Angular)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/event-booking-system.git
   cd event-booking-system/frontend
