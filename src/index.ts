import { app } from "./app";

async function main() {
  const App = new app();
  await App.listen();
}

main();
