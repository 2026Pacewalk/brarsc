import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, EyeOff, LogIn, UserPlus, Shield,
  User, AtSign, Lock, KeyRound, CheckCircle2,
  GraduationCap, Crown, Zap
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type Tab = 'student-login' | 'admin-login' | 'register';

/* Shake animation keyframes */
const shakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -10, 10, -10, 10, -6, 6, -3, 3, 0],
    transition: { duration: 0.5, ease: 'easeInOut' as const },
  },
};

/* Pop animation for input focus */
const popVariants = {
  initial: { scale: 1 },
  focus: { scale: 1.02, transition: { type: 'spring' as const, stiffness: 400, damping: 15 } },
  blur: { scale: 1, transition: { type: 'spring' as const, stiffness: 400, damping: 15 } },
};

/* Input field component with pop effect */
function PopInput({
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: typeof User }) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      variants={popVariants}
      animate={focused ? 'focus' : 'blur'}
      className="relative"
    >
      <Icon
        size={16}
        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10 ${
          focused ? 'text-[#F26522]' : 'text-[#9A9AAA]'
        }`}
      />
      <input
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        className={`w-full h-12 bg-[#FAFAFA] border rounded-xl pl-11 pr-4 text-sm outline-none transition-all duration-200 ${
          focused
            ? 'border-[#F26522] shadow-[0_0_0_3px_rgba(242,101,34,0.15)] bg-white'
            : 'border-[#E8E4E0] hover:border-[#d0ccc8]'
        } ${props.className || ''}`}
      />
    </motion.div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('student-login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    adminCode: '',
    rememberMe: false,
    agreeTerms: false,
  });

  /* Trigger shake when error changes */
  useEffect(() => {
    if (error) {
      setShakeKey((prev) => prev + 1);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!formData.password.trim()) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);

    try {
      if (activeTab === 'register') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (!formData.agreeTerms) {
          setError('Please agree to the Terms & Conditions');
          setLoading(false);
          return;
        }
        const ok = await register(formData.name, formData.email, formData.password);
        if (ok) {
          setSuccess(true);
          setTimeout(() => navigate('/'), 1500);
        } else {
          setError('Registration failed. Please try again.');
        }
      } else if (activeTab === 'student-login') {
        const ok = await login(formData.email, formData.password, 'student');
        if (ok) {
          setSuccess(true);
          setTimeout(() => navigate('/dashboard'), 1500);
        } else {
          setError('Invalid email or password');
        }
      } else {
        const ok = await login(formData.email, formData.password, 'superadmin', formData.adminCode);
        if (ok) {
          setSuccess(true);
          setTimeout(() => navigate('/admin'), 1500);
        } else {
          setError('Invalid admin credentials or access code');
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof LogIn }[] = [
    { id: 'student-login', label: 'Student Login', icon: LogIn },
    { id: 'admin-login', label: 'Super Admin', icon: Shield },
  ];

  return (
    <main className="pt-[112px] lg:pt-[164px] min-h-screen flex items-center justify-center bg-[#FFFBF7] py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[440px] mx-4"
      >
        {/* Card with shake animation */}
        <motion.div
          key={shakeKey}
          variants={shakeVariants}
          initial="idle"
          animate={error ? 'shake' : 'idle'}
          className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_8px_24px_rgba(26,26,46,0.12)] border border-[#E8E4E0]/40"
        >
          {/* Logo */}
          <div className="text-center mb-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-gradient-to-br from-[#F26522] to-[#FF8A50] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-lg shadow-[#F26522]/20"
            >
              B
            </motion.div>
            <h2 className="mt-3 text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {activeTab === 'register' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-[#5A5A6E] mt-1">
              {activeTab === 'register' ? 'Join Brar Scribbles community' : 'Login to your account'}
            </p>
          </div>

          {/* Tabs */}
          {activeTab !== 'register' && (
            <div className="flex border-b border-[#E8E4E0] mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 pb-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[#F26522] text-[#F26522]'
                      : 'border-transparent text-[#9A9AAA] hover:text-[#5A5A6E]'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
              >
                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-3"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 10 }}
                >
                  <CheckCircle2 size={22} className="text-green-600" />
                </motion.div>
                <div>
                  <p className="font-medium">Success!</p>
                  <p className="text-xs text-green-600">Redirecting you...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' as const }}
                  className="w-8 h-8 border-2 border-[#F26522] border-t-transparent rounded-full mx-auto"
                />
              </motion.div>
            ) : (
              <motion.form
                key={`${activeTab}-form`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
              >
                {/* Register extra fields */}
                <AnimatePresence>
                  {activeTab === 'register' && (
                    <motion.div
                      key="register-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                          Full Name <span className="text-[#EF4444]">*</span>
                        </label>
                        <PopInput
                          icon={User}
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                          Phone <span className="text-[#9A9AAA]">(Optional)</span>
                        </label>
                        <PopInput
                          icon={AtSign}
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                    Email <span className="text-[#EF4444]">*</span>
                  </label>
                  <PopInput
                    icon={AtSign}
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                    Password <span className="text-[#EF4444]">*</span>
                  </label>
                  <div className="relative">
                    <motion.div
                      variants={popVariants}
                      animate={showPassword ? 'focus' : 'blur'}
                      className="relative"
                    >
                      <Lock
                        size={16}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10 ${
                          showPassword ? 'text-[#F26522]' : 'text-[#9A9AAA]'
                        }`}
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`w-full h-12 bg-[#FAFAFA] border rounded-xl pl-11 pr-12 text-sm outline-none transition-all duration-200 ${
                          showPassword
                            ? 'border-[#F26522] shadow-[0_0_0_3px_rgba(242,101,34,0.15)] bg-white'
                            : 'border-[#E8E4E0] hover:border-[#d0ccc8]'
                        }`}
                      />
                    </motion.div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9AAA] hover:text-[#F26522] transition-colors z-10"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <AnimatePresence>
                  {activeTab === 'register' && (
                    <motion.div
                      key="confirm-password"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                        Confirm Password <span className="text-[#EF4444]">*</span>
                      </label>
                      <PopInput
                        icon={Lock}
                        type="password"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Admin Code */}
                <AnimatePresence>
                  {activeTab === 'admin-login' && (
                    <motion.div
                      key="admin-code"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
                        Admin Access Code <span className="text-[#EF4444]">*</span>
                      </label>
                      <PopInput
                        icon={KeyRound}
                        type="password"
                        name="adminCode"
                        required
                        value={formData.adminCode}
                        onChange={handleChange}
                        placeholder="Enter admin access code"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Remember me / Terms */}
                {activeTab === 'student-login' && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-[#5A5A6E] cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-[#E8E4E0] text-[#F26522] focus:ring-[#F26522]"
                      />
                      Remember me
                    </label>
                    <button type="button" className="text-sm text-[#F26522] hover:underline font-medium">
                      Forgot Password?
                    </button>
                  </div>
                )}

                {activeTab === 'register' && (
                  <label className="flex items-start gap-2 text-sm text-[#5A5A6E] cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-[#E8E4E0] text-[#F26522] focus:ring-[#F26522] mt-0.5"
                    />
                    <span>I agree to the <a href="#/terms" className="text-[#F26522] hover:underline">Terms & Conditions</a> and <a href="#/privacy" className="text-[#F26522] hover:underline">Privacy Policy</a></span>
                  </label>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full h-12 rounded-xl font-semibold text-[15px] text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${
                    activeTab === 'admin-login'
                      ? 'bg-gradient-to-r from-[#1A1A2E] to-[#2d2d4a] hover:shadow-[#1A1A2E]/30'
                      : 'bg-gradient-to-r from-[#F26522] to-[#FF8A50] hover:shadow-[#F26522]/30'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' as const }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      {activeTab === 'register' ? <UserPlus size={17} /> : <LogIn size={17} />}
                      {activeTab === 'student-login' && 'Student Login'}
                      {activeTab === 'admin-login' && 'Super Admin Login'}
                      {activeTab === 'register' && 'Create Account'}
                    </>
                  )}
                </motion.button>

                {/* Quick Test Login Buttons */}
                {activeTab !== 'register' && (
                  <div className="bg-gradient-to-br from-[#FFF0E8] to-[#FFFBF7] rounded-xl p-4 border border-[#F26522]/10">
                    <p className="text-xs text-[#9A9AAA] uppercase tracking-wider font-semibold mb-3 flex items-center gap-1.5">
                      <Zap size={12} className="text-[#F26522]" />
                      Quick Test Login
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Student Dummy Login */}
                      <motion.button
                        type="button"
                        onClick={async () => {
                          setError('');
                          setActiveTab('student-login');
                          const email = 'student@demo.com';
                          const password = 'demo123';
                          setFormData(prev => ({ ...prev, email, password }));
                          setLoading(true);
                          await new Promise(r => setTimeout(r, 400));
                          const ok = await login(email, password, 'student');
                          setLoading(false);
                          if (ok) {
                            setSuccess(true);
                            setTimeout(() => navigate('/dashboard'), 1200);
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col items-center gap-1.5 py-3 px-2 bg-white hover:bg-[#F26522] border border-[#E8E4E0] hover:border-[#F26522] rounded-xl transition-all duration-200 group cursor-pointer"
                      >
                        <div className="w-9 h-9 bg-[#FFF0E8] group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                          <GraduationCap size={18} className="text-[#F26522] group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-sm font-semibold text-[#1A1A2E] group-hover:text-white transition-colors">Student</span>
                        <span className="text-[10px] text-[#9A9AAA] group-hover:text-white/70 transition-colors">One-click login</span>
                      </motion.button>

                      {/* Super Admin Dummy Login */}
                      <motion.button
                        type="button"
                        onClick={async () => {
                          setError('');
                          setActiveTab('admin-login');
                          const email = 'admin@demo.com';
                          const password = 'admin123';
                          const adminCode = 'ADMIN123';
                          setFormData(prev => ({ ...prev, email, password, adminCode }));
                          setLoading(true);
                          await new Promise(r => setTimeout(r, 400));
                          const ok = await login(email, password, 'superadmin', adminCode);
                          setLoading(false);
                          if (ok) {
                            setSuccess(true);
                            setTimeout(() => navigate('/admin'), 1200);
                          } else {
                            setError('Admin login failed');
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col items-center gap-1.5 py-3 px-2 bg-white hover:bg-[#1A1A2E] border border-[#E8E4E0] hover:border-[#1A1A2E] rounded-xl transition-all duration-200 group cursor-pointer"
                      >
                        <div className="w-9 h-9 bg-[#1A1A2E]/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                          <Crown size={18} className="text-[#1A1A2E] group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-sm font-semibold text-[#1A1A2E] group-hover:text-white transition-colors">Super Admin</span>
                        <span className="text-[10px] text-[#9A9AAA] group-hover:text-white/70 transition-colors">One-click login</span>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E8E4E0]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs text-[#9A9AAA]">or</span>
                  </div>
                </div>

                {/* Google Login */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-12 bg-white border border-[#E8E4E0] hover:border-[#F26522]/30 text-[#1A1A2E] rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all hover:shadow-md"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z" />
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.836.86-3.048.86-2.344 0-4.328-1.583-5.035-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
                    <path fill="#FBBC05" d="M3.965 10.71A5.364 5.364 0 0 1 3.682 9c0-.593.102-1.166.283-1.71V4.958H.957A8.978 8.978 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.008-2.332z" />
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.965 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
                  </svg>
                  Continue with Google
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Toggle */}
          <div className="mt-6 pt-5 border-t border-[#E8E4E0] text-center">
            {activeTab === 'register' ? (
              <button
                onClick={() => { setActiveTab('student-login'); setError(''); }}
                className="text-sm text-[#5A5A6E]"
              >
                Already have an account?{' '}
                <span className="text-[#F26522] font-semibold hover:underline">Login</span>
              </button>
            ) : (
              <button
                onClick={() => { setActiveTab('register'); setError(''); }}
                className="text-sm text-[#5A5A6E]"
              >
                Don't have an account?{' '}
                <span className="text-[#F26522] font-semibold hover:underline">Register</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-6 text-[#9A9AAA] text-xs">
          <div className="flex items-center gap-1.5">
            <Lock size={12} />
            <span>Secure Login</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={12} />
            <span>256-bit SSL</span>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
