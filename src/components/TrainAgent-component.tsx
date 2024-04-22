import * as tf from "@tensorflow/tfjs";

// Define Maze Layout Data
const mazeLayoutData = `
block-12-1
block-13-1
block-13-0
block-12-0
block-12--1
block-10--1
block-9--1
block-10-0
block-11-0
block-9-0
block-8-0
block-7-0
block-6-0
block-5-0
block-4-0
block-3-0
block-2-0
block-1-0
block-1--1
block-0-0
block-1-1
block-0-1
block-4-1
block-2-1
block-3-1
block-5-1
block-6-1
block-7-1
block-8-1
block-9-1
block-10-1
block-11-1
block-11-2
block-11-3
block-11-4
block-10-2
block-10-3
block-10-4
block-10-5
block-11-5
block-10-6
block-10-7
block-11-7
block-11-8
block-10-8
block-9-8
block-8-8
block-7-8
block-6-7
block-5-7
block-4-7
block-3-7
block-2-7
block-2-8
block-1-8
block-0-8
block-0-7
block-1-7
block-3-8
block-4-8
block-5-8
block-6-8
block-0-6
block-0-5
block-0-4
block-0-3
path-13-3
path-11-3
path-10-2
path-8-2
path-7-2
path-6-2
path-5-2
path-4-2
path-3-2
path-2-2
path-1-2
path-1-3
path-1-4
path-1-5
path-1-6
path-2-6
path-2-5
path-2-4
path-2-3
path-9-2
path-9-3
path-8-3
path-7-3
path-6-3
path-5-3
path-4-3
path-3-3
path-3-4
path-4-4
path-5-4
path-6-4
path-7-4
path-8-4
path-9-4
path-8-5
path-7-5
path-6-5
path-3-5
path-3-6
path-4-5
path-5-5
path-5-6
path-6-6
path-4-6
path-9-5
path-9-6
path-9-7
path-8-7
path-8-6
path-7-6
goal-12-7
goal-9-6
goal-8-7
goal-7-7
block-3-2
block-3-3
block-2-3
block-2-4
block-2-5
block-3-5
block-4-5
block-5-5
block-5-4
block-4-4
block-5-3
block-6-3
block-7-3
block-8-3
block-8-4
block-8-5
block-7-5
start-13-5
start-13-3
start-12-2
start-11-1
start-10-1
start-8-0
start-7-0
start-5-0
start-4-0
start-3-0
start-2-1
start-1-1
start-1-2
start-0-2
`;

// Define constants for actions
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

// Function to parse maze layout data and convert it into a grid representation
function parseMazeLayout(layoutData: any) {
  const lines = layoutData.trim().split("\n");
  const gridSize = 35;
  const mazeGrid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => "")
  );

  lines.forEach((line: any) => {
    const [type, x, y] = line.split("-");
    const row = parseInt(x);
    const col = parseInt(y);

    switch (type) {
      case "block":
        mazeGrid[row][col] = "block";
        break;
      case "path":
        mazeGrid[row][col] = "path";
        break;
      case "start":
        mazeGrid[row][col] = "start";
        break;
      case "goal":
        mazeGrid[row][col] = "goal";
        break;
      default:
        break;
    }
  });

  return mazeGrid;
}

// Function to convert maze grid to numerical representation
function convertMazeToNumeric(mazeGrid: any) {
  const numericMaze = [];
  for (let i = 0; i < mazeGrid.length; i++) {
    const row = mazeGrid[i];
    const numericRow = [];
    for (let j = 0; j < row.length; j++) {
      switch (row[j]) {
        case "block":
          numericRow.push(1); // Representing block
          break;
        case "path":
          // Check if there's a block at the same coordinate
          if (mazeGrid[i][j] === "block") {
            numericRow.push(1); // If block is present, prioritize it
          } else {
            numericRow.push(0); // If no block, represent as empty path
          }
          break;
        case "goal":
          // Check if there's a start at the same coordinate
          if (mazeGrid[i][j] === "start") {
            numericRow.push(2); // If start is present, prioritize it
          } else {
            numericRow.push(3); // If no start, represent as goal
          }
          break;
        case "start":
          numericRow.push(2); // Representing start
          break;
        default:
          numericRow.push(1); // Default to block for unknown elements
          break;
      }
    }
    numericMaze.push(numericRow);
  }
  return numericMaze;
}

// Function to generate actions
function generateActions() {
  const actions = [];
  for (let action = UP; action <= RIGHT; action++) {
    actions.push([action]);
  }
  return actions;
}

// Convert maze layout data into a grid representation
const mazeGrid = parseMazeLayout(mazeLayoutData);

// Convert maze grid to numerical representation
const states = convertMazeToNumeric(mazeGrid);

// Generate actions
const actions = generateActions();

// Define TensorFlow model architecture
const model = tf.sequential();
model.add(
  tf.layers.dense({ units: 64, inputShape: [35, 35], activation: "relu" })
);
model.add(tf.layers.flatten());
model.add(tf.layers.dense({ units: 64, activation: "relu" }));
model.add(tf.layers.dense({ units: 4, activation: "softmax" }));
model.compile({ optimizer: "adam", loss: "meanSquaredError" });

// Convert training data to tensors
const statesTensor = tf.tensor(states);
const actionsTensor = tf.tensor(actions);

// Train the model
export async function trainModel() {
  await model.fit(statesTensor, actionsTensor, { epochs: 10 });
}

// Save the trained model
async function saveModel() {
  await model.save("file://path_to_save_model");
}

// Train and save the model
trainModel().then(saveModel);
