const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

const MOCKET_SECRET = "your-secret-key";

app.db = router.db;

app.use(jsonServer.bodyParser);

app.post("/auth/login", (req, res) => {
  const body = req.body;

  const user = app.db
    .get("users")
    .find({ email: body.email, password: body.password })
    .value();

  if (user) {
    const access_token = jwt.sign(
      { email: user.email, sub: user.id },
      MOCKET_SECRET,
      { expiresIn: "1h" },
    );

    res.status(201).jsonp({ access_token });
  } else {
    res.status(401).jsonp({ message: "Not authorized" });
  }
});

app.post("/auth/register", (req, res) => {
  const body = req.body;
  const users = app.db.get("users").value();
  console.log({ users });
  const id = users.length ? Math.max(...users.map((user) => user.id)) : 1;

  const newUser = {
    ...body,
    id: id + 1,
    avatar: null,
    createdAt: new Date().toISOString(),
  };
  app.db.get("users").push(newUser).write();

  return res.status(201).jsonp(newUser);
});

app.post("/auth/forgot-password", (req, res) => {
  res
    .status(201)
    .send("A verification code has been sent to ederaldo.souza93@gmail.com");
});

app.patch("/auth/reset-password", (req, res) => {
  console.log("cheguei \n\n\n\n\n");
  res.status(201).send({
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVkZXJzb3V6YTkzQGdtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNzcwMDc5ODg0LCJleHAiOjE3NzAwODM0ODR9.j10saDXnBzC7zhkuj5WMJL9LK26fge10Cxol8eTsE7o",
  });
});

app.post("/users/avatar", (req, res) => {
  res.status(201).jsonp({
    id: 1,
    email: "edersouza93@gmail.com",
    name: "Eder Souza",
    role: "ADMIN",
    avatar: "3fa9959b-5883-4eeb-ac8f-89ff7d9b2b84tester.jpg",
    createdAt: "2024-07-28T16:25:58.655Z",
  });
});

app.use(router);
app.listen(3000);
