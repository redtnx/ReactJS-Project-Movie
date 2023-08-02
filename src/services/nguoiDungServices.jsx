import { https } from "./config";
export const nguoiDungServ = {
  dangNhap: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
  getAllUser: () => {
    return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
  },
};
