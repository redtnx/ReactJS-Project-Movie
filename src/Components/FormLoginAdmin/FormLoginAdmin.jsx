import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { luuXuongLocal } from "../../utilities/localStorage";
import { useNavigate } from "react-router-dom";
import { Input, message } from "antd";

const FormLoginAdmin = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      nguoiDungServ
        .dangNhap(values)
        .then((res) => {
          // console.log(res);

          //điều kiện để vào được trang admin, check maLoaiNguoiDung
          if (res.data.content.maLoaiNguoiDung == "QuanTri") {
            //lưu trữ dữ liệu xuống local và chuyển hướng tới trang admin
            luuXuongLocal("user", res.data.content);
            setTimeout(() => {
              navigate("/admin");
            }, 1000);
            messageApi.success("Đăng nhập thành công!");
          } else {
            //đá  về trang chủ chọn phim khi không phải QuanTri
            setTimeout(() => {
              window.location.href = "http://localhost:3000";
            }, 1000);
            messageApi.error("Bạn không đủ quyền truy cập!");
          }
        })
        .catch((err) => {
          console.log(err);
          //trường hợp khi mà tài khoản hoặc mật khẩu không đúng trên server
          messageApi.error("Tài khoản hoặc mật khẩu không chính xác!");
          //clear hết input trong form đi bằng phương thức resetForm()
          formik.resetForm();
        });
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().required("Không được để trống trường này!"),
      matKhau: yup.string().required("Vui lòng nhập mật khẩu!"),
    }),
  });
  return (
    <div>
      {contextHolder}

      <h2 className="font-bold text-2xl">Login Admin</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5 max-w-md">
        <div>
          <label
            htmlFor="taiKhoan"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tài khoản
          </label>
          <Input
            type="text"
            id="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập tài khoản"
            //phương thức formik.values.
            value={formik.values.taiKhoan}
          />
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className="text-red-500">{formik.errors.taiKhoan}</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          <label
            htmlFor="matKhau"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Mật khẩu
          </label>
          <Input
            type="text"
            id="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập mật khẩu"
            value={formik.values.matKhau}
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="text-red-500">{formik.errors.matKhau}</p>
          ) : (
            <></>
          )}
        </div>
        <button
          type="submit"
          className="py-1 px-3 rounded bg-green-600 text-white"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default FormLoginAdmin;
