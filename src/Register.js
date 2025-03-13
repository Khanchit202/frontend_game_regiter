import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    score: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://gamegl-scientia-test-data.onrender.com/api/auth/register',
        formData
      );

      // แสดง SweetAlert2 เมื่อลงทะเบียนสำเร็จ
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'ลงทะเบียนสำเร็จ',
          text: 'คุณได้ลงทะเบียนเรียบร้อยแล้ว',
        });
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลงทะเบียน:', error);

      // แสดง SweetAlert2 เมื่อมีข้อผิดพลาด
      if (error.response) {
        const { msg } = error.response.data;
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: msg || 'เกิดข้อผิดพลาดในการลงทะเบียน',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์',
        });
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '400px', padding: '20px', textAlign: 'center', boxShadow: '1px 1px 3px #ccc', borderRadius: '20px' }}>
            <h1>GAME REGISTER</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ textAlign: 'left' }}>
                <label>Username</label>
                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ textAlign: 'left' }}>
                <label>Email</label>
                <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ textAlign: 'left' }}>
                <label>Password</label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>
            <button
                type="submit"
                style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Register
            </button>
            </form>
        </div>
    </div>
  );
};

export default Register;