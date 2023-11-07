import { connect } from "mongoose";
import { DB, PORT, app } from ".";

connect(DB as string)
  .then((connection) =>
    console.log(
      `Database successfully running on ${connection.connection.host}`
    )
  )
  .catch((err) => console.log(`Error: ${err}`));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
