import {
  Client,
  NFTokenMint,
  NFTokenMintFlags,
  Wallet,
  convertStringToHex,
} from "xrpl";

type TxnOptions = { wallet: Wallet; showLogs?: boolean; multiSign?: boolean };
type ClientProps = { myClient: Client };
type MintNtfProps = Omit<NFTokenMint, "TransactionType" | "Account" | "Flags">;

const MyMerge = async (
  { URI, ...rest }: MintNtfProps,
  { wallet }: TxnOptions,
  { myClient }: ClientProps
) => {
  // Prepare
  const nftMintTxn: NFTokenMint = {
    ...rest,
    Flags: NFTokenMintFlags.tfTransferable,
    URI: convertStringToHex(URI ?? ""),
    Account: wallet.address,
    TransactionType: "NFTokenMint",
  };

  console.log("nftMintTxn");
  console.log(nftMintTxn);
  await myClient.connect();
  console.log("Minting NFT...");
  const prepared = await myClient.autofill(nftMintTxn);

  console.log("nftMintTxnAutofilled");
  console.log(prepared);
  // Sign
  console.log("signing");
  const signed = wallet.sign(prepared);
  console.log("Sumbitting and waiting");
  // Submit and wait
  const response = await myClient.submitAndWait(signed.tx_blob);
  console.log(response);

  console.log("NFT minted");
  await myClient.disconnect();
  return response;
};

export default MyMerge;
