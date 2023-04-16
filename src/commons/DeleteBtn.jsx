import * as React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteBtn({ handleClick }) {

  return (
    <div>
      <Button
        component="button"
        variant="body2"
        sx={{ mt: 2, color: "#BA2926" }}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
}
