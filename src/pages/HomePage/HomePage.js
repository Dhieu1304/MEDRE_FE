import { Button } from "@mui/material";
import "./HomePage.css";
function HomePage() {
  return (
    <div className="home_page">
      <div className="home_intro">
        <div className="home_intro_title">LÀM THẾ NÀO ĐỂ TỐI ƯU HÓA THỜI GIAN KHÁM BỆNH CHO BẢN THÂN VÀ GIA ĐÌNH </div>
        <div className="home_intro_image"></div>
      </div>
      <div className="home_intro_medre">
        <div className="home_intro_medre_title">MEDRE - MỘT ỨNG DỤNG GIÚP CHO VIỆC KHÁM BỆNH TRỞ NÊN DỄ DÀNG HƠN</div>
        <div className="home_intro_medre_button">
          <div>
            <Button onClick={() => alert("Button1")}>Button1</Button>
          </div>
          <div>
            <Button onClick={() => alert("Button2")}>Button2</Button>
          </div>
          <div>
            <Button onClick={() => alert("Button3")}>Button3</Button>
          </div>
          <div>
            <Button onClick={() => alert("Button4")}>Button4</Button>
          </div>
        </div>
      </div>
      <div className="home_intro_doctor">
        <div className="home_intro_doctor_title">ĐỘI NGŨ BÁC SĨ TẬN TÂM, CHUYÊN MÔN Ở NHIỀU CHUYÊN KHOA </div>
        <div className="home_intro_doctor_image"></div>
      </div>
      <div className="home_intro_type">
        <div className="home_intro_type_image"></div>
        <div className="home_intro_type_title">TÙY CHỌN HÌNH THỨC KHÁM PHÙ HỢP VỚI BẢN THÂN</div>
      </div>
      <div className="home_intro_nurse">
        <div className="home_intro_nurse_title">ĐỘI NGŨ TƯ VẤN NHIỆT TÌNH, GIẢI ĐÁP THẮC MẮC </div>
        <div className="home_intro_nurse_image"></div>
      </div>
      <div className="home_intro_start">
        <div className="home_intro_start_title">BẠN CÓ VẤN ĐỀ VỀ SỨC KHỎE </div>
        <div>
          <Button onClick={() => alert("Đặt lịch ngay")}>Đặt lịch ngay</Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
