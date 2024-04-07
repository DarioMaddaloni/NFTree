import { Client } from "xrpl";

const MyInfos = async (myAddress: string, myClient: Client) => {
  // Balance in XRP
  const balance = await myClient.getXrpBalance(myAddress);
  console.log("balance");
  console.log(balance);
  // txs
  const transactionHistory = await myClient.request({
    command: "account_tx",
    account: myAddress,

    ledger_index_max: -1,
  });
  console.log("txs History");
  console.log(transactionHistory);
  //nfts
  // const nftsHistory = await myClient.request({
  //   command: "account_nfts",
  //   account: myAddress,
  // });
  // console.log("nfts History");
  // console.log(nftsHistory);

  return {
    balance: balance,
    transactionHistory: transactionHistory,
  };
};

export default MyInfos;
