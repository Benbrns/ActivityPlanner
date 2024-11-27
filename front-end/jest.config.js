// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: "ts-jest",
//     testEnvironment: "node",
//     testEnvironment: "jsdom",
//     transform: {
//         "\\.[jt]sx?$": "esbuild-jest",
//     },
// };

// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     testEnvironment: "jsdom",
//     transform: {
//         ".[jt]sx?$": "esbuild-jest",
//     },
//     moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
// };

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    testEnvironment: "jsdom",
    transform: {
        ".[jt]sx?$": "esbuild-jest",
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};
