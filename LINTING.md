# ESLint and Prettier Configuration

This project uses ESLint and Prettier for code quality and formatting.

## Available Scripts

- `npm run lint` - Run ESLint to check for code quality issues
- `npm run lint:fix` - Run ESLint with auto-fix enabled
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are properly formatted (without modifying them)
- `npm run type-check` - Run TypeScript type checking without emitting files

## VS Code Integration

The project includes VS Code settings for automatic formatting on save. Make sure you have the following extensions installed:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Configuration Files

- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.eslintignore` - Files to ignore for ESLint
- `.prettierignore` - Files to ignore for Prettier
- `.vscode/settings.json` - VS Code workspace settings

## Git Hooks (Optional)

To automatically format code before commits, you can install husky and lint-staged:

```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

Then add this to your package.json:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```
