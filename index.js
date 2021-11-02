const app = require("./config/server");

// roda o servidor na porta 8080
app.listen(8080, function () {
  console.log("Aplicação iniciada em http://localhost:8080");
});
