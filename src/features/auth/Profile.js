import { Grid, Button, Box, Typography, Card, CardHeader } from "@mui/material";

function Profile() {
  return (
    <div>
      <Box>
        <Box>
          <Card>
            <CardHeader title="Hello" subheader="world" />
          </Card>
        </Box>
        <Box>
          <Typography variant="h4">Hi</Typography>
          <Grid>
            <Grid />
            <Grid />
            <Grid />
          </Grid>
        </Box>
        <Box>
          <Typography>How are you</Typography>
          <Grid>
            <Grid />
            <Grid />
            <Grid />
          </Grid>
        </Box>
        <Box>
          <Button>Button1</Button>
          <Button>Button2</Button>
        </Box>
      </Box>
    </div>
  );
}

export default Profile;
