import { WIDTHDRAWER } from "@/shared/constants";
import { useSecret } from "@/shared/hooks";
import {
  AppBar,
  AppBarProps,
  Button,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface StyledAppBarProps extends AppBarProps {
  drawerOpen: boolean;
}

interface Props {
  myBalance: number | undefined;
  myAddress: string;
  drawerOpen: boolean;
  toggleSettingsOpen: () => void;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "drawerOpen",
})<StyledAppBarProps>(({ theme, drawerOpen }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(drawerOpen && {
    width: `calc(100% - ${WIDTHDRAWER}px)`,
    marginLeft: `${WIDTHDRAWER}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MyAppBar = ({
  myBalance,
  myAddress,
  drawerOpen,
  toggleSettingsOpen,
}: Props) => {
  const { setSecret } = useSecret();
  const navigate = useNavigate();

  const logOut = () => {
    setSecret("");
    navigate("/");
  };

  return (
    <StyledAppBar position="sticky" drawerOpen={drawerOpen}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        style={{
          height: 64,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 8,
          alignItems: "center",
          paddingLeft: 12,
          paddingRight: 8,
        }}
      >
        <Button sx={{ color: "white" }} onClick={toggleSettingsOpen}>
          Menu
        </Button>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h6" component="h2" sx={{ flex: 2 }}>
            {myAddress}
          </Typography>
          {myBalance ? (
            <Typography variant="h6" component="h2">
              Balance: {myBalance} XRP
            </Typography>
          ) : (
            <Typography variant="h6" component="h2">
              Looking in the net for your balance...
            </Typography>
          )}
        </Stack>
        <Button sx={{ color: "white" }} onClick={() => logOut()}>
          Log out
        </Button>
      </Stack>
    </StyledAppBar>
  );
};

export default MyAppBar;
