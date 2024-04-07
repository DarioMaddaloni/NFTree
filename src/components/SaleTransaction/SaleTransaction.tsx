import { AccountTxResponse } from "xrpl";
import NFTPapers from "../NFTPapers";
import { Fab } from "@mui/material";
import { PANNA, RED } from "@/shared/constants";

interface Props {
  txsHistory: AccountTxResponse | null;
  text: string;
}

const SaleTransaction = ({ txsHistory, text }: Props) => {
  console.log(txsHistory);
  return (
    <div>
      <NFTPapers txsHistory={txsHistory} text={text} clickablePaper={true} />
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: RED,
          color: PANNA,
        }}
      >
        Trade
      </Fab>
    </div>
  );
};

export default SaleTransaction;
