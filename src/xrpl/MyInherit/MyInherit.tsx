import { Client, NFTokenCreateOffer, Wallet } from "xrpl";

type TxnOptions = { wallet: Wallet; showLogs?: boolean; multiSign?: boolean };
type ClientProps = { myClient: Client };
type CreateNFTOfferProps = Omit<
  NFTokenCreateOffer,
  "TransactionType" | "Account"
>;
type DestinationsProps = {
  destination1: string | undefined;
  destination2: string | undefined;
};

const MyCreateNFTOffer = async (
  { Amount, NFTokenID, ...rest }: CreateNFTOfferProps,
  { wallet }: TxnOptions,
  { myClient }: ClientProps,
  { destination1, destination2 }: DestinationsProps
) => {
  // console.log("infos");
  // const infos = await MyInfos(wallet.address, myClient);
  // console.log(infos.nftsHistory);
  // console.log("Destination");
  // console.log(Destination);
  //Prepate the transaction JSON
  if (destination1) {
    console.log("Destination");
    const nftTokenOffer: NFTokenCreateOffer = {
      ...rest,
      Account: wallet.address,
      TransactionType: "NFTokenCreateOffer",
      NFTokenID: NFTokenID,
      Amount: Amount,
      Destination: destination1,
      Flags: 1,
    };
    console.log("NFTokenID");
    console.log(NFTokenID);
    console.log("Classic and simple address");
    console.log(wallet.classicAddress);
    console.log(wallet.address);
    // let transactionBlob = {
    //   TransactionType: "NFTokenCreateOffer",
    //   Account: wallet.classicAddress,
    //   NFTokenID: NFTokenID,
    //   Amount: Amount,
    //   Flags: 1,
    // };
    console.log("nftTokenOffer");
    console.log(nftTokenOffer);
    await myClient.connect();
    console.log("Preparing offer...");
    console.log("Autofill offer...");
    // const prepared = await myClient.autofill(nftTokenOffer);
    // console.log("offer");
    // console.log(prepared);
    //Sign
    // console.log("Signing offer...");
    // const signed = wallet.sign(nftTokenOffer);
    //Submit and wait for validation
    console.log("Submitting...");
    const response = await myClient.submitAndWait(nftTokenOffer, {
      wallet: wallet,
    });
    console.log("response");
    console.log(response);
    await myClient.disconnect();
  }
  if (destination2) {
    console.log("Destination");
    const nftTokenOffer: NFTokenCreateOffer = {
      ...rest,
      Account: wallet.address,
      TransactionType: "NFTokenCreateOffer",
      NFTokenID: NFTokenID,
      Amount: Amount,
      Destination: destination1,
      Flags: 1,
    };
    console.log("NFTokenID");
    console.log(NFTokenID);
    console.log("Classic and simple address");
    console.log(wallet.classicAddress);
    console.log(wallet.address);
    // let transactionBlob = {
    //   TransactionType: "NFTokenCreateOffer",
    //   Account: wallet.classicAddress,
    //   NFTokenID: NFTokenID,
    //   Amount: Amount,
    //   Flags: 1,
    // };
    console.log("nftTokenOffer");
    console.log(nftTokenOffer);
    await myClient.connect();
    console.log("Preparing offer...");
    console.log("Autofill offer...");
    // const prepared = await myClient.autofill(nftTokenOffer);
    // console.log("offer");
    // console.log(prepared);
    //Sign
    // console.log("Signing offer...");
    // const signed = wallet.sign(nftTokenOffer);
    //Submit and wait for validation
    console.log("Submitting...");
    const response = await myClient.submitAndWait(nftTokenOffer, {
      wallet: wallet,
    });
    console.log("response");
    console.log(response);
    await myClient.disconnect();
    return response;
  } else {
    return null;
  }
};

export default MyCreateNFTOffer;
