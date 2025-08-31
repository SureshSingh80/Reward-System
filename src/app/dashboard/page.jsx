// pages/dashboard.js
'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  User, 
  Award, 
  Calendar, 
  Edit2, 
  Save, 
  X, 
  Phone, 
  MapPin, 
  CreditCard, 
  Building, 
  DollarSign, 
  Gift, 
  CheckCircle, 
  Clock,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // User data state
  const [user, setUser] = useState({
    c_id: 'CUST001',
    name: 'Rajesh Kumar',
    phone: '9876543210',
    email: 'rajesh@email.com',
    address: '123 MG Road, Mumbai, Maharashtra 400001',
    totalPoints: 2750,
    bank_account_number: '1234567890123456',
    bank_name: 'State Bank of India',
    ifsc_code: 'SBIN0001234',
    profileImage: '/api/placeholder/100/100'
  });

  const [editFormData, setEditFormData] = useState({ ...user });

  // All coupons data (both claimed and unclaimed)
  const [allCoupons] = useState([
    {
      _id: '1',
      couponCode: 'CEM001ABC',
      rewardsPoint: 250,
      createdAt: '2025-01-15T10:30:00Z',
      isClaimed: true,
      claimedAt: '2025-01-15T10:30:00Z',
      redeemedBy: 'CUST001'
    },
    {
      _id: '2',
      couponCode: 'CEM002XYZ',
      rewardsPoint: 300,
      createdAt: '2025-01-18T14:15:00Z',
      isClaimed: true,
      claimedAt: '2025-01-18T14:15:00Z',
      redeemedBy: 'CUST001'
    },
    {
      _id: '3',
      couponCode: 'CEM003PQR',
      rewardsPoint: 200,
      createdAt: '2025-01-20T09:45:00Z',
      isClaimed: true,
      claimedAt: '2025-01-20T09:45:00Z',
      redeemedBy: 'CUST001'
    },
    {
      _id: '4',
      couponCode: 'CEM004MNO',
      rewardsPoint: 500,
      createdAt: '2025-01-22T16:20:00Z',
      isClaimed: true,
      claimedAt: '2025-01-22T16:20:00Z',
      redeemedBy: 'CUST001'
    },
    {
      _id: '5',
      couponCode: 'CEM005STU',
      rewardsPoint: 400,
      createdAt: '2025-01-25T11:30:00Z',
      isClaimed: true,
      claimedAt: '2025-01-25T11:30:00Z',
      redeemedBy: 'CUST001'
    },
    {
      _id: '6',
      couponCode: 'CEM006VWX',
      rewardsPoint: 350,
      createdAt: '2025-01-28T09:15:00Z',
      isClaimed: true,
      claimedAt: '2025-01-28T09:15:00Z',
      redeemedBy: 'CUST001'
    }
  ]);

  // Filter coupons based on user's claimed coupons
  const userCoupons = allCoupons.filter(coupon => 
    coupon.redeemedBy === user.c_id && coupon.isClaimed
  );

  // Filter coupons based on search and filter
  const filteredCoupons = userCoupons.filter(coupon => {
    const matchesSearch = coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'claimed' && coupon.isClaimed) ||
      (filterStatus === 'unclaimed' && !coupon.isClaimed);
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEditProfile = () => {
    setEditFormData({ ...user });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    try {
      // API call would go here
      // const response = await fetch('/api/user/update', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editFormData)
      // });
      
      setUser({ ...editFormData });
      setIsEditingProfile(false);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditFormData({ ...user });
    setIsEditingProfile(false);
  };

  const canWithdraw = user.totalPoints >= 1000;
  const pointsToWithdraw = Math.floor(user.totalPoints / 1000) * 1000;
  const remainingPoints = user.totalPoints % 1000;

  const handleWithdrawRequest = async () => {
    try {
      // API call would go here
      // const response = await fetch('/api/withdraw/request', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ points: pointsToWithdraw })
      // });
      
      setShowWithdrawModal(false);
      console.log('Withdrawal request submitted for:', pointsToWithdraw, 'points');
    } catch (error) {
      console.error('Error submitting withdrawal request:', error);
    }
  };

  const handleExportData = () => {
    const csvContent = [
      ['Coupon Code', 'Points', 'Claimed Date'],
      ...userCoupons.map(coupon => [
        coupon.couponCode,
        coupon.rewardsPoint,
        formatDate(coupon.claimedAt)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-coupons.csv';
    a.click();
  };

  return (
    <>
      <Head>
        <title>Cement Rewards Dashboard</title>
        <meta name="description" content="Manage your cement rewards and track your points" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Building className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-xl font-bold text-gray-900">CementRewards</span>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Settings className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </div>
                <button className="p-2 text-gray-500 hover:text-red-600">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header Stats */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                  <p className="text-orange-100">Customer ID: {user.c_id}</p>
                </div>
                <div className="text-right">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <Award className="h-6 w-6" />
                      <span className="text-3xl font-bold">{user.totalPoints}</span>
                    </div>
                    <p className="text-sm text-orange-100">Total Points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{userCoupons.length}</p>
                  <p className="text-gray-600 text-sm">Claimed Coupons</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">₹{Math.floor(user.totalPoints / 100)}</p>
                  <p className="text-gray-600 text-sm">Estimated Value</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{canWithdraw ? 'Yes' : 'No'}</p>
                  <p className="text-gray-600 text-sm">Withdrawal Ready</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 bg-orange-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{userCoupons.length > 0 ? userCoupons[userCoupons.length - 1].couponCode.slice(-3) : '---'}</p>
                  <p className="text-gray-600 text-sm">Last Coupon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Award className="h-4 w-4 inline mr-2" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('all-coupons')}
                  className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'all-coupons'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Gift className="h-4 w-4 inline mr-2" />
                  All Coupons ({userCoupons.length})
                </button>
                <button
                  onClick={() => setActiveTab('redeemed')}
                  className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'redeemed'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  Redeemed Coupons
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  Profile
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Withdrawal Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Withdrawal Status</h3>
                    <p className="text-gray-600">You need 1000 points to request withdrawal</p>
                  </div>
                  {canWithdraw && (
                    <button
                      onClick={() => setShowWithdrawModal(true)}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Request Withdrawal
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Points:</span>
                    <span className="font-semibold text-lg">{user.totalPoints}</span>
                  </div>
                  
                  {canWithdraw ? (
                    <>
                      <div className="flex justify-between items-center text-green-600">
                        <span>Eligible for Withdrawal:</span>
                        <span className="font-semibold text-lg">₹{Math.floor(pointsToWithdraw / 100)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Remaining Points:</span>
                        <span className="font-semibold">{remainingPoints}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center text-orange-600">
                      <span>Points needed for withdrawal:</span>
                      <span className="font-semibold">{1000 - user.totalPoints}</span>
                    </div>
                  )}
                  
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((user.totalPoints / 1000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0 points</span>
                    <span>1000 points</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {userCoupons.slice(-5).reverse().map((coupon) => (
                      <div key={coupon._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{coupon.couponCode}</p>
                            <p className="text-sm text-gray-500">Claimed on {formatDate(coupon.claimedAt)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">+{coupon.rewardsPoint} points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Coupons & Redeemed Coupons Tabs */}
          {(activeTab === 'all-coupons' || activeTab === 'redeemed') && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search by coupon code..."
                        className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <select
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="claimed">Claimed</option>
                      <option value="unclaimed">Unclaimed</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={handleExportData}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Coupons Grid */}
              <div className="grid gap-6">
                {filteredCoupons.map((coupon) => (
                  <div key={coupon._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <Gift className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{coupon.couponCode}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Claimed: {formatDate(coupon.claimedAt)}</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                              <span>Verified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-2 mb-1">
                          <Award className="h-5 w-5 text-orange-500" />
                          <span className="text-2xl font-bold text-orange-600">+{coupon.rewardsPoint}</span>
                        </div>
                        <p className="text-sm text-gray-500">Points</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCoupons.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No coupons found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                    <p className="text-gray-600">Manage your personal information and bank details</p>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={handleEditProfile}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {isEditingProfile ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          value={editFormData.phone}
                          onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                        value={editFormData.email}
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        rows="3"
                        value={editFormData.address}
                        onChange={(e) => setEditFormData({...editFormData, address: e.target.value})}
                      />
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Bank Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Number</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            value={editFormData.bank_account_number}
                            onChange={(e) => setEditFormData({...editFormData, bank_account_number: e.target.value})}
                            placeholder="Enter your bank account number"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            value={editFormData.bank_name}
                            onChange={(e) => setEditFormData({...editFormData, bank_name: e.target.value})}
                            placeholder="Enter your bank name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            value={editFormData.ifsc_code}
                            onChange={(e) => setEditFormData({...editFormData, ifsc_code: e.target.value})}
                            placeholder="Enter IFSC code"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-4 pt-6">
                      <button
                        onClick={handleCancelEdit}
                        className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <X className="h-4 w-4 inline mr-2" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 text-white bg-orange-600 border border-transparent rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <Save className="h-4 w-4 inline mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <User className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Full Name</p>
                              <p className="font-medium text-gray-900">{user.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Phone className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Phone Number</p>
                              <p className="font-medium text-gray-900">{user.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-400">📧</span>
                            <div>
                              <p className="text-sm text-gray-500">Email Address</p>
                              <p className="font-medium text-gray-900">{user.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Address</p>
                              <p className="font-medium text-gray-900">{user.address}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span className="text-gray-400">🆔</span>
                            <div>
                              <p className="text-sm text-gray-500">Customer ID</p>
                              <p className="font-medium text-gray-900">{user.c_id}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Bank Details</h3>
                        
                        {user.bank_account_number ? (
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Account Number</p>
                                <p className="font-mono text-sm font-medium text-gray-900">
                                  {user.bank_account_number.replace(/(.{4})/g, '$1 ')}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <Building className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Bank Name</p>
                                <p className="font-medium text-gray-900">{user.bank_name}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <span className="text-gray-400">#</span>
                              <div>
                                <p className="text-sm text-gray-500">IFSC Code</p>
                                <p className="font-mono text-sm font-medium text-gray-900">{user.ifsc_code}</p>
                              </div>
                            </div>

                            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                <div>
                                  <p className="text-sm font-medium text-green-800">Bank details verified</p>
                                  <p className="text-sm text-green-700">You can request withdrawals</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                              <Clock className="h-6 w-6 text-yellow-600 mr-3" />
                              <div>
                                <p className="font-medium text-yellow-800">Bank details not provided</p>
                                <p className="text-sm text-yellow-700">Add your bank details to enable withdrawals</p>
                              </div>
                            </div>
                            <button
                              onClick={handleEditProfile}
                              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                            >
                              Add Bank Details
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Account Statistics */}
                    <div className="border-t pt-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-6">Account Statistics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-blue-600">Total Points Earned</p>
                              <p className="text-2xl font-bold text-blue-900">{user.totalPoints}</p>
                            </div>
                            <Award className="h-8 w-8 text-blue-600" />
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-green-600">Coupons Redeemed</p>
                              <p className="text-2xl font-bold text-green-900">{userCoupons.length}</p>
                            </div>
                            <Gift className="h-8 w-8 text-green-600" />
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-purple-600">Account Value</p>
                              <p className="text-2xl font-bold text-purple-900">₹{Math.floor(user.totalPoints / 100)}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-purple-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Withdrawal Modal */}
          {showWithdrawModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-xl bg-white">
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Withdrawal Request</h3>
                    <button
                      onClick={() => setShowWithdrawModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                      <h4 className="font-medium text-green-800 mb-4">Withdrawal Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-green-700">Points to withdraw:</span>
                          <span className="font-semibold text-green-900">{pointsToWithdraw}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-700">Estimated amount:</span>
                          <span className="font-semibold text-green-900 text-lg">₹{Math.floor(pointsToWithdraw / 100)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-700">Remaining points:</span>
                          <span className="font-semibold text-green-900">{remainingPoints}</span>
                        </div>
                      </div>
                    </div>

                    {user.bank_account_number ? (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Bank Account Details</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-600">Account:</span> {user.bank_account_number}</p>
                          <p><span className="text-gray-600">Bank:</span> {user.bank_name}</p>
                          <p><span className="text-gray-600">IFSC:</span> {user.ifsc_code}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <X className="h-5 w-5 text-red-600 mr-3" />
                          <p className="text-sm text-red-700">Please add your bank details in Profile Settings before requesting withdrawal.</p>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Processing Time</p>
                          <p className="text-sm text-blue-700">Withdrawals are processed within 3-5 business days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-4 mt-8">
                    <button
                      onClick={() => setShowWithdrawModal(false)}
                      className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleWithdrawRequest}
                      disabled={!user.bank_account_number}
                      className="px-6 py-2 text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;