# express-response-kit

Standardized API response helpers for Express.js.

`express-response-kit` is a lightweight middleware that adds `res.success`,
`res.fail`, and `res.failFromError` to Express, ensuring consistent and
production-ready API responses with zero configuration.

---

## Features

- ✅ Standardized success & error responses
- ✅ Type-safe (TypeScript support out of the box)
- ✅ Global error handling support
- ✅ Express 4 & 5 compatible
- ✅ Zero configuration
- ✅ Lightweight and dependency-free

---

## Installation

```bash
npm install express-response-kit
```

> [!NOTE]
> Requires Express >= 4

## Quick Start

```bash
import express from "express";
import { responseKit, errorHandler } from "express-response-kit";

const app = express();

app.use(express.json());
app.use(responseKit());

// routes
app.get("/health", (req, res) => {
  res.success({ status: "ok" });
});

// global error handler (recommended)
app.use(errorHandler);

app.listen(3000);
```

## Usage

### 1- Register the middleware
The middleware must be registered before your routes.

```bash
app.use(responseKit());
```
This extends the Express Response object with helper methods.

### 2- Success responses

```bash
app.get("/users", (req, res) => {
  res.success([
    { id: 1, name: "Anil" },
    { id: 2, name: "Arda" }
  ]);
});
```

### 3- Fail responses

```bash
app.get("/users/:id", (req, res) => {
  res.fail("USER_NOT_FOUND", 404);
});

```

Response
```bash
{
  "success": false,
  "code": "USER_NOT_FOUND",
  "message": "USER_NOT_FOUND"
}

```

### 4- Custom error message

```bash
res.fail("VALIDATION_ERROR", 400, "Email is required");
```

Response

```bash
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Email is required"
}

```

## Error Handling

### AppError

You can throw typed application errors anywhere in your code.

```bash
import { AppError } from "express-response-kit";

throw new AppError({
  code: "NOT_FOUND",
  status: 404,
  message: "User not found"
});
```

### Global error middleware

For consistent error handling, register the provided error middleware
after all routes.

```bash
import { errorHandler } from "express-response-kit";

app.use(responseKit());

// routes here...

app.use(errorHandler);
```

This ensures all thrown errors are converted into a standardized response.

### Error Map

Define global mappings for your custom error codes.

```bash
import { ErrorMap } from "express-response-kit";

ErrorMap.CUSTOM_ERROR = {
  status: 422,
  message: "Custom business error"
};

```

## API Reference

res.success<T>(data: T)

> Returns a standardized success response.


res.fail(code: string, status?: number, message?: string)

> Returns a standardized error response.


res.failFromError(error: unknown)

> Automatically converts any thrown error into a standardized response.



## Testing

```bash
npm test

```
