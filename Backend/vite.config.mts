import path from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vite configuration file.
 *
 * This configuration sets up the Vite development environment, including test settings,
 * path aliases, and plugins.
 */
export default defineConfig(({ mode }) => {
	return {
		test: {
			coverage: {
				/**
				 * Exclude specific directories and files from test coverage.
				 */
				exclude: ["**/node_modules/**", "**/index.ts"],
			},
			/**
			 * Enable global variables for tests.
			 */
			globals: true,
			/**
			 * Restore mocks after each test.
			 */
			restoreMocks: true,
			/**
			 * Set the test environment to Node.js.
			 */
			environment: "node",
			/**
			 * Define path aliases for the project.
			 */
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
			/**
			 * Custom console log handler for tests.
			 *
			 * @param {string} log - The log message.
			 * @param {"stdout" | "stderr"} type - The type of log (stdout or stderr).
			 * @returns {false | void} Returns false to suppress the log, or void to allow it.
			 */
			// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
			onConsoleLog(log: string, type: "stdout" | "stderr"): false | void {
				console.log("log in test: ", log);
				if (log === "message from third party library" && type === "stdout") {
					return false;
				}
			},
		},
		/**
		 * Include the tsconfig paths plugin.
		 */
		plugins: [tsconfigPaths()],
	};
});