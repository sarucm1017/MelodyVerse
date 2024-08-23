# MelodyVerse Frontend

MelodyVerse is a frontend application developed with React.js, featuring modern and responsive login and signup pages. The application uses Tailwind CSS for styling and provides a user-friendly interface with input validation and password visibility toggle.

## Features

- Login Page: Allows users to log in using their email and password. Includes a password visibility toggle and basic form validation.
- Signup Page: Enables new users to register with a username, email, and password. Includes password confirmation, validation, and a password visibility toggle.
- Responsive Design: The design is optimized for desktop, tablet, and mobile devices using Tailwind CSS.

## Technology Stack

- React.js: JavaScript library for building user interfaces.
- Tailwind CSS: Utility-first CSS framework for creating custom designs.
- React Router: Library for handling routing and navigation.

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Steps

1. Clone the repository

        git clone https://github.com/sarucm1017/MelodyVerse-Frontend.git
    cd melodyverse
    

2. Install dependencies

        npm install
    

3. Run the application

        npm start
    

    The application will be available at http://localhost:3000.

## Project Structure

- src/
  - components/ - Contains reusable components such as `loginComponent` and `signup`.
  - pages/ - Contains the `LoginComponen` and `Signup`.
  - index.css - Global styles and Tailwind CSS configurations.
  - App.js - Main application component with routing.
  - index.js - Entry point for the React application.

## Components

### FormInput

A reusable component for form inputs with validation support and password visibility toggle.



### Login

The login page where users can enter their email and password. Includes form validation and password visibility toggle.

### Signup

The signup page where users can register with a username, email, and password. Includes password confirmation, validation, and password visibility toggle.

## Styling

The application uses Tailwind CSS for styling. Custom styles and layout adjustments are handled in index.css.

## Troubleshooting

- Styling Issues: Ensure Tailwind CSS is properly configured in postcss.config.js and index.css.
- Validation Issues: Verify that all form fields and validation rules are correctly implemented.

## Contribution

Feel free to fork the repository and submit pull requests. For major changes or feature requests, please open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, you can reach me at [98sarucm@gmail.com](mailto:98sarucm@gmail.com).