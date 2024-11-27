import path from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	return {
		test: {
			coverage: {
				exclude: ["**/node_modules/**", "**/index.ts"],
			},
			globals: true,
			restoreMocks: true,
			environment: "node",
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
			// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
			onConsoleLog(log: string, type: "stdout" | "stderr"): false | void {
				console.log("log in test: ", log);
				if (log === "message from third party library" && type === "stdout") {
					return false;
				}
			},
		},
		plugins: [tsconfigPaths()],
	};
});
