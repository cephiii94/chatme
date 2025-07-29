import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = user.id;
      let userProfile;
      const storedProfile = localStorage.getItem(`profile_${userId}`);
      if (storedProfile) {
        userProfile = JSON.parse(storedProfile);
        // PENTING: Pastikan properti level selalu ada, default ke 1 jika tidak ada
        if (userProfile.level === undefined || userProfile.level === null) {
          userProfile.level = 1;
        }
      } else {
        // Jika tidak ada storedProfile, inisialisasi dengan level 1
        userProfile = { ...user, coins: 2500, level: 1 };
      }
      setProfile(userProfile);

      const storedInventory = localStorage.getItem(`inventory_${userId}`);
      setInventory(storedInventory ? JSON.parse(storedInventory) : []);
      setLoading(false);
    } else {
      setProfile(null);
      setInventory([]);
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const updateCoins = (newCoinBalance) => {
    if (profile && user) {
      const updatedProfile = { ...profile, coins: newCoinBalance };
      setProfile(updatedProfile);
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
    }
  };

  const addItemToInventory = (item) => {
    if (user) {
      const newInventory = [...inventory, item];
      setInventory(newInventory);
      localStorage.setItem(`inventory_${user.id}`, JSON.stringify(newInventory));
    }
  };
  
  const resetUserData = () => {
    if (user) {
      const userId = user.id;
      localStorage.removeItem(`profile_${userId}`);
      localStorage.removeItem(`inventory_${userId}`);
    }
  };

  const consumeItem = (itemId) => {
    if (user) {
      const itemIndex = inventory.findIndex(item => item.id === itemId);
      if (itemIndex > -1) {
        const newInventory = [
          ...inventory.slice(0, itemIndex),
          ...inventory.slice(itemIndex + 1)
        ];
        setInventory(newInventory);
        localStorage.setItem(`inventory_${user.id}`, JSON.stringify(newInventory));
      }
    }
  };

  const value = {
    profile,
    inventory,
    loading,
    updateCoins,
    addItemToInventory,
    resetUserData,
    consumeItem,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
