import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
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
      const res = await register(formData);
      if (res.success) {
        navigate('/', { replace: true });
      } else {
        setServerError(res.error || 'Registration failed');
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed. Please try again.';
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-cardLg hover:shadow-cardHover border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6 pt-6 pb-2 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Join and start writing</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-3 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
                {serverError}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Name</label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className="input" placeholder="Your name" />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="input" placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Password</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="input" placeholder="At least 6 characters" />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-2.5">
              {submitting ? 'Creating account...' : 'Sign up'}
            </button>

            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;


