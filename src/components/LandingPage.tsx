import { useState, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Star, Users, TrendingUp, Shield, Zap, Award, Target, BarChart3, Clock, Globe, Mail, Phone, MapPin, X } from 'lucide-react';
import VertixLogo from './VertixLogo';

interface LandingPageProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

interface PlanFormModalProps {
  isOpen: boolean;
  planName: string;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; phone: string; planName: string }) => void;
}

function PlanFormModal({ isOpen, planName, onClose, onSubmit }: PlanFormModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ ...formData, planName });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-poppins">
                Solicitar Plano {planName}
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-vertix-400 focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Seu nome completo"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-vertix-400 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-vertix-400 focus:border-transparent transition-all ${
                    errors.phone ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="(92) 99999-9999"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 bg-vertix-gradient text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Enviar
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LandingPage({ onLoginClick, onSignUpClick }: LandingPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanClick = useCallback((planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  }, []);

  const handleFormSubmit = useCallback(({ name, email, phone, planName }: { name: string; email: string; phone: string; planName: string }) => {
    // Formatar mensagem para WhatsApp
    const message = `Quero aderir ao plano ${planName}, meus dados são: ${name}, ${email}, ${phone}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Número do WhatsApp da Vertix (92) 99259-3777 -> 5592992593777
    const whatsappNumber = '5592992593777';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Redirecionar para WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Fechar modal
    setIsModalOpen(false);
    setSelectedPlan(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  }, []);

  const features = useMemo(() => [
    {
      icon: Target,
      title: 'Gamificação Inteligente',
      description: 'Sistema de pontos, rankings e badges que motiva sua equipe a alcançar melhores resultados.'
    },
    {
      icon: BarChart3,
      title: 'Metas e Objetivos',
      description: 'Defina metas claras e acompanhe o progresso em tempo real com nossa interface Kanban.'
    },
    {
      icon: TrendingUp,
      title: 'Relatórios Avançados',
      description: 'Dashboards completos com KPIs, métricas de desempenho e análises detalhadas.'
    },
    {
      icon: Users,
      title: 'Gestão de Equipes',
      description: 'Ferramentas completas para gestores acompanharem e motivarem suas equipes.'
    },
    {
      icon: Zap,
      title: 'Produtividade Máxima',
      description: 'Aumente a produtividade com sistema de recompensas e reconhecimento.'
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Dados protegidos com criptografia avançada e auditoria completa.'
    }
  ], []);

  const benefits = useMemo(() => [
    { icon: TrendingUp, text: 'Aumento de 40% na produtividade' },
    { icon: Users, text: 'Redução de 60% na rotatividade' },
    { icon: Star, text: 'Melhoria no clima organizacional' },
    { icon: Award, text: 'ROI comprovado em 90 dias' }
  ], []);

  const detailedBenefits = useMemo(() => [
    {
      icon: TrendingUp,
      title: 'Aumento da Produtividade',
      description: 'Nossos clientes relatam um aumento médio de 40% na produtividade das equipes após implementar o sistema de gamificação.',
      stats: '+40% produtividade'
    },
    {
      icon: Users,
      title: 'Redução da Rotatividade',
      description: 'Funcionários mais engajados permanecem mais tempo na empresa, reduzindo custos de recrutamento e treinamento.',
      stats: '-60% rotatividade'
    },
    {
      icon: Star,
      title: 'Clima Organizacional',
      description: 'Ambiente de trabalho mais positivo e colaborativo através de reconhecimento e competição saudável.',
      stats: '95% satisfação'
    },
    {
      icon: Award,
      title: 'Retorno do Investimento',
      description: 'ROI comprovado em até 90 dias com métricas claras de desempenho e resultados mensuráveis.',
      stats: 'ROI em 90 dias'
    },
    {
      icon: Clock,
      title: 'Economia de Tempo',
      description: 'Automatização de processos e melhor organização das tarefas economizam horas de trabalho por semana.',
      stats: '20h/semana economizadas'
    },
    {
      icon: BarChart3,
      title: 'Métricas Precisas',
      description: 'Dashboards em tempo real fornecem insights valiosos para tomada de decisões estratégicas.',
      stats: '100% visibilidade'
    }
  ], []);

  const pricingPlans = useMemo(() => [
    {
      name: 'Starter',
      price: 'R$ 29,97',
      period: '/mês',
      description: 'Ideal para começar - teste gratuito por 3 dias',
      features: [
        'Até 5 usuários',
        'Dashboard básico',
        'Sistema de pontos',
        'Relatórios básicos',
        'Suporte por email'
      ],
      popular: false,
      color: 'blue'
    },
    {
      name: 'Professional',
      price: 'R$ 49,98',
      period: '/mês',
      description: 'Para pequenas empresas em crescimento',
      features: [
        'Até 30 usuários',
        'Dashboard avançado',
        'Gamificação completa',
        'Gestão de equipes',
        'Integrações básicas',
        'Suporte prioritário'
      ],
      popular: false,
      color: 'purple'
    },
    {
      name: 'Explorer',
      price: 'R$ 79,97',
      period: '/mês',
      description: 'Recursos avançados para empresas em expansão',
      features: [
        'Até 50 usuários',
        'Relatórios em tempo real',
        'API para integrações',
        'Análise de produtividade',
        'Automações avançadas',
        'Suporte prioritário 24/7'
      ],
      popular: true,
      color: 'green'
    },
    {
      name: 'Enterprise',
      price: 'Personalizado',
      period: '',
      description: 'Solução sob medida para grandes organizações',
      features: [
        'Usuários ilimitados',
        'Tudo do Explorer',
        'Dashboard executivo',
        'Integrações personalizadas',
        'White-label completo (marca própria)',
        'Treinamento completo da equipe'
      ],
      popular: false,
      color: 'purple'
    }
  ], []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }), []);

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-effect border-b border-slate-200/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <VertixLogo size="md" className="shadow-lg" />
              <span className="text-2xl sm:text-3xl font-bold font-poppins gradient-text">
                Vertix
              </span>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-vertix-400 transition-colors font-medium">Funcionalidades</a>
              <a href="#benefits" className="text-slate-600 hover:text-vertix-400 transition-colors font-medium">Benefícios</a>
              <a href="#pricing" className="text-slate-600 hover:text-vertix-400 transition-colors font-medium">Preços</a>
            </nav>
            
            <motion.button
              onClick={onLoginClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-vertix-gradient text-white px-4 py-2 sm:px-8 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
            >
              Entrar
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"></div>
        <motion.div 
          className="max-w-7xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <span className="bg-vertix-gradient text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              Revolucione sua gestão de equipes
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-tight font-poppins"
          >
            <span className="bg-gradient-to-r from-slate-900 via-vertix-blue-800 to-vertix-dark-800 bg-clip-text text-transparent text-shadow">
              Transforme Tarefas em
            </span>
            <br />
            <motion.span 
              className="gradient-text"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Conquistas
            </motion.span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
          >
            Plataforma completa de gamificação que aumenta produtividade, 
            engajamento e satisfação das equipes através de metas, 
            rankings e recompensas inteligentes.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4"
          >
            <motion.button
              onClick={onSignUpClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto group bg-vertix-gradient text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
            >
              Começar Gratuitamente
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
            
            <motion.button 
              onClick={onLoginClick}
              whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto text-slate-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:text-vertix-400 transition-colors border-2 border-slate-200 hover:border-vertix-300"
            >
              Já tenho conta
            </motion.button>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center px-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col sm:flex-row items-center justify-center p-4 glass-effect rounded-xl border border-slate-200/50"
              >
                <benefit.icon className="w-5 h-5 text-vertix-400 mb-2 sm:mb-0 sm:mr-2 flex-shrink-0" />
                <span className="text-slate-700 font-medium text-sm sm:text-base text-center sm:text-left">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 font-poppins">
              <span className="gradient-text">
                Funcionalidades que Fazem a Diferença
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Tudo que você precisa para transformar sua equipe em uma máquina de alta performance
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group glass-effect p-6 sm:p-8 rounded-3xl border border-slate-200/50 hover:border-vertix-300/50 transition-all duration-300 hover:shadow-2xl"
              >
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-vertix-100 to-vertix-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-vertix-600" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-900 font-poppins">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 font-poppins">
              <span className="gradient-text">
                Benefícios Comprovados
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Resultados reais que nossos clientes alcançaram com o Vertix
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {detailedBenefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group glass-effect p-6 sm:p-8 rounded-3xl border border-slate-200/50 hover:border-vertix-300/50 transition-all duration-300 hover:shadow-2xl"
              >
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-vertix-100 to-vertix-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-vertix-600" />
                </motion.div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-poppins">{benefit.title}</h3>
                  <span className="text-xs sm:text-sm font-bold text-vertix-600 bg-vertix-100 px-2 py-1 rounded-full">
                    {benefit.stats}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 font-poppins">
              <span className="gradient-text">
                Planos que Cabem no seu Orçamento
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Escolha o plano ideal para sua empresa e comece a transformar sua equipe hoje mesmo
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className={`relative glass-effect p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl ${
                  plan.popular 
                    ? 'border-vertix-blue-300 ring-2 ring-vertix-200 shadow-xl bg-gradient-to-br from-vertix-50 to-vertix-blue-50' 
                    : 'border-slate-200/50 hover:border-vertix-300/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-600 text-sm sm:text-base">{plan.period}</span>}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm">{plan.description}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-vertix-500 mr-2 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  onClick={() => handlePlanClick(plan.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-vertix-gradient text-white hover:shadow-xl'
                      : 'bg-white text-slate-900 border-2 border-slate-200 hover:border-vertix-300 hover:bg-slate-50'
                  }`}
                >
                  Começar Agora
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-vertix-dark-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D4FF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="mb-6 sm:mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-16 h-16 sm:w-20 sm:h-20 text-vertix-400 mx-auto" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 font-poppins text-shadow">
            Pronto para Transformar sua Empresa?
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já revolucionaram 
            sua gestão de equipes com o Vertix
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <motion.button
              onClick={onSignUpClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-vertix-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-50 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center"
            >
              <Award className="w-6 h-6 mr-3" />
              Comece Agora
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-slate-300 text-xs sm:text-sm mt-6">
            <span className="flex items-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Configuração rápida
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Suporte dedicado
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Resultados imediatos
            </span>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-vertix-dark-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <VertixLogo size="md" />
                <span className="text-2xl font-bold font-poppins">Vertix</span>
              </div>
              <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-base max-w-md">
                Transformando equipes através da gamificação inteligente. 
                Aumente a produtividade, engajamento e satisfação dos seus colaboradores.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-vertix-dark-800 rounded-lg flex items-center justify-center hover:bg-vertix-600 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-vertix-dark-800 rounded-lg flex items-center justify-center hover:bg-vertix-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-poppins">Links Rápidos</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><a href="#features" className="text-slate-400 hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#benefits" className="text-slate-400 hover:text-white transition-colors">Benefícios</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Preços</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-poppins">Suporte</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Tutoriais</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Status do Sistema</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contato</a></li>
                <li>
                  <div className="flex items-center text-slate-400 mt-4">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">(92) 99259-3777</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-slate-400">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">contato@vertixgame.com</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center text-slate-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Manaus - AM</span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="border-t border-vertix-dark-800 pt-3 sm:pt-4 flex flex-col sm:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-500 text-xs sm:text-sm mb-4 sm:mb-0">
              © 2025 Vertix. Todos os direitos reservados.
            </p>
            <div className="flex flex-col items-center sm:items-end gap-2 sm:gap-3 text-xs sm:text-sm">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Política de Privacidade</a>
              <p className="text-gray-300 text-xs">
                Desenvolvido por{' '}
                <a 
                  href="https://www.kvgroupbr.com.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors duration-300 font-semibold"
                >
                  KV <span className="text-yellow-400 font-bold">Group</span>
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Plan Form Modal */}
      {selectedPlan && (
        <PlanFormModal
          isOpen={isModalOpen}
          planName={selectedPlan}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}

export default memo(LandingPage);