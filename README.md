# Hotel Booking System (Backend)

A RESTful API for a Hotel Booking System built with Node.js and Express.js.

This system provides API endpoints for managing hotel rooms, room types, bookings, customers, users, payments, amenities, and hotel staff profiles.

## Features

### User Management
- Retrieve all users.
- Retrieve user details by ID.
- Create new users.
- Update user information.
- User login.

### Role Management
- Retrieve all roles.
- Retrieve role details by ID.
- Search roles by name.
- Create new roles.
- Update roles.
- Delete roles.

### Customer Management
- Retrieve all customers.
- Retrieve customer details by ID.
- Search customers by name.
- Create customer accounts.
- Update customer information.
- Customer login.

### Guest Management
- Retrieve customer guest information.
- Create customer guest records.

### Room Management
- Retrieve all rooms.
- Retrieve room details by ID.
- Create new rooms.
- Update room information.

### Room Type Management
- Retrieve all room types.
- Create room types.
- Update room types.

### Room Image Management
- Retrieve room images.
- Upload multiple room images.
- Delete room images.
- Support image uploads using Multer.
- Upload up to 10 images per request.

### Amenity Management
- Retrieve available amenities.
- Create new amenities.

### Room Amenity Management
- Retrieve room amenities.
- Retrieve room amenity details by ID.
- Assign amenities to rooms.

### Booking Management
- Retrieve booking records.
- Create new bookings.
- Update booking information.

### Payment Management
- Retrieve payment records.
- Create payments.
- Update payment information.

### Hotel Staff Management

#### Front Desk
- Retrieve front desk staff profiles.
- Create front desk staff profiles.

#### Maintenance
- Retrieve maintenance staff profiles.
- Create maintenance staff profiles.
- Update maintenance staff profiles.

#### Housekeeping
- Retrieve housekeeping staff profiles.
- Create housekeeping staff profiles.

### Maintenance Request Management
- Retrieve maintenance requests.
- Create maintenance requests.
- Update maintenance requests.

## Technologies Used

- Node.js
- Express.js
- JavaScript (ES Modules)
- Multer (File Upload)
- MySQL

## API Endpoints

The following endpoints are based on the project's Express routes.

### User Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-user` | Get all users |
| GET | `/get-user-by/:id` | Get user by ID |
| POST | `/create-user` | Create a user |
| POST | `/login` | User login |
| PUT | `/update-user/:id` | Update user |

### Role Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-role` | Get all roles |
| GET | `/get-role/:id` | Get role by ID |
| GET | `/get-role/name/:name` | Get role by name |
| POST | `/create-role` | Create a role |
| PUT | `/update-role/:id` | Update a role |
| DELETE | `/delete-role/:id` | Delete a role |

### Customer Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-customer` | Get all customers |
| GET | `/get-customer-by/:id` | Get customer by ID |
| GET | `/get-by-name/name/:name` | Get customer by name |
| POST | `/login` | Customer login |
| POST | `/create-customer` | Create a customer |
| PUT | `/update-customer/:id` | Update customer |

### Customer Guest Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-customer-guest` | Get all customer guests |
| POST | `/create-customer-guest` | Create a customer guest |

### Room Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-room` | Get all rooms |
| GET | `/get-room-by/:id` | Get room by ID |
| POST | `/create-room` | Create a room |
| PUT | `/update-room-by/:id` | Update a room |

### Room Type Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-room-type` | Get all room types |
| POST | `/create-room-type` | Create a room type |
| PUT | `/update-room-type/:id` | Update a room type |

### Room Image Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-room-image` | Get all room images |
| POST | `/create-room-image/:roomId` | Upload room images |
| DELETE | `/delete-room-image/:id` | Delete a room image |

**Image Upload Details**

- Middleware: Multer
- Upload field: `images`
- Maximum files per request: 10
- Content type: `multipart/form-data`

### Amenity Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-amenity` | Get all amenities |
| POST | `/create-amenity` | Create an amenity |

### Room Amenity Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-room-amenity` | Get all room amenities |
| GET | `/get-room-amenity-by/:id` | Get room amenity by ID |
| POST | `/create-room-amenity` | Assign amenity to a room |

### Booking Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-booking` | Get all bookings |
| POST | `/create-booking` | Create a booking |
| PUT | `/update-booking/:id` | Update a booking |

### Payment Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-payment` | Get all payments |
| POST | `/create-payment` | Create a payment |
| PUT | `/update-payment/:id` | Update a payment |

### Front Desk Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-frontdesk` | Get all front desk profiles |
| POST | `/create-frontdesk` | Create a front desk profile |

### Maintenance Staff Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-maintenance` | Get maintenance profiles |
| POST | `/create-maintenance` | Create a maintenance profile |
| PUT | `/update-maintenance/:id` | Update a maintenance profile |

### Housekeeping Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-housekeeping` | Get housekeeping profiles |
| POST | `/create-housekeeping` | Create a housekeeping profile |

### Maintenance Request Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-maintenance-request` | Get all maintenance requests |
| POST | `/create-maintenance-request` | Create a maintenance request |
| PUT | `/update-maintenance-request/:id` | Update a maintenance request |

## Project Structure

```text
Hotel-Booking/
│
├── controllers/
├── routes/
├── middleware/
│
├── models/
├── config/
│
├── uploads/
│
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd Hotel-Booking
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root directory.

Add your required environment variables according to your project configuration.

### 5. Start the server

Run the development server using the script configured in `package.json`.

## Author

**Kay**

Backend Developer