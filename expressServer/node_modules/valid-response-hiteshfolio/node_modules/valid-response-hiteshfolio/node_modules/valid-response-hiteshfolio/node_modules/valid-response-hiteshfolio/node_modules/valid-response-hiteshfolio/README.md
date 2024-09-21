# Valid Response HiteshFolio

A utility for handling API responses with consistent error and success messaging. This package simplifies the process of sending structured responses in your Node.js applications.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
   - [Importing the Package](#importing-the-package)
   - [Functions](#functions)
     - [`resError`](#reserrorres-errors-message-dynamicstatus)
     - [`resSuccess`](#ressuccessres-data-message-dynamicstatus)
3. [Error Handling](#error-handling)
4. [License](#license)
5. [Contributing](#contributing)
6. [Author](#author)

## Installation

You can install the package using npm:

```bash
npm install valid-response-hiteshfolio
```

## Usage

To use this package, you need to require it in your Node.js application. You can then use the provided functions to send error or success responses.

### Importing the Package

For CommonJS:

```javascript
const { resError, resSuccess } = require('valid-response-hiteshfolio');

```

For ES Modules:

```javascript
import { resError, resSuccess } from 'valid-response-hiteshfolio';
```
## Functions

### `resError(res, errors, message, dynamicStatus)`

Sends an error response with a structured format.

**Parameters:**

- `res`: The response object from your Express app.
- `errors`: Additional error information.
- `message`: Custom error message (optional).
- `dynamicStatus`: Boolean indicating whether to adjust status based on the message (default: false).
### Example

```javascript
app.get('/api/some-route', (req, res) => {
    const errors = { field: 'exampleField' };
    return resError(res, errors, 'Unauthorized access', true);
});
```

### `resSuccess(res, data, message, dynamicStatus)`

Sends a success response with a structured format.

**Parameters:**

- `res`: The response object from your Express app.
- `data`: The data to be returned in the response.
- `message`: Custom success message (optional).
- `dynamicStatus`: Boolean indicating whether to adjust status based on the data (default: false).
### Example

```javascript
app.post('/api/create-user', (req, res) => {
    const userData = { id: 1, name: 'John Doe' };
    return resSuccess(res, userData, 'User created successfully', true);
});

```
## Error Handling

This package automatically logs errors to the console, allowing for easier debugging during development. Ensure to check your console for any logged error messages.

## License

This package is licensed under the Apache-2.0 License.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss changes. Ensure to follow the coding standards and include relevant tests for new features.

## Author

Hitesh Saini  🧩💻
[GitHub](https://github.com/hitesh09saini) | [LinkedIn](https://www.linkedin.com/in/hitesh-saini09/) | [Portfolio](https://hitesh-folio.vercel.app/) 
