import { join } from "path";
const router = require("express").Router();

router.use(function (res) {
  res.sendFile(join(__dirname, "../client/build/index.html"));
});

export default router;
