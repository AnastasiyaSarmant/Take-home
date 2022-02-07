# Find Nobel Laureates

This sample demonstrates how to implement and contribute a tree view in VS Code. This includes:

![Find laureate](./resources/example.png)

## VS Code API

This sample uses following contribution points, activation events and APIs


### Activation Events

-  `onCommand:extension.findLaureate`


### APIs

-   `window.createTreeView`
-   `window.registerTreeDataProvider`
-   `window.createInputBox`
-   `window.showTextDocument`
-   `workspace.openTextDocument`


## Running the Sample

-   Open this example in VS Code
-   `npm install`
-   `npm run watch`
-   `F5` to start debugging

