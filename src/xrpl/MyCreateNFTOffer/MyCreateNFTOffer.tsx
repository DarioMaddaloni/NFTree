import { Client, NFTokenCreateOffer, Wallet } from "xrpl";

type TxnOptions = { wallet: Wallet; showLogs?: boolean; multiSign?: boolean };
type ClientProps = { myClient: Client };
type CreateNFTOfferProps = Omit<
  NFTokenCreateOffer,
  "TransactionType" | "Account"
>;

const MyCreateNFTOffer = async (
  { Amount, NFTokenID, Destination, ...rest }: CreateNFTOfferProps,
  { wallet }: TxnOptions,
  { myClient }: ClientProps
) => {
  // console.log("infos");
  // const infos = await MyInfos(wallet.address, myClient);
  // console.log(infos.nftsHistory);
  // console.log("Destination");
  // console.log(Destination);
  //Prepate the transaction JSON
  if (Destination) {
    console.log("Destination");
    const nftTokenOffer: NFTokenCreateOffer = {
      ...rest,
      Account: wallet.address,
      TransactionType: "NFTokenCreateOffer",
      NFTokenID: NFTokenID,
      Amount: Amount,
      Destination: Destination,
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
