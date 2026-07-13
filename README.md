# BNroll Property Management Platform

A production-oriented **property management platform** built with **Spring Boot Microservices**, **React**, and **Event-Driven Architecture**.

The system is designed with independent services communicating through REST APIs and asynchronous events using Apache Kafka.

---

## Tech Stack

### Backend
- Java 26
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL
- Apache Kafka
- Spring Kafka
- JWT Authentication
- Maven
- REST API
- Bean Validation
- Internationalization (i18n)
- JUnit & Mockito

### Frontend
- React
- TypeScript
- Material UI (MUI)
- React Router
- i18n Support

### Infrastructure
- Docker
- Apache Kafka
- MySQL
- Kubernetes (planned)

---

## Project Structure

```text
bnroll-platform
├── commerce-domain
│   ├── BaseEntity
│   ├── Shared events
│   ├── Common enums
│   └── Shared DTOs
│
├── auth-service
│   ├── User authentication
│   ├── Registration
│   ├── Login
│   ├── JWT generation
│   ├── Role management
│   └── Security
│
├── property-service
│   ├── Property management
│   ├── Unit management
│   ├── Property ownership
│   └── Property user roles
│
├── lease-service
│
├── payment-service
│
├── notification-service
│
├── api-gateway
│
└── web-client
    ├── React
    ├── TypeScript
    └── Material UI
```

---

## Current Features

- User registration and authentication
- JWT-based authentication between services
- Role-based authorization
- Property management
- Unit management
- Shared domain module
- Common API response format
- Global exception handling
- Request validation
- Multi-language support (English & Bangla)
- Kafka event publishing
- Docker-based service deployment

---

## Authentication Architecture

The platform uses JWT authentication with a centralized authentication service.

Flow:
```text
Client
|
v
Auth Service
|
| Generates JWT
|
v
Other Services
|
| Validate JWT
|
v
Authorized Request
```

JWT contains:
```json
{
  "sub": "userId",
  "email": "user@email.com",
  "phone": "phone",
  "role": "OWNER"
}
```

---

## Event-Driven Architecture

Apache Kafka is used for asynchronous communication between services.

Example:
```text
Auth Service
      |
      |
      v
UserRegisteredEvent
      |
      |
      v
Kafka Topic
      |
      +----------------+

      |                |
      v                v
Notification       Audit
Service            Service
```

Current events:
* UserRegisteredEvent
* LoginSuccessEvent
* LoginFailedEvent

Future events:
* PropertyCreatedEvent
* LeaseCreatedEvent
* PaymentCompletedEvent
* NotificationSentEvent

---

## API Response Format

Success:
```json
{
  "success": true,
  "data": {},
  "timestamp": "...",
  "path": "...",
  "version": "v1"
}
```

Error:
```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "...",
    "status": 400
  },
  "timestamp": "...",
  "path": "..."
}
```

---

## Internationalization

Supports multiple languages using request headers.

Example:
```text
Accept-Language: en
```
or
```text
Accept-Language: bn
```

---

## Planned Services

* Lease Management
* Rent Collection
* Payment Service
* Notification Service
* Maintenance Management
* Reporting Service
* API Gateway
* Service Discovery
* Config Server

---

## Development Goals

This project focuses on building a real-world SaaS platform while practicing:

* Microservices Architecture
* Event-Driven Systems
* Spring Boot
* Distributed Security
* REST API Design
* React Application Development
* Docker Deployment
* Cloud-Native Architecture
* CI/CD
* Kubernetes

---

## Status

🚧 Active Development
