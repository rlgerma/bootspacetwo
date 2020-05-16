const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(routes);

app.listen(PORT, function () {
  console.log(
    `===================================================================================================================================`
  );
  console.log(
    `                                            🌎  ==> API Server now listening on PORT 'http://localhost:${PORT}'!`
  );
  console.log(
    `-----------------------------------------------------------------------------------------------------------------------------------`
  );
  console.log(
    `                                  🥾  ==> Bootspace Development server on 'http://localhost:3000'`
  );
  console.log(
    `-----------------------------------------------------------------------------------------------------------------------------------`
  );
  console.log(
    `                          🤔  ==> Don't forget to 'LOG OUT' before you save and refresh!`
  );
  console.log(
    `===================================================================================================================================`
  );
});
