# Observable Framework Syntax Highlighter

A VS Code extension that provides comprehensive syntax highlighting and language support for Observable Framework files.

## Features

### 🎨 Syntax Highlighting

- **Enhanced Markdown**: Full support for Observable Framework's enhanced Markdown syntax
- **JavaScript Code Blocks**: Specialized highlighting for Observable's reactive JavaScript
- **Data Loaders**: Support for SQL, Python, R, and JavaScript data loader syntax
- **Observable Constructs**: Highlighting for `viewof`, `mutable`, `import`, and cell assignments
- **File Attachments**: Special highlighting for `FileAttachment` calls
- **Template Literals**: Enhanced support for JavaScript template strings with interpolation

### 🚀 IntelliSense & Autocompletion

- Smart completions for Observable-specific keywords (`viewof`, `mutable`, `import`)
- Built-in snippets for common Observable patterns
- Data loader templates for different languages
- Inputs library completions (`Inputs.button`, `Inputs.text`, etc.)
- Plot library completions for data visualization

### 📚 Documentation on Hover

- Contextual help for Observable Framework syntax
- Examples and usage patterns
- Quick reference for library functions

### 🛠 File Support

- `.md` files written as Observable Markdown
- Automatic language detection

## Installation

### From VS Code Marketplace (Recommended)

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Observable Framework Syntax Highlighter"
4. Click Install

### Manual Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/efrymire/observable-framework-syntax.git
   cd observable-framework-syntax
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile the extension:

   ```bash
   npm run compile
   ```

4. Package the extension:

   ```bash
   npx vsce package
   ```

5. Install the generated `.vsix` file in VS Code

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- VS Code
- TypeScript

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/efrymire/observable-framework-syntax.git
   cd observable-framework-syntax
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Open in VS Code:**

   ```bash
   code .
   ```

4. **Start development:**
   - Press `F5` to open a new Extension Development Host window
   - The extension will be automatically loaded in the new window

### File Structure

```
observable-framework-syntax/
├── src/
│   └── extension.ts          # Main extension logic with auto-detection
├── syntaxes/
│   └── observable-framework.tmLanguage.json  # TextMate grammar injection
├── language-configuration.json  # Language configuration
├── package.json              # Extension manifest
├── tsconfig.json            # TypeScript configuration
└── README.md                # Documentation
```

## Usage

### Creating Observable Framework Files

1. Create a new file with `.omd` or `.observable.md` extension
2. The syntax highlighter will automatically activate
3. Use the command palette (`Ctrl+Shift+P`) and run "Observable Framework: Create New File" for a template

### Supported Syntax Examples

#### Basic Cell Assignment

```javascript
// Simple variable assignment
data = [1, 2, 3, 4, 5]

// Multi-line cell with block syntax
processedData = {
  const filtered = data.filter(d => d > 2);
  return filtered.map(d => d * 2);
}
```

#### ViewOf (Interactive Inputs)

```javascript
viewof slider = Inputs.range([0, 100], {
  step: 1,
  value: 50,
  label: "Select a value"
})

viewof name = Inputs.text({
  placeholder: "Enter your name",
  label: "Name"
})
```

#### Mutable Variables

```javascript
mutable counter = 0

// Button to increment counter
viewof increment = Inputs.button("Increment", {
  reduce: () => ++mutable counter
})
```

#### Data Loaders

Observable Framework supports data loaders in multiple languages:

**JavaScript Data Loader:**

````javascript
```js data.js
// Process and return data
const data = await fetch("https://api.example.com/data").then(d => d.json());
process.stdout.write(JSON.stringify(data));
````

**SQL Data Loader:**

```sql data.sql
SELECT * FROM users
WHERE created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY created_at DESC;
```

**Python Data Loader:**

```python data.py
import pandas as pd
import json

# Process data with pandas
df = pd.read_csv("input.csv")
result = df.groupby("category").sum().to_dict()
print(json.dumps(result))
```

#### File Attachments

```javascript
// Load and parse data files
data = FileAttachment("data.csv").csv({ typed: true });
image = FileAttachment("chart.png").url();
config = FileAttachment("config.json").json();
```

#### Imports

```javascript
// Import from other Observable notebooks
import { chart } from "@d3/bar-chart";
import { data as salesData } from "@company/sales-dashboard";
```

#### Plot Visualizations

```javascript
Plot.plot({
  marks: [
    Plot.line(data, { x: "date", y: "value", stroke: "steelblue" }),
    Plot.dot(data, { x: "date", y: "value", fill: "steelblue" }),
  ],
  x: { type: "time" },
  y: { grid: true },
});
```

## Configuration

### Extension Settings

- `observableFramework.enableSyntaxHighlighting`: Enable/disable syntax highlighting (default: true)
- `observableFramework.highlightCodeFences`: Enhanced highlighting for code fences (default: true)

### Customizing Colors

You can customize the syntax highlighting colors in your VS Code settings:

```json
{
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "keyword.control.viewof.observable",
        "settings": {
          "foreground": "#ff6b6b",
          "fontStyle": "bold"
        }
      },
      {
        "scope": "variable.other.readwrite.observable",
        "settings": {
          "foreground": "#4ecdc4"
        }
      },
      {
        "scope": "support.function.file-attachment.observable",
        "settings": {
          "foreground": "#45b7d1"
        }
      }
    ]
  }
}
```

## Commands

- **Observable Framework: Create New File** - Creates a new Observable Framework file with a basic template

## Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues

- Use the GitHub Issues tab to report bugs
- Include sample code that demonstrates the issue
- Specify your VS Code version and operating system

### Feature Requests

- Suggest new features via GitHub Issues
- Explain the use case and provide examples
- Consider contributing the implementation

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test them
4. Ensure all tests pass: `npm test`
5. Commit your changes: `git commit -am 'Add new feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Update tests for new features
- Update documentation for user-facing changes
- Use conventional commit messages

## Testing

Run the test suite:

```bash
npm test
```

Test the extension in VS Code:

1. Open the project in VS Code
2. Press `F5` to launch Extension Development Host
3. Test your changes in the new window

## Publishing

To publish to the VS Code Marketplace:

1. **Install vsce:**

   ```bash
   npm install -g vsce
   ```

2. **Package the extension:**

   ```bash
   vsce package
   ```

3. **Publish:**
   ```bash
   vsce publish
   ```

## Changelog

### 1.0.0

- Initial release
- Basic syntax highlighting for Observable Framework
- IntelliSense support
- Data loader syntax support
- File attachment highlighting

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Observable team for creating Observable Framework
- Inspired by the VS Code Markdown extension
- Built with the VS Code Extension API

## Support

- **Documentation**: [Observable Framework Docs](https://observablehq.com/framework/)
- **Issues**: [GitHub Issues](https://github.com/efrymire/observable-framework-syntax/issues)
- **Community**: [Observable Community Forum](https://talk.observablehq.com/)

---

**Enjoy coding with Observable Framework!** 🚀
