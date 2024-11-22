# Rock Climbing Community Hub

## Introduction

Welcome to the Rock Climbing Community Hub, a dedicated social media platform for climbing enthusiasts. This application serves as a vibrant meeting place for climbers to share experiences, tips, climbing routes, gear reviews, and personal achievements.

### Key Features

- **Post and Share**: Users can post updates, share climbing routes, experiences, and photos.
- **Interactive Feed**: Browse through a feed of posts from other climbers, filtered by climbing grades or location.

## Installation Instructions

### Prerequisites

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Dependencies

- Express
- express-session
- bcrypt for authentication

### Setting Up the Project

1. **Clone the Repository**

   ```bash
   git clone https://yourrepositorylink.com
   cd rock-climbing-community
2. **Install Dependencies**
   Navigate to the project directory and run:

   ```bash
   npm install
3. **Database Setup**
   - Ensure PostgreSQL is installed and running on your machine.
   - Create a new database named climbing_community.
   - Import the initial schema and data from the provided db.sql file:
   ```bash
   psql -U username -d climbing_community -a -f db.sql
4. **Environment Configuration**
   Create a .env file in the project root directory and update it with your database credentials and session secret:
   
   ```plaintext
   PG_USER=yourusername
   PG_PASSWORD=yourpassword
   PG_DATABASE=climbing_community
   PG_HOST=localhost
   PG_PORT=5432
   SESSION_SECRET=your_secret_key
   
5. **Start the Server**
   Run the following command to start the application:
   
   ```bash
   npm start

The server should now be running on http://localhost:1337.

## Development Notes

### Current Status

- **Working Features**:
  - User authentication: Secure login and session management.
  - Posting system: Users can create posts, share photos, and discuss climbing experiences.
  - Community interactions: Users can like, comment, and share posts.

### Areas for Improvement

- **Frontend Enhancements**: The user interface could be updated to be more visually appealing and user-friendly.
- **Performance**: As the community grows, the backend will need optimizations to handle increased traffic and data.
- **Features Expansion**:
  - Real-time notifications for interactions.
  - Expanded user profiles with more detailed climbing histories and preferences.

### Future Plans

- **Mobile Responsiveness**: Improving the site's responsiveness and usability on mobile devices.
- **API Development**: Building a public API for community data integration with other services.
- **Localization**: Adding support for multiple languages to cater to a global climbing community.

## Contributing

We actively welcome your pull requests and contributions to the Rock Climbing Community Hub:

1. **Fork the Repo** on GitHub, clone it locally, or work within a development branch, depending on the project setup.
2. **Commit Changes** to your own branch: Ensure commit messages clearly explain the intent of your updates.
3. **Push to the Branch**: Include screenshots and GIFs in your pull requests whenever possible.
4. **Submit a Pull Request**: Provide a detailed description of the proposed changes and any testing instructions.

