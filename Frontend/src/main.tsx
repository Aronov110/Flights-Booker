import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

/**
 * Entry point of the application.
 *
 * This file is responsible for rendering the root component of the React application
 * into the DOM. It uses ReactDOM.createRoot to create a root for the React component tree
 * and renders the App component within a React.StrictMode wrapper.
 */

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);