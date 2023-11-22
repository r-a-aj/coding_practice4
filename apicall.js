var https = require("https");

https
  .get("https://localhost:3000/players/", (resp) => {
    console.log("statusCode: ", res.statusCode);

    // on succ
    resp.on("data", (d) => {
      console.log(d);
    });

    // on end
    resp.on("end", () => {
      console.log(result);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
