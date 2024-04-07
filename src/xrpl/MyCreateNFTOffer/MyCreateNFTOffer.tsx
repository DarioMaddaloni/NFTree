import { Client, NFTokenCreateOffer, Payment, Wallet } from "xrpl";

type TxnOptions = { wallet: Wallet; showLogs?: boolean; multiSign?: boolean };
type ClientProps = { myClient: Client };
type PaymentsProps = Omit<Payment, "TransactionType" | "Account">;

const MyCreateNFTOffer = async (
  props: PaymentsProps,
  { wallet }: TxnOptions,
  { myClient }: ClientProps
) => {
  //Prepate the transaction JSON
  const nftTokenOffer: NFTokenCreateOffer = {
    ...props,
    TransactionType: "NFTokenCreateOffer",
    NFTokenID: 
    Amount:
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
