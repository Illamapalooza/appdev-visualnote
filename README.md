# VisualNote

VisualNote is an AI-powered application designed to transform lecture snapshots into organized and efficient notes. It leverages advanced image-to-text conversion technology to make note-taking effortless and accurate.

## Features

- **Image to Text Conversion**: Automatically convert lecture snapshots into text.
- **Save Notes**: Save the converted text as notes for future reference.
- **Update Notes**: Edit and update existing notes as needed.
- **Delete Notes**: Remove notes that are no longer required.

## Project Structure

The project is organized into two main folders, each containing its own `package.json` file:

1. `visualnote` - The frontend of the application.
2. `backend` - The backend server that handles API requests and data processing.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your machine.
- npm (Node Package Manager) installed.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/visualnote.git
   cd visualnote
   ```

2. Install dependencies for the frontend:
   ```sh
   cd visualnote
   npm install
   ```

3. Install dependencies for the backend:
   ```sh
   cd ../backend
   npm install
   ```

## Running the Application

### Frontend

1. Navigate to the `visualnote` folder:
   ```sh
   cd visualnote
   ```

2. Start the frontend server:
   ```sh
   npm run dev
   ```

### Backend

1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```

2. Start the backend server:
   ```sh
   npm run start:dev
   ```

The frontend will typically be running on `http://localhost:3000` and the backend on `http://localhost:5000`, but please refer to your console output for the exact addresses.

## Usage

1. Open the frontend application in your browser.
2. Upload a lecture snapshot to convert it to text.
3. Save the converted text as a note.
4. You can view, update, or delete your saved notes as needed.

Happy note-taking with VisualNote!
