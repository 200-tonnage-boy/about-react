import express from "express"; // 此时直接运行是识别不了import的；

const app = express();
app.use(express.static("dist"));
const template =
  `<html>
    <head>
      <title>fiber</title>
    </head>
    <body>
      <div>fiber 测试</div>
      <div id="root"> </div>
      <script src="bundle.js"></script>
    </body>
  </html>`;

app.get("*", (req, res) => {
  res.send(template);
});

app.listen(3001, () => {
  console.log(" server 启动成功");
});
