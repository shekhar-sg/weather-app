import {
  AppBar,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useAppConfig } from "@c/layout";

const Header = () => {
  const { unit, setUnit } = useAppConfig();
  return (
    <AppBar
      color={"transparent"}
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
      }}
      position={"sticky"}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component={Link}
          href={"/"}
          variant={"h6"}
          color={"text.primary"}
          sx={{
            textDecoration: "none",
          }}
        >
          Weather App
        </Typography>

        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={(_, value) => {
            if (value) {
              setUnit(value);
            }
          }}
          size={"small"}
        >
          <ToggleButton value={"C"}>°C</ToggleButton>
          <ToggleButton value={"F"}>°F</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
