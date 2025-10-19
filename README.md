# Prescripto - Healthcare Appointment Management System

![Prescripto Logo](https://img.shields.io/badge/Prescripto-Healthcare%20Management-blue?style=for-the-badge&logo=medical-cross)

A comprehensive healthcare appointment management system that connects patients with doctors, enabling seamless appointment booking, payment processing, and healthcare management.

## 🏥 About Prescripto

Prescripto is a modern healthcare platform designed to bridge the gap between patients and healthcare providers. Our vision is to create a seamless healthcare experience for every user, making it easier to access the care you need, when you need it.

### Why Choose Prescripto?

- **Efficiency**: Streamlined appointment scheduling that fits into your busy lifestyle
- **Convenience**: Access to a network of trusted healthcare professionals in your area  
- **Personalization**: Tailored recommendations and reminders to help you stay on top of your health

## 🚀 Features

### For Patients
- **User Registration & Authentication**: Secure user accounts with profile management
- **Doctor Discovery**: Browse doctors by specialty (Dermatologist, Gastroenterologist, General Physician, Gynecologist, Neurologist, Pediatricians)
- **Appointment Booking**: Easy appointment scheduling with available time slots
- **Online Payment**: Secure payment processing via Razorpay integration
- **Appointment Management**: View, cancel, and manage your appointments
- **Profile Management**: Update personal information and medical history
- **Responsive Design**: Mobile-friendly interface for all devices

### For Doctors
- **Doctor Registration**: Professional profile creation with credentials
- **Appointment Management**: View and manage patient appointments
- **Profile Management**: Update professional information and availability
- **Dashboard**: Comprehensive overview of practice statistics

### For Administrators
- **Admin Dashboard**: Complete system overview and analytics
- **Doctor Management**: Add, edit, and manage doctor profiles
- **Appointment Oversight**: Monitor all system appointments
- **User Management**: Manage patient and doctor accounts
- **System Analytics**: Track platform usage and performance

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **React Router DOM 7.9.1** - Client-side routing
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Axios 1.12.2** - HTTP client for API requests
- **React Toastify 11.0.5** - Toast notifications
- **Vite 7.1.6** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT (JSON Web Tokens)** - Secure authentication
- **Bcrypt 6.0.0** - Password hashing
- **Cloudinary 2.7.0** - Image and video management
- **Razorpay 2.9.6** - Payment gateway integration
- **Multer 2.0.2** - File upload handling
- **CORS 2.8.5** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting and formatting
- **Nodemon** - Development server auto-restart
- **Vite** - Fast development and build tool

## 📁 Project Structure

```
prescipto1/
├── frontend/                 # Patient-facing React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # React context for state management
│   │   └── assets/         # Static assets and images
│   └── package.json
├── addmin/                  # Admin panel React application
│   ├── src/
│   │   ├── components/     # Admin UI components
│   │   ├── pages/         # Admin pages
│   │   └── context/       # Admin context management
│   └── package.json
├── backend/                # Node.js/Express API server
│   ├── config/            # Database and service configurations
│   ├── controllers/       # Business logic controllers
│   ├── models/           # MongoDB data models
│   ├── routes/           # API route definitions
│   ├── middlewares/      # Custom middleware functions
│   └── uploads/          # File upload storage
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prescipto1
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install Admin Panel Dependencies**
   ```bash
   cd ../addmin
   npm install
   ```

### Environment Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/prescripto
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/prescripto

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Configuration (for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR

# Server Configuration
PORT=4000
```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The API server will run on `http://localhost:4000`

2. **Start the Frontend Application**
   ```bash
   cd frontend
   npm run dev
   ```
   The patient interface will run on `http://localhost:5173`

3. **Start the Admin Panel**
   ```bash
   cd addmin
   npm run dev
   ```
   The admin panel will run on `http://localhost:5174`

## 📱 Application Interfaces

### Patient Interface (Frontend)
- **Home**: Landing page with doctor specialties and top doctors
- **Doctors**: Browse and search doctors by specialty
- **Appointment**: Book appointments with selected doctors
- **My Appointments**: View and manage your appointments
- **My Profile**: Manage personal information
- **Login/Register**: User authentication

### Admin Panel (Addmin)
- **Dashboard**: System overview and analytics
- **All Appointments**: Monitor all system appointments
- **Add Doctor**: Register new doctors to the system
- **Doctor List**: Manage existing doctor profiles

## 🔧 API Endpoints

### User Routes (`/api/user`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /getUserData` - Get user profile
- `POST /updateProfile` - Update user profile
- `POST /bookAppointment` - Book new appointment
- `GET /getUserAppointment` - Get user appointments
- `POST /cancelAppointment` - Cancel appointment
- `POST /payment-razorpay` - Initiate payment
- `POST /verifyRazorpay` - Verify payment

### Doctor Routes (`/api/doctor`)
- `POST /register` - Doctor registration
- `POST /login` - Doctor login
- `GET /getDoctorData` - Get doctor profile
- `POST /updateProfile` - Update doctor profile
- `GET /getDoctorAppointment` - Get doctor appointments
- `POST /updateAppointmentStatus` - Update appointment status

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `GET /getUserData` - Get all users
- `GET /getDoctorData` - Get all doctors
- `GET /getAppointmentData` - Get all appointments
- `POST /addDoctor` - Add new doctor
- `POST /updateDoctor` - Update doctor
- `POST /deleteDoctor` - Delete doctor

## 💳 Payment Integration

The application integrates with **Razorpay** for secure online payments:

- Secure payment processing
- Multiple payment methods support
- Payment verification and confirmation
- Transaction history tracking

## 🗄️ Database Models

### User Model
- Personal information (name, email, phone, address)
- Profile image and medical information
- Authentication credentials

### Doctor Model
- Professional information (name, email, specialty, experience)
- Credentials (degree, about, fee)
- Availability and booking slots
- Practice location and contact details

### Appointment Model
- User and doctor references
- Appointment scheduling (date, time, slot)
- Payment status and completion tracking
- Cancellation management

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for password security
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Server-side data validation
- **File Upload Security**: Secure image upload handling

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use a cloud MongoDB service
2. Configure environment variables for production
3. Deploy to platforms like Heroku, Railway, or AWS
4. Set up Cloudinary for image storage
5. Configure Razorpay for production payments

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Configure environment variables for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🎯 Future Enhancements

- **Video Consultations**: Integrate video calling for remote consultations
- **Prescription Management**: Digital prescription system
- **Medical Records**: Comprehensive health record management
- **Notifications**: SMS and email appointment reminders
- **Multi-language Support**: Internationalization
- **Mobile App**: Native mobile applications
- **Analytics Dashboard**: Advanced reporting and analytics

---

**Prescripto** - Revolutionizing healthcare accessibility through technology 🏥✨
