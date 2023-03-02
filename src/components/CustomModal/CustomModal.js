import { Modal, Typography, Box, Button } from "@mui/material";
import PropTypes from "prop-types";

function CustomModal({ show, setShow, data, setData }) {
  return (
    <Modal open={show} onClose={() => setShow(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {data?.toString()}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <Button
          onClick={() => {
            setData("Sang");
          }}
        />
      </Box>
    </Modal>
  );
}

CustomModal.defaultProps = {
  data: null,
  setData: null
};

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  setData: PropTypes.func
};

export default CustomModal;
