import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Mail, Shield, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import VertixLogo from './VertixLogo';

interface LoginFormProps {
  onBack: () => void;
  initialEmail?: string;
  onCreateAccount?: () => void;
}

export default function LoginForm({ onBack, initialEmail = '', onCreateAccount }: LoginFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      console.log('LoginForm: Attempting login');
      await login(email, password);
      console.log('LoginForm: Login successful');
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 font-inter">
      <motion.div 
        className="max-w-md w-full mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-slate-600 hover:text-vertix-400 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </motion.button>

        <motion.div 
          className="glass-effect rounded-3xl p-8 border border-slate-200/50 shadow-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <motion.div 
              className="mx-auto mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <VertixLogo size="lg" animated />
            </motion.div>
            <h1 className="text-2xl sm:text-4xl font-bold gradient-text font-poppins mb-2">
              Bem-vindo de volta
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">Entre com suas credenciais</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Demo Instructions */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-vertix-500 focus:border-transparent transition-all glass-effect"
                placeholder="seu@email.com"
                required
                disabled={isLoading}
              />
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-vertix-500 focus:border-transparent transition-all glass-effect"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xl disabled:opacity-50"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-vertix-gradient text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </motion.button>
          </form>

          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">ou</span>
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={onCreateAccount}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 bg-white border-2 border-vertix-300 text-vertix-600 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-vertix-50 hover:border-vertix-400"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Criar Nova Conta
          </motion.button>

          <motion.div 
            className="mt-8 pt-6 border-t border-slate-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-slate-600">
              Esqueceu sua senha?{' '}
              <button className="text-vertix-600 hover:text-vertix-700 font-semibold">
                Recuperar senha
              </button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}