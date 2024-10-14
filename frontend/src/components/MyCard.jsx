import {
  Button,
  CardContent,
  Grid2,
  Typography,
  Card,
  Box,
} from "@mui/material";
import React from "react";

const MyCard = ({ card, handleDelete }) => {
  return (
    <>
      <Grid2 item minWidth={350}>
        <Card>
          <CardContent>
            <Typography>Name: {card?.name}</Typography>
            <Typography>Description: {card?.description}</Typography>
            <Typography>Interests: {card?.interests}</Typography>
            <Button
              size="small"
              variant="outlined"
              href={card?.linkedin}
              sx={{ mt: 1, mr: 1 }}
            >
              LinkedIn
            </Button>
            <Button
              size="small"
              variant="outlined"
              href={card?.twitter}
              sx={{ mt: 1 }}
            >
              Twitter
            </Button>
            <Box>
              <Button
                size="small"
                variant="outlined"
                color="error"
                sx={{ mt: 1 }}
                onClick={() => handleDelete(card?._id)}
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid2>
    </>
  );
};

export default MyCard;
