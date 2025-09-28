import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('alivio_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('alivio_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would call Shopify Customer API
    const mockUser = {
      id: Date.now().toString(),
      email,
      firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      lastName: 'Operative',
      joinDate: new Date().toISOString(),
      accessLevel: 'CLASSIFIED',
      orders: [
        {
          id: 'ALV-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
          date: '2024-01-15',
          status: 'DELIVERED',
          total: 89.99,
          items: [
            { name: 'Euphoria Tee Vol-1', size: 'L', quantity: 1 }
          ],
          tracking: 'TRK-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
          deliveryAddress: '123 Underground Facility, Classified Location'
        },
        {
          id: 'ALV-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
          date: '2024-01-10',
          status: 'IN_TRANSIT',
          total: 129.99,
          items: [
            { name: 'Rage Combat Pants', size: 'M', quantity: 1 }
          ],
          tracking: 'TRK-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
          estimatedDelivery: '2024-01-20'
        }
      ]
    };

    localStorage.setItem('alivio_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
    return { success: true };
  };

  const register = async (formData) => {
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock registration - in real app, this would call Shopify Customer API
    const newUser = {
      id: Date.now().toString(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      joinDate: new Date().toISOString(),
      accessLevel: 'CLASSIFIED',
      orders: []
    };

    localStorage.setItem('alivio_user', JSON.stringify(newUser));
    setUser(newUser);
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('alivio_user');
    localStorage.removeItem('alivio_cart');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('alivio_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setLoading(false);
    return { success: true };
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};