import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Observable Framework syntax highlighter is now active!");

  // Register completion provider for Observable-specific syntax in Markdown files
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    "markdown",
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        _position: vscode.Position
      ) {
        // Only provide Observable completions if this looks like an Observable Framework file
        if (!isObservableFrameworkFile(document)) {
          return [];
        }

        const completionItems: vscode.CompletionItem[] = [];

        // Observable-specific completions
        const observableCompletions = [
          {
            label: "viewof",
            kind: vscode.CompletionItemKind.Keyword,
            insertText: new vscode.SnippetString(
              "viewof ${1:variableName} = ${2:input}"
            ),
            detail: "Observable viewof declaration",
            documentation:
              "Creates a reactive view that exposes both the input element and its value",
          },
          {
            label: "mutable",
            kind: vscode.CompletionItemKind.Keyword,
            insertText: new vscode.SnippetString(
              "mutable ${1:variableName} = ${2:initialValue}"
            ),
            detail: "Observable mutable declaration",
            documentation:
              "Creates a mutable variable that can be modified from other cells",
          },
          {
            label: "FileAttachment",
            kind: vscode.CompletionItemKind.Function,
            insertText: new vscode.SnippetString(
              'FileAttachment("${1:filename}")'
            ),
            detail: "Observable FileAttachment function",
            documentation: "Loads a file from the static files directory",
          },
          {
            label: "import",
            kind: vscode.CompletionItemKind.Keyword,
            insertText: new vscode.SnippetString(
              'import {${1:symbols}} from "${2:notebook-url}"'
            ),
            detail: "Observable import statement",
            documentation: "Imports symbols from another Observable notebook",
          },
          {
            label: "Inputs.button",
            kind: vscode.CompletionItemKind.Function,
            insertText: new vscode.SnippetString(
              'Inputs.button("${1:label}", {${2:options}})'
            ),
            detail: "Observable Inputs button",
            documentation: "Creates an interactive button input",
          },
          {
            label: "Inputs.text",
            kind: vscode.CompletionItemKind.Function,
            insertText: new vscode.SnippetString("Inputs.text({${1:options}})"),
            detail: "Observable Inputs text",
            documentation: "Creates a text input field",
          },
          {
            label: "Inputs.range",
            kind: vscode.CompletionItemKind.Function,
            insertText: new vscode.SnippetString(
              "Inputs.range([${1:min}, ${2:max}], {${3:options}})"
            ),
            detail: "Observable Inputs range",
            documentation: "Creates a range slider input",
          },
          {
            label: "Inputs.select",
            kind: vscode.CompletionItemKind.Function,
            insertText: new vscode.SnippetString(
              "Inputs.select(${1:options}, {${2:config}})"
            ),
            detail: "Observable Inputs select",
            documentation: "Creates a select dropdown input",
          },
          {
            label: "Plot.plot",
            kind: vscode.CompletionItemKind.Function,
            insertText: new vscode.SnippetString(
              "Plot.plot({\n  ${1:marks}: [${2:mark}],\n  ${3:options}\n})"
            ),
            detail: "Observable Plot",
            documentation: "Creates a Plot visualization",
          },
          {
            label: "d3.select",
            kind: vscode.CompletionItemKind.Function,
            insertText: new vscode.SnippetString('d3.select("${1:selector}")'),
            detail: "D3 select",
            documentation: "Selects the first element matching the selector",
          },
        ];

        // Add data loader completions
        const dataLoaderCompletions = [
          {
            label: "data-loader-js",
            kind: vscode.CompletionItemKind.Snippet,
            insertText: new vscode.SnippetString(
              "```js ${1:filename}.js\n${2:// JavaScript data loader code}\n```"
            ),
            detail: "JavaScript data loader",
            documentation: "Creates a JavaScript data loader block",
          },
          {
            label: "data-loader-py",
            kind: vscode.CompletionItemKind.Snippet,
            insertText: new vscode.SnippetString(
              "```py ${1:filename}.py\n${2:# Python data loader code}\n```"
            ),
            detail: "Python data loader",
            documentation: "Creates a Python data loader block",
          },
          {
            label: "data-loader-sql",
            kind: vscode.CompletionItemKind.Snippet,
            insertText: new vscode.SnippetString(
              "```sql ${1:filename}.sql\n${2:-- SQL data loader code}\n```"
            ),
            detail: "SQL data loader",
            documentation: "Creates a SQL data loader block",
          },
          {
            label: "data-loader-r",
            kind: vscode.CompletionItemKind.Snippet,
            insertText: new vscode.SnippetString(
              "```r ${1:filename}.r\n${2:# R data loader code}\n```"
            ),
            detail: "R data loader",
            documentation: "Creates an R data loader block",
          },
        ];

        completionItems.push(
          ...observableCompletions,
          ...dataLoaderCompletions
        );
        return completionItems;
      },
    },
    "." // Trigger completion on dot
  );

  // Register hover provider for Observable syntax in Markdown files
  const hoverProvider = vscode.languages.registerHoverProvider("markdown", {
    provideHover(
      document: vscode.TextDocument,
      position: vscode.Position
    ): vscode.ProviderResult<vscode.Hover> {
      // Only provide Observable hover info if this looks like an Observable Framework file
      if (!isObservableFrameworkFile(document)) {
        return undefined;
      }

      const wordRange = document.getWordRangeAtPosition(position);
      if (!wordRange) {
        return undefined;
      }

      const word = document.getText(wordRange);

      const hoverDocs: { [key: string]: vscode.MarkdownString } = {
        viewof: new vscode.MarkdownString(
          '**Observable viewof**\n\nCreates a reactive view that exposes both the input element and its value.\n\n```javascript\nviewof name = Inputs.text({placeholder: "Enter your name"})\n```'
        ),
        mutable: new vscode.MarkdownString(
          "**Observable mutable**\n\nCreates a mutable variable that can be modified from other cells.\n\n```javascript\nmutable count = 0\n```"
        ),
        FileAttachment: new vscode.MarkdownString(
          '**Observable FileAttachment**\n\nLoads a file from the static files directory.\n\n```javascript\nconst data = FileAttachment("data.json").json()\n```'
        ),
        Inputs: new vscode.MarkdownString(
          '**Observable Inputs**\n\nProvides interactive input components like buttons, text fields, sliders, etc.\n\n```javascript\nInputs.button("Click me")\nInputs.text({placeholder: "Type here"})\nInputs.range([0, 100])\n```'
        ),
        Plot: new vscode.MarkdownString(
          '**Observable Plot**\n\nA grammar of graphics library for creating data visualizations.\n\n```javascript\nPlot.plot({\n  marks: [\n    Plot.line(data, {x: "date", y: "value"})\n  ]\n})\n```'
        ),
      };

      if (hoverDocs[word]) {
        return new vscode.Hover(hoverDocs[word]);
      }

      return undefined;
    },
  });

  // Register command to create new Observable Framework file
  const createFileCommand = vscode.commands.registerCommand(
    "observableFramework.createFile",
    () => {
      vscode.workspace
        .openTextDocument({
          language: "markdown",
          content: `---
title: New Observable Framework Page
---

# My Observable Framework Page

Welcome to your new Observable Framework page!

\`\`\`js
// This is a reactive JavaScript cell
const message = "Hello, Observable Framework!"
\`\`\`

<div class="card">
  \${message}
</div>

\`\`\`js
// Create an interactive input
viewof name = Inputs.text({placeholder: "Enter your name"})
\`\`\`

\`\`\`js
// Use the input value reactively
md\`Hello, **\${name || "world"}**! Welcome to Observable Framework.\`
\`\`\`
`,
        })
        .then((doc) => {
          vscode.window.showTextDocument(doc);
        });
    }
  );

  context.subscriptions.push(
    completionProvider,
    hoverProvider,
    createFileCommand
  );
}

