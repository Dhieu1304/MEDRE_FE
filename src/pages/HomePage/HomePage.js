import { Button, Stack, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./HomePage.css";
import medre_intro_png from "../../assets/images/medre_intro.png";
function HomePage() {
  return (
    <>
      <div className="home_intro">
        <div className="home_intro_title">LÀM THẾ NÀO ĐỂ TỐI ƯU HÓA THỜI GIAN KHÁM BỆNH CHO BẢN THÂN VÀ GIA ĐÌNH </div>
        <img src={medre_intro_png} className="home_intro_image" alt=""></img>
      </div>
      <div className="home_intro_medre">
        <div className="home_intro_medre_title">MEDRE - MỘT ỨNG DỤNG GIÚP CHO VIỆC KHÁM BỆNH TRỞ NÊN DỄ DÀNG HƠN</div>
        <div className="home_intro_medre_button">
          <Button variant="outlined" sx={{ width: "10rem", height: "10rem", padding: 1, margin: 2, fontSize: 24 }}>
            <Stack direction="column" alignItems="center" justifyContent="center">
              <BookOnlineIcon />
              <Typography sx={{ fontSize: 20, mt: 2 }}>ĐẶT LỊCH TRỰC TUYẾN</Typography>
            </Stack>
          </Button>
          <Button variant="outlined" sx={{ width: "10rem", height: "10rem", padding: 1, margin: 2, fontSize: 24 }}>
            <Stack direction="column" alignItems="center" justifyContent="center">
              <LocalHospitalIcon />
              <Typography sx={{ fontSize: 20, mt: 2 }}>ĐẶT LỊCH TRỰC TIẾP</Typography>
            </Stack>
          </Button>
          <Button variant="outlined" sx={{ width: "10rem", height: "10rem", padding: 1, margin: 2, fontSize: 24 }}>
            <Stack direction="column" alignItems="center" justifyContent="center">
              <HistoryIcon />
              <Typography sx={{ fontSize: 20, mt: 2 }}>LỊCH SỬ KHÁM BỆNH</Typography>
            </Stack>
          </Button>
          <Button variant="outlined" sx={{ width: "10rem", height: "10rem", padding: 1, margin: 2, fontSize: 24 }}>
            <Stack direction="column" alignItems="center" justifyContent="center">
              <CalendarMonthIcon />
              <Typography sx={{ fontSize: 20, mt: 2 }}>LỊCH KHÁM BỆNH</Typography>
            </Stack>
          </Button>
        </div>
      </div>
      <div className="home_intro_doctor">
        <div className="home_intro_doctor_title">ĐỘI NGŨ BÁC SĨ TẬN TÂM, CHUYÊN MÔN Ở NHIỀU CHUYÊN KHOA </div>
        <img src={medre_intro_png} className="home_intro_doctor_image" alt=""></img>
      </div>
      <div className="home_intro_type">
        <img src={medre_intro_png} className="home_intro_type_image" alt=""></img>
        <div className="home_intro_type_title">TÙY CHỌN HÌNH THỨC KHÁM PHÙ HỢP VỚI BẢN THÂN</div>
      </div>
      <div className="home_intro_nurse">
        <div className="home_intro_nurse_title">ĐỘI NGŨ TƯ VẤN NHIỆT TÌNH, GIẢI ĐÁP THẮC MẮC </div>
        <img src={medre_intro_png} className="home_intro_nurse_image" alt=""></img>
      </div>
      <div className="home_intro_start">
        <div className="home_intro_start_title">BẠN CÓ VẤN ĐỀ VỀ SỨC KHỎE </div>
        <Button variant="outlined" sx={{ width: "10rem", height: "10rem", padding: 1, margin: 2, fontSize: 24 }}>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <LocalHospitalIcon />
            <Typography sx={{ fontSize: 20, mt: 2 }}>ĐẶT LỊCH NGAY</Typography>
          </Stack>
        </Button>
      </div>
    </>
    // <div className="home_page">
    //   <div className="home_intro">
    //     <div className="home_intro_title">LÀM THẾ NÀO ĐỂ TỐI ƯU HÓA THỜI GIAN KHÁM BỆNH CHO BẢN THÂN VÀ GIA ĐÌNH </div>
    //     <div className="home_intro_image"></div>
    //   </div>
    //   <div className="home_intro_medre">
    //     <div className="home_intro_medre_title">MEDRE - MỘT ỨNG DỤNG GIÚP CHO VIỆC KHÁM BỆNH TRỞ NÊN DỄ DÀNG HƠN</div>
    //     <div className="home_intro_medre_button">
    //       <div>
    //         <Button onClick={() => alert("Button1")}>Button1</Button>
    //       </div>
    //       <div>
    //         <Button onClick={() => alert("Button2")}>Button2</Button>
    //       </div>
    //       <div>
    //         <Button onClick={() => alert("Button3")}>Button3</Button>
    //       </div>
    //       <div>
    //         <Button onClick={() => alert("Button4")}>Button4</Button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="home_intro_doctor">
    //     <div className="home_intro_doctor_title">ĐỘI NGŨ BÁC SĨ TẬN TÂM, CHUYÊN MÔN Ở NHIỀU CHUYÊN KHOA </div>
    //     <div className="home_intro_doctor_image"></div>
    //   </div>
    //   <div className="home_intro_type">
    //     <div className="home_intro_type_image"></div>
    //     <div className="home_intro_type_title">TÙY CHỌN HÌNH THỨC KHÁM PHÙ HỢP VỚI BẢN THÂN</div>
    //   </div>
    //   <div className="home_intro_nurse">
    //     <div className="home_intro_nurse_title">ĐỘI NGŨ TƯ VẤN NHIỆT TÌNH, GIẢI ĐÁP THẮC MẮC </div>
    //     <div className="home_intro_nurse_image"></div>
    //   </div>
    //   <div className="home_intro_start">
    //     <div className="home_intro_start_title">BẠN CÓ VẤN ĐỀ VỀ SỨC KHỎE </div>
    //     <div>
    //       <Button onClick={() => alert("Đặt lịch ngay")}>Đặt lịch ngay</Button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default HomePage;
