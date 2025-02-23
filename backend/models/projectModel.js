const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/CODEEDITOR");

const projectSchema = new mongoose.Schema({
  title: String,
  createdBy: String,
  date: {
    type: Date,
    default: Date.now,
  },
  htmlCode: {
    type: String,
    default: `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite + React</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main.jsx"></script>
          </body>
        </html>
        `,
  },
  cssCode: {
    type: String,
    default: `body{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }`
  },
  jsCode: {
    type: String,
    default: `console.log("Hello World!")`,
  }
});

module.exports= mongoose.model("Project",projectSchema);