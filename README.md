# Fitness Scheduler

This is a web application designed to help users schedule and track their daily indoor workouts. It's built with Next.js, TypeScript, and Tailwind CSS, offering a modern and responsive user experience. The app focuses on equipment-free exercises for weight loss and staying active.

## Features

- **Monthly Calendar View**: Easily schedule workouts for morning and evening sessions.
- **Local Storage**: Your workout schedule and completion data are saved in your browser, resetting every month.
- **Color-Coded Tracking**: The calendar visually represents your progress:
  - 🟨 Yellow for a completed morning workout.
  - 🟪 Purple for a completed evening workout.
  - 🟨🟪 A gradient for completing both sessions in a day.
- **Workout Variety**: A curated list of equipment-free exercises targeting cardio, strength, HIIT, and flexibility.
- **Randomized Workouts**: To keep sessions engaging, the order and duration of exercises are randomized.
- **Motivational Streak Counter**: Tracks your consistency and rewards you for it.
- **Rest as a Reward**: Maintain a streak of 3 or more days to unlock a rest period within your workouts.
- **Interactive Workout Player**: An in-app player guides you through each exercise with a timer and description.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/exercise-app.git
   cd exercise-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application in action.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Calendar**: [React Day Picker](http://react-day-picker.js.org/)
