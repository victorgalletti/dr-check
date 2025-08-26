"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import AuthLayout from "@/components/common/AuthLayout";
import InputField from "@/components/common/InputField";
import GoogleLoginButton from "@/components/common/GoogleLoginButton";
import { Checkbox } from "@/components/common/checkbox";

const Login: React.FC = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
    }
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await signIn(formData.email, formData.password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setFormError(result.message || "E-mail ou senha inválidos.");
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          name="email"
          type="email"
          placeholder="E-mail ou CPF"
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

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  rememberMe: e.target.checked,
                }))
              }
            />
            <label
              htmlFor="rememberMe"
              className="text-sm text-[var(--text-secondary)] cursor-pointer"
            >
              Lembrar de mim
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-[var(--dr-green)] hover:underline transition-colors"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        {formError && (
          <div className="text-red-500 text-sm text-center mb-2">
            {formError}
          </div>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg w-full px-8 py-3 text-base font-medium text-[var(--accent-foreground)] bg-[var(--dr-green)] transition-opacity hover:opacity-90"
        >
          Entrar
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

        <GoogleLoginButton onClick={signInWithGoogle}>
          Entrar com Google
        </GoogleLoginButton>

        <div className="text-center">
          <span className="text-[var(--text-secondary)] text-sm">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="text-[var(--dr-green)] hover:underline font-medium transition-colors"
            >
              Criar conta
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
