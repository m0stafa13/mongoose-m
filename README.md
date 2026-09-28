# Week 7 - Express + MongoDB API

A RESTful API built with Express.js and MongoDB (Mongoose) for managing users and posts.

## Tech Stack

- **Express.js** ^5.2.1 - Web framework
- **Mongoose** ^9.10.2 - MongoDB ODM
- **dotenv** ^18.0.3 - Environment variable management
- **cross-env** ^10.1.0 - Cross-platform environment variables

## Project Structure

```
src/
  config/
    config.service.js       # Loads environment variables from .env.{NODE_ENV}
  db/
    connection.js           # MongoDB connection setup
    model/
      user.model.js         # User schema (f_name, l_name, email, age, phone, gender, password)
      post.model.js         # Post schema (title, content, authorId → User)
  module/
    user/
      user.controller.js    # User API routes
      user.service.js       # User business logic
    posts/
      post.controller.js    # Post API routes
      post.service.js       # Post business logic
  main.js                   # Application entry point
```

## Environment Variables

The project uses environment-specific `.env` files loaded based on `NODE_ENV`:

- `.env.dev` - Development environment
- `.env.prod` - Production environment

### Required Variables

| Variable  | Description         |
| --------- | ------------------- |
| `PORT`    | Server port         |
| `DB_URI`  | MongoDB connection URI |

## Installation & Setup

```bash
npm install
```

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm run run:dev`  | Start server in development mode (NODE_ENV=dev) |
| `npm run run:prod` | Start server in production mode (NODE_ENV=prod) |

Both scripts use `node --watch` for automatic restarts on file changes.

## API Endpoints

### User Routes (`/auth`)

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| GET    | `/auth/get-all-users` | Get all users (excludes f_name, l_name) |
| POST   | `/auth/create-user`   | Create a new user (signup)      |
| GET    | `/auth/find-user-id/:id` | Get user by ID (excludes password, f_name, l_name) |
| PUT    | `/auth/update-user/:id` | Update user by ID (partial update) |
| PUT    | `/auth/update-user-save/:id` | Update user using document `.save()` method |
| DELETE | `/auth/delete-user/:id` | Delete user by ID               |
| GET    | `/auth/find-key-age`  | Filter users by query parameters (e.g. `?age=25&gender=male`) |

#### User Fields

- `f_name` (String, required)
- `l_name` (String, required)
- `email` (String, required, unique)
- `age` (Number)
- `phone` (String, required, unique)
- `gender` (String, enum: "male" | "female", default: "male")
- `password` (String, required, minlength: 5, select: false)
- `fullName` (virtual) - Computed field combining `f_name` and `l_name`

### Post Routes (`/posts`)

| Method | Endpoint                  | Description                      |
| ------ | ------------------------- | -------------------------------- |
| GET    | `/posts/get-all-posts`    | Get all posts                    |
| POST   | `/posts/create-post`      | Create a new post                |
| GET    | `/posts/get-all-posts-author` | Get all posts with populated author data |
| PUT    | `/posts/update-post/:id`  | Update post title and content by ID |
| DELETE | `/posts/delete-post/:id`  | Delete post by ID                |
| GET    | `/posts/find-post-by/:id` | Get a single post by ID (with populated author) |

#### Post Fields

- `title` (String, required)
- `content` (String, required)
- `authorId` (ObjectId, required, ref: "user")
