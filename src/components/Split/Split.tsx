import { AccountTxResponse } from "xrpl";
import NFTPapers from "../NFTPapers";
import { Fab } from "@mui/material";
import { ORANGE, PANNA } from "@/shared/constants";

interface Props {
  txsHistory: AccountTxResponse | null;
  text: string;
}

const Split = ({ txsHistory, text }: Props) => {
  console.log(txsHistory);
  return (
    <div>
      <NFTPapers
        txsHistory={txsHistory}
        text={text}
        clickablePaper={true}
        myColor={ORANGE}
      />
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: ORANGE,
          color: PANNA,
        }}
      >
        Split
      </Fab>
    </div>
  );
};

export default Split;
