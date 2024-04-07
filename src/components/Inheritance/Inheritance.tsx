import { AccountTxResponse } from "xrpl";
import NFTPapers from "../NFTPapers";
import { Fab } from "@mui/material";
import { PANNA, PURPLE } from "@/shared/constants";

interface Props {
  txsHistory: AccountTxResponse | null;
  text: string;
}

const Inheritance = ({ txsHistory, text }: Props) => {
  const nfts = txsHistory?.result.transactions;

  console.log("nfts");
  console.log(nfts);

  return (
    <div>
      <NFTPapers txsHistory={txsHistory} text={text} clickablePaper={true} />
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: PURPLE,
          color: PANNA,
        }}
      >
        Inherit
      </Fab>
    </div>
  );
};

export default Inheritance;
