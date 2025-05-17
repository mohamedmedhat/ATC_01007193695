#  🎉 Event Booking System
This is a **full-stack event booking system** that allows users to browse and book events, manage their bookings, and provides an admin panel for event management. The app supports user authentication, role-based access (Admin/User), and a simple, responsive design.

---

## 📬 UI Screenshots

<details>
 <summary>📷 Click to view UI screenshots</summary>
  
![eventify-register](https://github.com/user-attachments/assets/37874154-cfe2-4da6-b687-f2252c760ce8)
![eventify-login](https://github.com/user-attachments/assets/2e303da7-5dc3-47de-b9cf-0787ebab4bd0)
![eventify-home](https://github.com/user-attachments/assets/31e1e699-c09e-4c66-ab01-a296d851ac0c)
![eventify-detail](https://github.com/user-attachments/assets/dedcbf4e-4364-4eef-810d-d38e9b8120fc)
![dashboard](https://github.com/user-attachments/assets/15f103cf-a688-47f2-bcc8-2fde04c69b87)
![bookedEvent](https://github.com/user-attachments/assets/3ee4d47f-4d6b-4bd1-9690-cf77b3db140c)

 </details> 

 ---

## 🧠 System Design

![app-uml](https://github.com/user-attachments/assets/11eb26e0-d3ff-4b55-b1d1-554299bad6cb)
![app-flowchart](https://github.com/user-attachments/assets/97eddafd-1d27-4602-9cf8-839b5b2266fc)

---

## 🧪 Postman Collection

You can easily test the API using the provided Postman collection.

- 🔗 [evntBooking.json](https://github.com/user-attachments/files/20174575/evntBooking.json)

- 📂 Import this file into Postman to access all API endpoints with example requests.

> 💡 **How to import**: Open Postman → Click `Import` → Choose the downloaded `.json` file.

---

### ✨ Features:

- **Frontend:**
  - Event listing with a responsive grid layout.
  - Event details page showing detailed event information.
  - "Book Now" functionality for users to book events.
  - Admin panel to manage events (Admin users only).
  
- **Backend:**
  - Event management API (CRUD operations).
  - User authentication and role-based access (Admin, User).
  - Event booking API (Users can book events).
  
- **Enhancements**:
  - Pagination for event listings.
  - Event image upload functionality.
  - Dark mode support.

---

### 🛠️ Tech Stack

- **Frontend**:
  - Angular
  - Angular Material for UI components
  - NgRx and RxJs for State Management
  - FontAwesome for icons
  - JWT (JSON Web Tokens) for authentication
    
- **Backend**:
  - Spring Boot
  - PostgreSQL for data storage
  - Redis for caching (optional)
  - Spring Security for authentication and role-based authorization
  - ImageKit as a cloud storage for my images url

---

### ⚙️ Prerequisites

Before you start, ensure you have the following installed on your machine:

- **Node.js** (for frontend)
- **Angular CLI** (for Angular project)
- **Java JDK 17+** (for backend development with Spring Boot)
- **Maven** (for managing Spring Boot dependencies)
- **Docker**
- **PostgreSQL** (for the database) (Optional)
- **Redis** (optional for caching)  (Optional)
- **Git** (for version control)

---

### 🚀 Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/event-booking-system.git

2. **Docker Setup**
   ```bash
   docker-compose up -d

3. **Frontend Setup (Angular)**
   ```bash
   cd frontend
   npm install
   npm run

3. **Backend Setup ( Springboot)**
   ```bash
    cd backend
   ./mvnw clean package

### 🚀 Run the Backend

You can run the Spring Boot backend in two ways:

- **Using the terminal:**
  ```bash
  mvn spring-boot:run
- **Using an IDE (e.g., IntelliJ, Eclipse):**
  - Open EventbookingApplication.java
   - Click the Run button or use the shortcut (Shift + F10 in IntelliJ)

---

### ✅ Commit Message Format (Conventional Commits)

All commit messages must follow this format:


#### Examples:

- `feat(auth): add login button`
- `fix(api): resolve 500 error on fetch`
- `chore(lint): add ESLint and Prettier setup`

Allowed types: `feat`, `fix`, `chore`, `refactor`, `style`, `test`, `docs`, `ci`, `perf`
