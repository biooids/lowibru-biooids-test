export const test = (req, res) => {
  console.log(req.url);
  res.send("API routes test working well");
  console.log("API routes test working well");
};
