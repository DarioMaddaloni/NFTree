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
  //Prepate the transaction JSON
  const nftTokenOffer: NFTokenCreateOffer = {
    ...rest,
    TransactionType: "NFTokenCreateOffer",
    NFTokenID: NFTokenID,
    Amount: Amount,
    Destination: Destination,
    Account: wallet.address,
  };
  await myClient.connect();
  console.log("Preparing offer...");
  console.log("Autofill offer...");
  const prepared = await myClient.autofill(nftTokenOffer);
  console.log("offer");
  console.log(prepared);
  //Sign
  console.log("Signing offer...");
  const signed = wallet.sign(prepared);
  //Submit and wait for validation
  console.log("Submitting...");
  const response = await myClient.submitAndWait(signed.tx_blob);
  console.log(response);
  await myClient.disconnect();
  return response;
};

export default MyCreateNFTOffer;
