import {
  INHERIT,
  MERGE,
  PANNA,
  PAPERDIMENSION,
  SPLIT,
  TRADE,
} from "@/shared/constants";
import { checkCondition, hexToASCII } from "@/shared/utils";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AccountTxResponse, AccountTxTransaction } from "xrpl";

interface ClickPaperProps {
  element: AccountTxTransaction;
}
interface Props {
  txsHistory: AccountTxResponse | null;
  text: string;
  clickablePaper: boolean;
  myColor: string;
}

const NFTPapers = ({ txsHistory, text, clickablePaper, myColor }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const nfts = txsHistory?.result.transactions?.filter(
    (transaction) => transaction?.tx?.TransactionType === "NFTokenMint"
  );
  const [selectedElement, setSelectedElement] =
    useState<AccountTxTransaction | null>(null);
  const [selectedNFTs, setSelectedNFTs] = useState<
    AccountTxTransaction[] | null
  >(null);
  console.log("selectedNFTs");
  console.log(selectedNFTs);

  const handleClickPaper = ({ element }: ClickPaperProps) => {
    if (clickablePaper) {
      console.log("element");
      console.log(element);
      setSelectedElement(element);
      setIsDialogOpen(!isDialogOpen);
    }
  };

  const handleFab = () => {
    if (text == TRADE) {
      //TODO
    } else if (text == MERGE) {
      //TODO
    } else if (text == INHERIT) {
      //TODO
    } else if (text == SPLIT) {
      //TODO
    } else {
      alert("Refresh the page. Something went wrong");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        height: "100%",
      }}
    >
      <Stack
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Typography variant="h5" component={"span"}>
          {text}
        </Typography>
        <div>
          {nfts ? (
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                sx={{ p: 2, maxWidth: 6 * PAPERDIMENSION, overflowX: "auto" }}
              >
                <Stack direction="column" spacing={2}>
                  {nfts?.map((element) => (
                    <div>
                      <Paper
                        elevation={3}
                        sx={{
                          p: 0.5,
                          width: 4 * PAPERDIMENSION,
                          height: PAPERDIMENSION,
                          borderRadius: "8px",
                          overflow: "auto",
                          margin: "8px 0px 8px 0px",
                          backgroundColor: selectedNFTs?.includes(element)
                            ? myColor
                            : null,
                        }}
                        onClick={() => handleClickPaper({ element })}
                      >
                        <Stack direction="column" spacing={2}>
                          <b>NFT:</b>
                          {element.tx?.TransactionType == "NFTokenMint" &&
                            element.tx.URI && (
                              <a href={hexToASCII(element.tx.URI)}>
                                <div>{hexToASCII(element.tx.URI)}</div>
                              </a>
                            )}
                          {element.tx?.TransactionType == "NFTokenMint" &&
                            element.tx?.Memos &&
                            element.tx?.Memos[0].Memo.MemoData &&
                            element.tx?.Memos[0].Memo.MemoType && (
                              <div>
                                <div>
                                  {hexToASCII(
                                    element.tx.Memos[0].Memo.MemoData
                                  )}
                                </div>
                                <div>
                                  {hexToASCII(
                                    element.tx.Memos[0].Memo.MemoType
                                  )}
                                </div>
                              </div>
                            )}
                        </Stack>
                      </Paper>
                    </div>
                  ))}
                </Stack>
              </Box>
            </Stack>
          ) : (
            <div>Looking for your txs history...</div>
          )}
          {selectedElement && (
            <Dialog
              open={isDialogOpen}
              onClose={() => {
                setIsDialogOpen(false);
              }}
            >
              <DialogTitle>{"Property"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Stack direction="column" spacing={2}>
                    <b>NFT:</b>
                    {selectedElement.tx?.TransactionType == "NFTokenMint" &&
                      selectedElement.tx.URI && (
                        <a href={hexToASCII(selectedElement.tx.URI)}>
                          <div>{hexToASCII(selectedElement.tx.URI)}</div>
                        </a>
                      )}
                    {selectedElement.tx?.TransactionType == "NFTokenMint" &&
                      selectedElement.tx?.Memos &&
                      selectedElement.tx?.Memos[0].Memo.MemoData &&
                      selectedElement.tx?.Memos[0].Memo.MemoType && (
                        <div>
                          <div>
                            {hexToASCII(
                              selectedElement.tx.Memos[0].Memo.MemoData
                            )}
                          </div>
                          <div>
                            {hexToASCII(
                              selectedElement.tx.Memos[0].Memo.MemoType
                            )}
                          </div>
                        </div>
                      )}
                  </Stack>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setSelectedNFTs(
                      selectedNFTs?.filter((nft) => nft !== selectedElement) ??
                        []
                    );
                    setIsDialogOpen(false);
                  }}
                  autoFocus
                  color="error"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (
                      checkCondition({ selectedNFTs, selectedElement, text })
                    ) {
                      setSelectedNFTs(
                        selectedNFTs
                          ? [...selectedNFTs, selectedElement]
                          : [selectedElement]
                      );
                    } else {
                      alert(
                        "You cannot select also this NFT for this operation"
                      );
                    }
                    console.log("CHOSEN");
                    setIsDialogOpen(false);
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </Stack>
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: myColor,
          color: PANNA,
        }}
        onClick={() => {
          handleFab;
        }}
      >
        {text}
      </Fab>
    </div>
  );
};

export default NFTPapers;
