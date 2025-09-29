import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      setServerError('');
      const res = await login(formData);
      if (res.success) {
        navigate('/', { replace: true });
      } else {
        setServerError(res.error || 'Login failed');
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Login failed. Please try again.';
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-cardLg hover:shadow-cardHover border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="px-8 pt-8 pb-3 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Log in to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-3 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
                {serverError}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="input" placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">Password</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="input" placeholder="••••••••" />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3">
              {submitting ? 'Signing in...' : 'Sign in'}
            </button>

            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-accent hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