// Helper function to detect if a markdown file is an Observable Framework file
function isObservableFrameworkFile(document: vscode.TextDocument): boolean {
  const text = document.getText();

  // Check for Observable Framework indicators
  const observableIndicators = [
    /```js\s*\n[\s\S]*?viewof\s+/m, // viewof declarations
    /```js\s*\n[\s\S]*?mutable\s+/m, // mutable declarations
    /```js\s*\n[\s\S]*?FileAttachment\s*\(/m, // FileAttachment calls
    /```js\s*\n[\s\S]*?import\s*\{[\s\S]*?\}\s*from/m, // Observable imports
    /```js\s*\n[\s\S]*?Inputs\./m, // Inputs usage
    /```js\s*\n[\s\S]*?Plot\./m, // Plot usage
    /```\w+\s+\w+\.(js|py|sql|r)\s*$/m, // Data loaders
    /\$\{[\s\S]*?\}/m, // Template interpolation in markdown
    /```js\s*\n[\s\S]*?display\s*\(/m, // display calls
    /```js\s*\n[\s\S]*?html`/m, // html template literals
    /```js\s*\n[\s\S]*?md`/m, // md template literals
  ];

  return observableIndicators.some((pattern) => pattern.test(text));
}

export function deactivate() {
  console.log("Observable Framework syntax highlighter is now deactivated");
}
