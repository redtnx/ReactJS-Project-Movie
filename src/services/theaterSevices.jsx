import { https } from "./config";

export const theaterServ = {
  //lấy thông tin hệ thống rạp
  getAllHeThongRap: () => {
    return https.get("/api/QuanLyRap/LayThongTinHeThongRap");
  },
  getAllLichChieuHeThongRap: (maHeThong) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThong}&maNhom=GP09`
    );
  },
};
