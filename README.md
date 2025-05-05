# Book Search Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A MERN stack application that allows users to search for books using the Google Books API. Users can create an account, search for books, and save their favorite books to their profile. This application was built using React, GraphQL, Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Search for books using the Google Books API
- Save books to your profile
- View your saved books
- Remove books from your saved list
- Responsive design for desktop and mobile

## Installation

1. Clone the repository:
```bash
git clone git@github.com:mazagri3/book-search-engine.git
cd book-search-engine
```

2. Install dependencies for both client and server:
```bash
npm install
cd client
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
```

## Usage

1. Start the development server:
```bash
npm run develop
```

2. Open your browser and navigate to `http://localhost:3000`

3. Create an account or log in to start searching for books

4. Use the search bar to find books
   - Click "Save This Book!" to add a book to your profile
   - View your saved books in the "See Your Books" section
   - Remove books from your saved list as needed

## Technologies Used

- React
- GraphQL
- Apollo Server
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Google Books API

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Created by Obi Mazagri

## Walkthrough Video
[Watch the walkthrough video](https://drive.google.com/file/d/1mSHRxIXGDeJS04y7djB7o0IVqF2DLPZP/view?usp=sharing)

## Project URL
[View the project on GitHub](https://github.com/mazagri3/book-search-engine)

## Screenshot
[View the screenshot](https://drive.google.com/file/d/1Ja_fly5JtmqrHzDD0t246soGxdGcWhoi/view?usp=sharing)

---
© 2025 Book Search Engine. All Rights Reserved.
