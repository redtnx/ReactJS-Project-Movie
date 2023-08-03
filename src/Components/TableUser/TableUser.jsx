import React, { useRef } from "react";
import { Space, Table, Tag, Button, message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { nguoiDungServ } from "../../services/nguoiDungServices";
import { getAllUser } from "../../redux/slices/nguoiDungSlice";

//id, họ tên, email, sđt, mã loại người dùng, action

const TableUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.nguoiDung);
  // console.log(users);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      //custom lại hiển thị cột
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ và tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Mã loại người dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (text, record, index) => {
        //text chứa giá trị của thuộc tính đó trong data
        // console.log(text);
        //record chứa các phần tử trong mảng data
        // console.log(record);
        //index chứa vị trí của các phần tử trong data
        // console.log(index);
        return (
          <Tag color={text == "QuanTri" ? "magenta" : "blue"}>
            {text == "QuanTri" ? "Quản Trị" : "Khách Hàng"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              nguoiDungServ
                .deleteUser(record.taiKhoan)
                .then((res) => {
                  // console.log(res);
                  alert("Xóa thành công!");
                  dispatch(getAllUser());
                })
                .catch((err) => {
                  console.log(err);
                  alert("Có vấn đề xảy ra!");
                });
            }}
            //thêm popconfirm vào để hỏi người dùng có muốn xóa hay không
            className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-800 duration-500"
          >
            Xóa
          </button>
          <button className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-800 duration-500">
            Sửa
          </button>
        </Space>
      ),
    },
  ];

  let newUser = users.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  return <Table columns={columns} dataSource={users.length > 0 && newUser} />;
};

export default TableUser;
