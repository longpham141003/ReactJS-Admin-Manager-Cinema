// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Import thư viện jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Kiểm tra trạng thái đăng nhập khi ứng dụng được tải lại
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const expiryTime = decodedToken.exp * 1000; // Chuyển "exp" từ giây sang milliseconds

                if (new Date().getTime() < expiryTime) {
                    setIsAuthenticated(true); // Token hợp lệ
                } else {
                    logout(); // Token hết hạn
                }
            } catch (error) {
                console.error('Lỗi khi giải mã token:', error);
                logout(); // Token không hợp lệ
            }
        }
    }, []);

    // Hàm login - Lưu token vào localStorage
    const login = (accessToken) => {
        try {
            const decodedToken = jwtDecode(accessToken);
            const expiryTime = decodedToken.exp * 1000; // Chuyển "exp" từ giây sang milliseconds

            if (new Date().getTime() >= expiryTime) {
                console.error('Access token đã hết hạn.');
                return;
            }

            setIsAuthenticated(true);
            localStorage.setItem('accessToken', accessToken);
        } catch (error) {
            console.error('Lỗi khi xử lý access token:', error);
        }
    };

    // Hàm logout - Xóa token và trạng thái đăng nhập
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
