import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus, CheckCircle, XCircle, Sun, Moon, Shield, User, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { useTheme } from '../context/ThemeContext';
import {
  getAllUsers,
  getPendingUsers,
  approveUser,
  rejectUser,
  promoteToAdmin,
  getCurrentUser,
  createUserByAdmin,
  resetUserPassword,
  type User as UserType
} from '../lib/firebase-service';
import { toast } from 'sonner';
import { CreateUserDialog } from '../components/CreateUserDialog';

interface AdminUserManagementPageProps {
  onBack: () => void;
}

export function AdminUserManagementPage({ onBack }: AdminUserManagementPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [users, setUsers] = useState<UserType[]>([]);
  const [pendingUsers, setPendingUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('pending');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const [allUsers, pending] = await Promise.all([
        getAllUsers(),
        getPendingUsers(),
      ]);
      setUsers(allUsers);
      setPendingUsers(pending);
    } catch (error) {
      toast.error('Failed to load users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUser = async (userId: string) => {
    if (!currentUser) return;
    
    try {
      await approveUser(userId, currentUser.uid);
      toast.success('User approved successfully');
      loadUsers();
    } catch (error) {
      toast.error('Failed to approve user');
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      await rejectUser(userId);
      toast.success('User registration rejected');
      loadUsers();
    } catch (error) {
      toast.error('Failed to reject user');
    }
  };

  const handlePromoteToAdmin = async (userId: string) => {
    try {
      await promoteToAdmin(userId);
      toast.success('User promoted to admin');
      loadUsers();
    } catch (error) {
      toast.error('Failed to promote user');
    }
  };

  const handleCreateUser = async (userData: {
    email: string;
    displayName: string;
    password: string;
    role: 'worker' | 'admin';
  }) => {
    if (!currentUser) return;

    await createUserByAdmin({
      ...userData,
      createdBy: currentUser.uid,
    });

    toast.success(
      <div>
        <p className="font-medium">User created successfully!</p>
        <p className="text-xs mt-1">Email: {userData.email}</p>
        <p className="text-xs">Password: {userData.password}</p>
        <p className="text-xs text-yellow-400 mt-1">⚠️ Save these credentials - they won't be shown again</p>
      </div>,
      { duration: 10000 }
    );

    loadUsers();
  };

  const handleResetPassword = async (userId: string, _userEmail: string) => {
    const tempPassword = `Temp${Math.random().toString(36).slice(-8)}!`;
    
    try {
      await resetUserPassword(userId, tempPassword);
      toast.success(
        <div>
          <p className="font-medium">Password reset successfully!</p>
          <p className="text-xs mt-1">New temporary password: {tempPassword}</p>
          <p className="text-xs text-yellow-400 mt-1">⚠️ User must change this on next login</p>
        </div>,
        { duration: 10000 }
      );
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#111111]' : 'bg-[#F5F4F1]'}`}>
      <HorseshoeCursor />
      
      {/* Header */}
      <div className={`border-b ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
                className={theme === 'dark' ? 'text-[#C9A24E] hover:bg-white/5' : 'text-[#A88B63] hover:bg-black/5'}
              >
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className={`text-2xl font-display ${theme === 'dark' ? 'text-[#C9A24E]' : 'text-[#0F0F0F]'}`}>
                  User Management
                </h1>
                {pendingUsers.length > 0 && (
                  <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                    {pendingUsers.length} pending approval
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-[#C9A24E] hover:bg-[#A88B63] text-white"
              >
                <UserPlus size={18} className="mr-2" />
                Create User
              </Button>
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className={theme === 'dark' ? 'text-[#C9A24E] hover:bg-white/5' : 'text-[#A88B63] hover:bg-black/5'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('pending')}
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            className={activeTab === 'pending'
              ? 'bg-[#C9A24E] text-white hover:bg-[#A88B63]'
              : theme === 'dark'
                ? 'border-[#C9A24E]/30 text-white hover:bg-white/5'
                : 'border-[#A88B63]/40 text-[#0F0F0F] hover:bg-black/5'
            }
          >
            <UserPlus size={18} className="mr-2" />
            Pending Approvals
            {pendingUsers.length > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'pending' ? 'bg-white/20' : 'bg-yellow-600/20 text-yellow-400'
              }`}>
                {pendingUsers.length}
              </span>
            )}
          </Button>
          <Button
            onClick={() => setActiveTab('all')}
            variant={activeTab === 'all' ? 'default' : 'outline'}
            className={activeTab === 'all'
              ? 'bg-[#C9A24E] text-white hover:bg-[#A88B63]'
              : theme === 'dark'
                ? 'border-[#C9A24E]/30 text-white hover:bg-white/5'
                : 'border-[#A88B63]/40 text-[#0F0F0F] hover:bg-black/5'
            }
          >
            <User size={18} className="mr-2" />
            All Users
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeTab === 'all' 
                ? 'bg-white/20' 
                : theme === 'dark' 
                  ? 'bg-[#C9A24E]/20 text-[#C9A24E]' 
                  : 'bg-[#A88B63]/20 text-[#A88B63]'
            }`}>
              {users.length}
            </span>
          </Button>
        </div>

        {loading ? (
          <Card className={`p-12 text-center ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
            <p className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>Loading users...</p>
          </Card>
        ) : (
          <>
            {/* Pending Users */}
            {activeTab === 'pending' && (
              <div className="grid gap-4">
                {pendingUsers.length === 0 ? (
                  <Card className={`p-12 text-center ${theme === 'dark' ? 'bg-[#0F0F0F] border-[#C9A24E]/20' : 'bg-white border-[#C9A24E]/30'}`}>
                    <UserPlus size={48} className="mx-auto mb-4 text-[#C9A24E]/50" />
                    <p className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>
                      No pending user registrations
                    </p>
                  </Card>
                ) : (
                  pendingUsers.map((user) => (
                    <motion.div
                      key={user.uid}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card 
                        className={`p-6 ${
                          theme === 'dark'
                            ? 'bg-[#0F0F0F] border-[#C9A24E]/20'
                            : 'bg-white border-[#C9A24E]/30'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className={`font-display text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                                {user.displayName}
                              </h3>
                              <span className="px-3 py-1 rounded-full text-xs bg-yellow-600/20 text-yellow-400">
                                Pending Approval
                              </span>
                            </div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-1`}>
                              {user.email}
                            </p>
                            <p className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                              Registered: {new Date(user.createdAt).toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleApproveUser(user.uid)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle size={18} className="mr-2" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleRejectUser(user.uid)}
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-500/10"
                            >
                              <XCircle size={18} className="mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {/* All Users */}
            {activeTab === 'all' && (
              <div className="grid gap-4">
                {users.map((user) => (
                  <motion.div
                    key={user.uid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card 
                      className={`p-6 ${
                        theme === 'dark'
                          ? 'bg-[#0F0F0F] border-[#C9A24E]/20'
                          : 'bg-white border-[#C9A24E]/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`font-display text-lg ${theme === 'dark' ? 'text-white' : 'text-[#0F0F0F]'}`}>
                              {user.displayName}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              user.role === 'admin' ? 'bg-purple-600/20 text-purple-400' :
                              user.role === 'worker' ? 'bg-blue-600/20 text-blue-400' :
                              'bg-yellow-600/20 text-yellow-400'
                            }`}>
                              {user.role === 'admin' && <Shield size={12} className="inline mr-1" />}
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </div>
                          <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-1`}>
                            {user.email}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                            Joined: {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          {user.role === 'worker' && (
                            <Button
                              onClick={() => handlePromoteToAdmin(user.uid)}
                              variant="outline"
                              size="sm"
                              className={theme === 'dark' ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' : 'border-purple-600 text-purple-600 hover:bg-purple-500/10'}
                            >
                              <Shield size={16} className="mr-2" />
                              Promote
                            </Button>
                          )}
                          <Button
                            onClick={() => handleResetPassword(user.uid, user.email)}
                            variant="outline"
                            size="sm"
                            className={theme === 'dark' ? 'border-[#C9A24E] text-[#C9A24E] hover:bg-[#C9A24E]/10' : 'border-[#A88B63] text-[#A88B63] hover:bg-[#A88B63]/10'}
                          >
                            <Lock size={16} className="mr-2" />
                            Reset Password
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Create User Dialog */}
      <CreateUserDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onCreateUser={handleCreateUser}
        theme={theme}
      />
    </div>
  );
}