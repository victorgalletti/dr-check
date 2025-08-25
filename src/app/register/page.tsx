"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/common/AuthLayout";
import InputField from "@/components/common/InputField";
import GoogleLoginButton from "@/components/common/GoogleLoginButton";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    }

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "A confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Register attempt:", formData);
  };

  const handleGoogleLogin = () => {
    console.log("Google register attempt");
  };

  return (
    <AuthLayout title="Criar Conta">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          name="fullName"
          type="text"
          placeholder="Nome Completo"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          icon={<User className="w-5 h-5" />}
        />

        <InputField
          name="email"
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          icon={<Mail className="w-5 h-5" />}
        />

        <div className="relative">
          <InputField
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            icon={<Lock className="w-5 h-5" />}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="relative">
          <InputField
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar Senha"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            icon={<Lock className="w-5 h-5" />}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label={
              showConfirmPassword ? "Esconder senha" : "Mostrar senha"
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg w-full px-8 py-3 text-base font-medium text-[var(--accent-foreground)] bg-[var(--dr-green)] transition-opacity hover:opacity-90"
        >
          Criar Conta
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--card-border)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[var(--card-bg)] px-4 text-[var(--text-secondary)] rounded-md">
              ou
            </span>
          </div>
        </div>

        <GoogleLoginButton onClick={handleGoogleLogin}>
          Registrar com Google
        </GoogleLoginButton>

        <div className="text-center">
          <span className="text-[var(--text-secondary)] text-sm">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-[var(--dr-green)] hover:underline font-medium transition-colors"
            >
              Entrar
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
