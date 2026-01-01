import axios from 'axios';
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const useAxiosSecure = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    // Create axios instance only once
    const axiosSecure = axios.create({
        baseURL: `https://learning-server-10.vercel.app`,
        withCredentials: true
    });


    useEffect(() => {

        // REQUEST INTERCEPTOR
        const reqInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // RESPONSE INTERCEPTOR
        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log("AXIOS ERROR:", error);

                const statusCode = error?.response?.status;

                // Check login loop
                if ((statusCode === 401 || statusCode === 403) &&
                    window.location.pathname !== '/login') {
                    await signOut();
                    navigate('/login');
                }

                return Promise.reject(error);
            }
        );

        // Cleanup
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };

    }, [user, signOut, navigate, axiosSecure]);

    return axiosSecure;
};

export default useAxiosSecure;
