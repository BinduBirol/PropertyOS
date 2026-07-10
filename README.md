# Commerce Platform

A modular e-commerce platform built with **Spring Boot**, **Microservices**, and **Event-Driven Architecture**.

The project follows a production-oriented approach with independent services communicating through REST APIs and asynchronous events.

---

## Tech Stack

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* MySQL
* Apache Kafka
* Spring Kafka
* JWT Authentication
* Maven
* Hibernate
* REST API
* Event-Driven Architecture
* Internationalization (i18n)
* JUnit & Mockito (in progress)

---

## Project Structure

```text
commerce-parent
│
│
├── commerce-domain
│   ├── Shared entities
│   ├── BaseEntity
│   ├── Common enums
│   └── Shared domain models
│   ├── Common API response
│   └── Shared annotations
│
├── commerce-auth-service
│   ├── Authentication
│   ├── User registration
│   ├── Login
│   ├── JWT generation
│   ├── Role management
│   ├── User management
│   └── Kafka event publishing
│       ├── UserRegisteredEvent
│       ├── LoginSuccessEvent
│       └── LoginFailedEvent
│
├── commerce-product-service
│
├── commerce-order-service
│
├── commerce-payment-service
│
├── commerce-notification-service
│
└── commerce-gateway
```

---

## Current Features

* User Registration
* User Login
* JWT Authentication
* BCrypt Password Encryption
* Role-based Authentication
* Global Exception Handling
* Standardized API Response
* Request Validation
* Localization (English & Bangla)
* Rate Limiting
* Shared Domain Module
* Shared Common Module
* Kafka Event Publishing
* Event-driven communication between services

---

## Event-Driven Architecture

The platform uses **Apache Kafka** for asynchronous communication between microservices.

Services publish domain events instead of directly depending on other services.

Example:

### User Registration Flow

```
Client
  |
  v
Auth Service
  |
  ├── Save User
  |
  ├── Publish UserRegisteredEvent
  |
  v
Kafka Topic: user-registered
  |
  +----------------------+
  |                      |
  v                      v
Notification Service   Audit Service
(send email)           (store activity)
```

Current events:

* `UserRegisteredEvent`
* `LoginSuccessEvent`
* `LoginFailedEvent`

Future events:

* OrderCreatedEvent
* PaymentCompletedEvent
* InventoryUpdatedEvent
* ProductUpdatedEvent

Benefits:

* Loose coupling between services
* Independent service scaling
* Asynchronous processing
* Easier integration of new services
* Improved reliability

---

## API Response Format

Successful Response

```json
{
  "success": true,
  "data": {},
  "timestamp": "...",
  "path": "...",
  "version": "v1"
}
```

Error Response

```json
{
  "success": false,
  "error": {
    "code": "...",
    "message": "...",
    "status": 400,
    "fieldErrors": {}
  },
  "timestamp": "...",
  "path": "...",
  "version": "v1"
}
```

---

## Internationalization (i18n)

The project supports multiple languages using the `Accept-Language` request header.

Example:

```
Accept-Language: en
```

or

```
Accept-Language: bn
```

---

## Planned Services

* Product Service
* Inventory Service
* Cart Service
* Order Service
* Payment Service
* Notification Service
* Audit Service
* API Gateway
* Service Discovery
* Config Server

---

## Testing

Planned testing strategy includes:

* Unit Tests
* Controller Tests
* Repository Tests
* Integration Tests
* Security Tests
* Testcontainers
* Performance Testing

---

## Goals

This project is being developed as a learning-oriented, production-style microservices application to practice:

* Spring Boot
* Microservices Architecture
* Event-Driven Architecture
* Apache Kafka
* Security
* JWT Authentication
* REST API Design
* Clean Architecture
* Testing
* CI/CD
* Docker
* Kubernetes (future)
* Cloud Deployment (future)

---

## Status

🚧 Active development.
