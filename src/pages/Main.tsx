import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import OrderPage from '../components/OrderPage';
import { apiUrl } from '../api/api';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
// import heroImg from "../assets/heroImg.png"

export default function Main() {
    
    return (
        <div>
            <Navbar cartItemCount={1} />
            <OrderPage />
        </div>
    );
}