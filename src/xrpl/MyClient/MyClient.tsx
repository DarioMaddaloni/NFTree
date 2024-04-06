import { TESTNET } from "@/shared/constants";
import { Client } from "xrpl";

let client: Client;

// function to get the client
const MyClient = () => {
  // if first time running the application
  if (!client) {
    // instantiate new client
    client = new Client(TESTNET);
  }

  // otherwise return existing object
  return client;
};

export default MyClient;
