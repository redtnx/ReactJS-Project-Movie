import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { layDuLieuLocal } from "../../utilities/localStorage";
import { nguoiDungServ } from "../../services/nguoiDungServices";

//nơi tạo các createAsyncThunk để xử lí các bất đồng bộ trước khi bắn dữ liệu lên store bằng redux-thunk
//bên trong createAsyncThunk sẽ có 2 tham số, một là type của hàm, hai là hàm cần xử lí bất đồng bộ
export const getAllUser = createAsyncThunk("nguoiDung/getAllUser", async () => {
  const res = await nguoiDungServ.getAllUser();
  //sẽ return về giá trị muốn store lưu trữ
  return res.data.content;
});

//lần đầu vào trang web store sẽ được khởi tạo
const initialState = {
  hoTen: layDuLieuLocal("user"),
  users: [],
};

//thư viện immerjs
export const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {
    //ở đây tạo 1 phương thức giúp xử lí state bên trên store redux
    setDuLieuHoTen: (state, action) => {
      //check xem hoTen có dữ liệu hay không, nếu không thì set dữ liệu cho nó
      console.log(action);
      if (state.hoTen == null) {
        state.hoTen = action.payload;
      }
    },
  },
  //extraReducers giúp tách biệt các logic bất đồng bộ ra khỏi reducer vì khi xử lí bất đồng bộ có nhiều trường hợp xảy ra
  extraReducers: (builder) => {
    //khi xử lí thì bên trong hàm sẽ có 3 phương thức tương ứng với các trường hợp chạy thành công, đang chạy, thất bại
    //pending, rejectec, fulfilled
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      //bên trong action thuộc tính payload sẽ chứa các giá trị được trả về từ hàm chạy creatAsyncThunk
      state.users = action.payload;
      // console.log(action);
    });
    //rejected sẽ chạy khi mà bất đồng bộ chạy có lỗi, sẽ vào case này và xử lí
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.users = [{ hoTen: "Khai", maLoaiNguoiDung: "QuanTri" }];
    });
  },
});

// Action creators are generated for each case reducer function
export const { setDuLieuHoTen } = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
