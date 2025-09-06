# Observable Framework VS Code Extension - Complete Setup

## 📁 Required Project Structure

Create the following directory structure:

```
observable-framework-syntax/
├── src/
│   └── extension.ts          # Main extension logic
├── syntaxes/
│   └── observable-framework.tmLanguage.json  # TextMate grammar
├── out/                      # Compiled JavaScript (auto-generated)
├── node_modules/            # Dependencies (auto-generated)
├── language-configuration.json
├── package.json
├── tsconfig.json
├── .vscodeignore            # Files to exclude from package
├── .gitignore
├── CHANGELOG.md
└── README.md
```

## 🚀 Step-by-Step Setup

### 1. Initialize the Project

```bash
mkdir observable-framework-syntax
cd observable-framework-syntax
npm init -y
```

### 2. Create Required Files

Copy all the provided files into their respective locations:

- `package.json` (updated with all scripts and dependencies)
- `tsconfig.json`
- `language-configuration.json`
- `src/extension.ts`
- `syntaxes/observable-framework.tmLanguage.json`
- `README.md`

### 3. Install Dependencies

```bash
# Install the required dependencies
npm install --save-dev @types/vscode@^1.74.0
npm install --save-dev @types/node@16.x
npm install --save-dev typescript@^4.9.4
npm install --save-dev @typescript-eslint/eslint-plugin@^5.45.0
npm install --save-dev @typescript-eslint/parser@^5.45.0
npm install --save-dev eslint@^8.28.0
npm install --save-dev @vscode/test-electron@^2.2.0

# Install vsce globally for packaging
npm install -g vsce
```

### 4. Create Additional Configuration Files

#### `.vscodeignore`

```
.vscode/**
.vscode-test/**
src/**
.gitignore
.yarnrc
vsc-extension-quickstart.md
**/tsconfig.json
**/.eslintrc.json
**/*.map
**/*.ts
```

#### `.gitignore`

```
out
dist
node_modules
.vscode-test/
*.vsix
.env
```

#### `CHANGELOG.md`

```markdown
# Change Log

## [1.0.0] - 2024-XX-XX

### Added

- Initial release of Observable Framework syntax highlighter
- Support for .md files with Observable Framework syntax
- Auto-detection of Observable Framework patterns
- IntelliSense for Observable-specific constructs
- Hover documentation
- Data loader syntax highlighting
```

### 5. Compile and Test

```bash
# Compile TypeScript
npm run compile

# Verify compilation succeeded
ls out/  # Should contain extension.js

# Test in VS Code
code .
# Press F5 to launch Extension Development Host
```

### 6. Package the Extension

```bash
# Package for distribution
npm run package

# This creates observable-framework-syntax-1.0.0.vsix
```

### 7. Install and Test

````bash
# Install the packaged extension
code --install-extension observable-framework-syntax-1.0.0.vsix

# Test with an Observable Framework file
echo '# Test

```js
viewof name = Inputs.text()
````

Hello ${name}!' > test.md

code test.md # Should show Observable syntax highlighting

````

## 🔧 Development Workflow

### During Development:
```bash
# Start TypeScript compiler in watch mode
npm run watch

# In VS Code, press F5 to test changes
# The Extension Development Host will reload automatically
````

### Before Publishing:

```bash
# Run linting
npm run lint

# Run tests (if implemented)
npm test

# Compile for production
npm run compile

# Package
npm run package
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Cannot find module" errors**

   ```bash
   # Make sure all dependencies are installed
   npm install
   ```

2. **TypeScript compilation errors**

   ```bash
   # Check TypeScript version
   npx tsc --version

   # Clean and recompile
   rm -rf out/
   npm run compile
   ```

3. **Extension not loading**

   - Check that `out/extension.js` exists
   - Verify `package.json` main field points to `"./out/extension.js"`
   - Check VS Code developer console for errors

4. **Grammar not working**
   - Verify `syntaxes/observable-framework.tmLanguage.json` exists
   - Check the grammar path in `package.json` contributions

### Testing the Grammar:

1. Open VS Code
2. Go to Command Palette (`Ctrl+Shift+P`)
3. Run "Developer: Inspect Editor Tokens and Scopes"
4. Click on Observable syntax to see if scopes are applied correctly

## 📦 Publishing to VS Code Marketplace

1. **Get a Personal Access Token from Azure DevOps**

   - Go to https://dev.azure.com/
   - Create a personal access token with Marketplace permissions

2. **Login to vsce**

   ```bash
   vsce login your-publisher-name
   ```

3. **Publish**
   ```bash
   vsce publish
   ```

## 🔍 Debugging Tips

- Use `console.log()` in your extension for debugging (shows in VS Code Developer Console)
- Test with different Observable Framework patterns
- Check the TextMate grammar tester online for syntax issues
- Use the VS Code Extension Host logs for troubleshooting

This complete setup should give you a fully functional Observable Framework syntax highlighter for VS Code!
