# The Data Storm - REST API ⚡

A robust RESTful API built with Node.js, Express, and MongoDB Atlas. This project demonstrates cloud database provisioning, strict Object Data Modeling (ODM) with Mongoose, relational data mapping, and custom aggregation pipelines.

## Live Demo

**Live API Endpoint:** [https://the-data-storm-xse1.onrender.com](https://the-data-storm-xse1.onrender.com)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose
- **Environment:** `dotenv` for secure credential management

## Key Features

- **Cloud Persistence:** Transitioned from volatile in-memory arrays to persistent cloud storage via MongoDB Atlas.
- **Relational Data Mapping:** Strict Mongoose schemas for `User` and `Post` collections, linked via `ObjectId` references and hydrated using `.populate()`.
- **Data Aggregation:** Custom endpoints utilizing sorting and limiting to deliver precise payloads (e.g., Top 3 Recent Posts).
- **Network Resiliency:** Implemented custom DNS resolution to bypass strict ISP filtering on SRV records, ensuring stable database connections.
- **Clean UI:** Includes a responsive HTML/CSS landing page detailing API health and available endpoints.

## API Endpoints

| Method   | Endpoint            | Description                                                 |
| :------- | :------------------ | :---------------------------------------------------------- |
| `GET`    | `/`                 | API Health Check & Landing Page                             |
| `POST`   | `/users`            | Register a new user (Requires `name`, `email`)              |
| `POST`   | `/posts`            | Create a new post (Requires `title`, `content`, `authorId`) |
| `GET`    | `/posts`            | Fetch all posts (Hydrates author `name` & `email`)          |
| `GET`    | `/posts/top/recent` | Fetch the top 3 most recent posts (Chronological sort)      |
| `DELETE` | `/posts/:id`        | Delete a specific post by its MongoDB `_id`                 |

## 👨‍💻 Author

**Shivam Kumar**
_Organization: Prodesk IT_
