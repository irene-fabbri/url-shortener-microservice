# URL Shortener API

A simple URL shortener service built using Node.js, Express, and the `cors` package. This app allows users to create short URLs that redirect to their original URLs. It includes validation to ensure that the provided URLs are valid and properly formatted. The app supports `POST` and `GET` methods for creating and retrieving short URLs.

## Features
- **POST `/api/shorturl`**: Accepts a JSON payload to create a short URL for a given original URL.
- **GET `/api/shorturl/:url`**: Redirects to the original URL if the short URL exists in the system.
- **Input validation**: Ensures that the URL is in a valid format and checks for required attributes in the request body.
- **Error handling**: Provides meaningful error messages for invalid requests.

## Installation

To run this app locally, follow the steps below:

### Prerequisites
- [Node.js](https://nodejs.org/) (v14.x or above)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Steps
1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/url-shortener.git
    cd url-shortener
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Run the app:
    ```bash
    npm start
    ```
    The app will start on port `5000` by default (or the port specified in the environment variable).

4. Visit `http://localhost:5000` to access the API.

## API Endpoints

### 1. **POST /api/shorturl**
- **Description**: Accepts a JSON payload containing the original URL, and creates a short URL.
- **Request body** (JSON):
    ```json
    {
      "data": {
        "type": "url",
        "attributes": {
          "url": "https://example.com"
        }
      }
    }
    ```
- **Response** (JSON):
    ```json
    {
      "data": {
        "type": "short-url",
        "attributes": {
          "original_url": "https://example.com",
          "short_url": "1"
        }
      }
    }
    ```
- **Validation Errors**: Returns `400` if the `url` attribute is missing or invalid.

### 2. **GET /api/shorturl/:url**
- **Description**: Redirects to the original URL corresponding to the provided short URL.
- **Example request**:
    ```
    GET /api/shorturl/1
    ```
- **Response**: The user is redirected to the original URL (e.g., `https://example.com`).
- **Validation Errors**: Returns `400` if the short URL does not exist or is missing.

## Validation Rules
- The `POST` request must include a JSON body with the following structure:
    - `url` (string): A valid URL, must be in the format `https://example.com`.
    - The request body cannot have additional attributes.

## Error Handling
- **400 Bad Request**: Returns an error when the URL is invalid, missing, or when the body is incorrectly formatted.
- **405 Method Not Allowed**: If the HTTP method is not `GET` or `POST`.
- **404 Not Found**: If the path does not exist.
- **500 Internal Server Error**: For unexpected server errors.

## Tests

The app includes a set of unit tests using `Jest` and `Supertest`. To run the tests, follow these steps:

1. Install the necessary testing dependencies:
    ```bash
    npm install --save-dev jest supertest
    ```

2. Run the tests:
    ```bash
    npm test
    ```

This will run the test suite and check that the app behaves as expected.

## Code Structure

- `server.js`: The entry point of the application. It starts the Express server.
- `app.js`: The Express application setup, including routes, middleware, and error handling.
- `input_validation.js`: Middleware for validating the input JSON for the `POST` request.
- `app.test.js`: The test suite using Jest and Supertest to test the endpoints.

## Contributing

This project is intendend for educational purposes. However, if you have suggestions on how to make the project better, feel free to reach out and give me suggestions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Notes:
- The README assumes that the `POST` request creates a new short URL with a sequential `id`.
