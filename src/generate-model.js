const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");
const fs = require("fs");

// Function to read a maze to train.
let readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(data);
    });
  });
};

// Here I have main function, which is async, as I must be able to read the file.
async function main() {
  const mazeLayoutData = await readFile("../php/Mazes/maze0.txt");
  const UP = 0;
  const RIGHT = 3;

  // Function to parse maze layout data and convert it into a grid representation.
  let parseMazeLayout = (layoutData) => {
    const lines = layoutData.trim().split("\n");
    const gridSize = 35;
    const mazeGrid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => "")
    );

    lines.forEach((line) => {
      const [type, x, y] = line.split("-");
      const row = parseInt(x);
      const col = parseInt(y);

      switch (type) {
        case "block":
        case "path":
        case "start":
        case "goal":
          mazeGrid[row][col] = type;
          break;
        default:
          break;
      }
    });

    return mazeGrid;
  };

  // Function to convert maze grid to numerical representation.
  let convertMazeToNumeric = (mazeGrid) => {
    const numericMaze = [];

    for (let i = 0; i < mazeGrid.length; i++) {
      const row = mazeGrid[i];
      const numericRow = [];
      for (let j = 0; j < row.length; j++) {
        switch (row[j]) {
          case "path":
            numericRow.push(0); // Path.
            break;
          case "block":
            numericRow.push(1); // Block.
            break;
          case "start":
            numericRow.push(2); // Start
            break;
          case "goal":
            numericRow.push(3); // Goal
            break;
          default:
            numericRow.push(1); // The default is block if it's unknown.
            break;
        }
      }

      numericMaze.push(numericRow);
    }

    return numericMaze;
  };

  // Function to generate actions.
  let generateActions = () => {
    const actions = [];
    for (let action = UP; action <= RIGHT; action++) {
      actions.push([action]);
    }

    // console.log(`actions: ${actions}`);
    return actions;
  };

  // Convert maze layout data into a grid representation.
  const mazeGrid = parseMazeLayout(mazeLayoutData);
  console.log(`mazeGrid: ${mazeGrid}`);

  // Convert maze grid to numerical representation.
  const states = convertMazeToNumeric(mazeGrid);
  console.log(states);

  // Reshape the states data to add a batch dimension.
  const statesTensor = tf.expandDims(tf.tensor(states), 0);

  // Define TensorFlow model architecture.
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ units: 64, inputShape: [35, 35], activation: "relu" })
  );
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 64, activation: "relu" }));
  model.add(tf.layers.dense({ units: 4, activation: "softmax" }));
  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  // Generate actions.
  const actions = generateActions();

  // Reshape the actions data to add a batch dimension.
  const actionsTensor = tf.tensor(actions).reshape([1, actions.length]);
  // console.log(`actionsTensor: ${actionsTensor}`);

  // Train the model.
  async function trainModel() {
    // Train the model with properly shaped target data
    await model.fit(statesTensor, actionsTensor, { epochs: 10 });
  }

  // Train and save the model
  trainModel().then(() => model.save("file://../saved_model"));
}

main();
