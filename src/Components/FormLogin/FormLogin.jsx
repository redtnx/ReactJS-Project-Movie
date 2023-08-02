import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { luuXuongLocal } from "../../utilities/localStorage";
import { useNavigate } from "react-router-dom";
import { Input, message } from "antd";
import { useDispatch } from "react-redux";
import { setDuLieuHoTen } from "../../redux/slices/nguoiDungSlice";

const FormLogin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      //xử lí gửi dữ liệu lên server
      nguoiDungServ
        .dangNhap(values)
        .then((res) => {
          console.log(res);
          //nếu như login thành công sẽ lưu thông tin xuống local và chuyển hướng người dùng về trang chủ
          messageApi.success("Đăng nhập thành công!");
          //khi gọi dữ liệu thành công, sẽ lấy dữ liệu đó gửi lên redux
          dispatch(setDuLieuHoTen(res.data.content));
          luuXuongLocal("user", res.data.content);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          messageApi.error(err.response.data.content);
        });
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Nhớ chú ý nhập dữ liệu nhé"),
      matKhau: yup
        .string()
        .required("Nhớ nhập mật khẩu")
        .min(3, "Nhập trên 3 nhé"),
    }),
  });
  const { handleSubmit, handleChange, handleBlur } = formik;
  return (
    <div>
      {contextHolder}
      <form className="max-w-md" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Tài khoản
          </label>
          {/* <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="taiKhoan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập tài khoản"
          /> */}
          <Input
            name="taiKhoan"
            onBlur={handleBlur}
            onChange={handleChange}
            status={
              formik.errors.taiKhoan && formik.touched.taiKhoan ? "error" : ""
            }
            placeholder="Nhập tài khoản"
          />

          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className="text-red-500">{formik.errors.taiKhoan}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mật khẩu
          </label>
          {/* <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            name="matKhau"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập mật khẩu"
          /> */}
          <Input
            name="matKhau"
            onBlur={handleBlur}
            onChange={handleChange}
            status={
              formik.errors.matKhau && formik.touched.matKhau ? "error" : ""
            }
            placeholder="Nhập mật khẩu"
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="text-red-500">{formik.errors.matKhau}</p>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
