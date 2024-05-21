# MazeMaster_A-Star-Solver

Developed by r0m454rc4.

## Description

Welcome to MazeMaster_A-Star-Solver, a React Native app that allows you to draw or open pre-existing mazes for the A\* algorithm to solve. This README will guide you through the app's functionalities and how to use them effectively.

## Table of Contents

1. [Getting Started](#getting-started).
2. [Features](#features).
   - [Drawing Mazes](#drawing-mazes).
   - [Opening Mazes](#opening-mazes).
   - [A\* Algorithm](#a-algorithm).
   - [Visualization](#visualization).
3. [Acknowledgements](#acknowledgements).

## Getting Started

To get started with MazeMaster_A-Star-Solver, follow these steps:

1. **Clone the Repository**:
   ```sh
   git clone git@github.com:r0m454rc4/MazeMaster_A-Star-Solver.git
   ```
2. **Navigate to the project directory**:
   ```sh
   cd MazeMaster_A-Star-Solver
   ```
3. **Change IP address**:

   In order for the app to function
   correctly, you need to specify your
   computer's IP address.

   ```sh
   cd src/components
   ```

   Open the `OpenMaze-component.tsx` and `UploadMaze-component.tsx` files. Locate the line `ipAddress=YOUR_IP_ADDRESS` in both files and replace `YOUR_IP_ADDRESS` with the IP address of your computer.

4. **Execute PHP server**:
   You need to run a PHP server on your computer. Open a terminal window and navigate to the project directory. Then, start the PHP server using the following command:

   ```sh
   cd php
   php -S YOUR_IP_ADDRESS:8000
   ```

5. **Install dependencies**:
   ```sh
   npm install
   ```
6. **Run the app**:

   ```sh
   npm start
   ```

7. Follow the instructions in the terminal to launch the app on your desired platform (iOS or Android).

## Features

### Drawing or Opening Mazes

- **Drawing Mazes:** Use the drawing tool provided in the app to create your own mazes. Simply use your finger or mouse to draw the maze layout on the screen. The order of drawing is important; the maze must be drawn using the elements from left to right.

- **Opening Mazes:** Alternatively, you can open previously created maze files. The app supports plain text files representing maze configurations.

### A\* Algorithm

- **Solving:** Once the maze is opened, the A\* algorithm will be called to solve the maze. The algorithm will find the optimal path through the maze from start to goal.

### Visualization

- **Visualization Tools:** MazeMaster_A-Star-Solver provides tools to visualize the maze, the decisions made by the A\* algorithm, and its path through the maze. This helps users understand the algorithm's behavior and the strategies it employs to solve mazes.

## Acknowledgements

- This app was inspired by the fascinating field of computer science algorithms and their applications in solving complex problems.
- Thanks to @baztii and @sergigrau for their valuable feedback and suggestions.

---

**Note:** MazeMaster_A-Star-Solver is a project created for educational and experimental purposes. While efforts have been made to ensure its functionality and correctness, it may contain bugs or limitations. Use it at your own discretion.
