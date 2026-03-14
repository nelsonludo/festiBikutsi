import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Lock, Mail, Loader2 } from "lucide-react";
import api from "../../api.ts";
import type { ServerError } from "../../types";

import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { LogoContainer } from "../../components/Navbar.tsx";

const loginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .email(t("admin.login.emailError") || "Invalid email address"),
    password: z
      .string()
      .min(
        6,
        t("admin.login.passwordError") ||
          "Password must be at least 6 characters",
      ),
  });

type LoginForm = z.infer<ReturnType<typeof loginSchema>>;

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema(t)),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await api.post("/auth/login", data);
      toast.success(t("admin.login.welcome"));
      navigate("/admin");
    } catch (error) {
      const err = error as ServerError;
      toast.error(err.response?.data?.message || t("admin.login.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full">
        <div className="text-center mb-10 flex flex-col items-center">
          <LogoContainer variant />
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2 uppercase">
            FESTI<span className="text-secondary">BIKUTSI</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
            {t("admin.login.title")}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">
                {t("admin.login.email")}
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900"
                  placeholder="admin@festibikutsi.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 px-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 px-1">
                {t("admin.login.password")}
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  {...register("password")}
                  type="password"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-2 px-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                t("admin.login.signIn")
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
          {t("admin.login.subtitle")}
        </p>
      </div>
    </div>
  );
};

export default Login;
