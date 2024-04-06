import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useActiveActivity, useSecret } from "@/shared/hooks";
import { Wallet } from "xrpl";

const LogIn = () => {
  const { setSecret } = useSecret();
  const { setActiveActivity } = useActiveActivity();
  const navigate = useNavigate();
  const [passSecret, setpassSecret] = useState<string>("");

  const logIn = async () => {
    try {
      console.log("logIn");
      await Wallet.fromSeed(passSecret);
      setSecret(passSecret);
      setActiveActivity("");
      navigate("/");
    } catch (error) {
      alert("Please insert a valid privateSeed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Stack
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h4" component="h2">
          Insert your privateSeed
        </Typography>
        <TextField
          id="outlined-basic"
          label="Private Seed"
          variant="outlined"
          value={passSecret}
          onChange={(event) => setpassSecret(event.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => {
            logIn();
          }}
        >
          Enter
        </Button>
      </Stack>
    </div>
  );
};

export default LogIn;
