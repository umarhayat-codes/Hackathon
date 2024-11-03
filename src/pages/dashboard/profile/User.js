import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { Button, ConfigProvider, Empty, Table } from "antd";


const renderEmpty = (componentName) => {
  if (componentName === 'Table.filter' /** 👈 5.20.0+ */) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Filter(Custom)" />;
  }
};
function User() {
  const [users,setUsers] = useState([])
  const { user } = useAuthContext();
  console.log('user :>> ', user);
  const getProduct = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(query(collection(firestore, 'users')));
      const array = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        array.push(data);
        console.log(doc.id, ' => ', data);
      });
      setUsers(array);
    } catch (err) {
      console.error('Error fetching users: ', err);
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const handleToggle = () => {
    console.log('users :>> ', users);
  } 

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text)=><p>{new Date(text*1000).toLocaleString()}</p>
    },

  ];
  const toggleButton = (
    <Button type="primary" onClick={handleToggle}>
      Toggle Data
    </Button>
  );
  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      {users.length ? toggleButton : null}
      <div
        style={{
          marginBlock: 8,
        }}
      />
      <Table
        bordered
        dataSource={users}
        columns={columns}
        locale={{
          emptyText: <Empty description="No Data">{toggleButton}</Empty>,
        }}
      />
    </ConfigProvider>
  );
}
export default User;