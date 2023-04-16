import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { History } from "../../../History";
import { UserData } from "./UserData";
import { BackLink } from "../../../../commons/BackLink";
import { useSelector } from "react-redux";
import checkType from "../../../../utils/checkType";
import useUser from "../../../../hooks/useUser";

const SingleUser = () => {
  const userType = useSelector((state) => state.user.type);
  const { id } = useParams();
  const [type, setType] = useState("");

  const {singleUser} = useUser(id)

  useEffect(() => {
    switch (checkType(userType)) {
      case 66:
        return setType("/admin/users");
      case 32:
        return setType("/superadmin/users");

      default:
        break;
    }
  }, [userType]);

  return (
    <Box
      sx={{
        mt: 4,
        color: 'text.primary'
      }}
    >
      <Box marginLeft={"30px"}>
        <BackLink text="Back to Users" href={type !== "" && type} />
      </Box>
      <Typography variant="h4" gutterBottom>
        User
      </Typography>
      {singleUser ? (
        <>
          <UserData singleUser={singleUser} />
          <History reportsOtherUser={singleUser.reports} />
        </>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

export default SingleUser