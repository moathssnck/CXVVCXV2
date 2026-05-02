"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Add your own authentication logic here
    console.log("Form submitted:", formData);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 p-4 rounded-full">
            <User className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div>
          <Card className="border-0 shadow-xl bg-gray-800 text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>

            <CardHeader className="space-y-1 text-center pt-8">
              <CardTitle className="text-2xl font-bold text-white">
                تسجيل الدخول
              </CardTitle>
              <p className="text-gray-400 text-sm">
                أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك
              </p>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-300"
                  >
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="ادخل البريد الإلكتروني"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-4"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-300"
                    >
                      كلمة المرور
                    </label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="ادخل كلمة المرور"
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-4"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-green-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                  >
                    تذكرني
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>جاري تسجيل الدخول...</span>
                    </div>
                  ) : (
                    <>
                      <span>تسجيل الدخول</span>
                      <LogIn className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </div>
  );
}
