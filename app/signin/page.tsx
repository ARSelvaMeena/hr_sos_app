"use client"; // Add this at the very top of your file

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [mfa, setMfa] = useState("");
  const [mfaRequired, setMfaRequired] = useState(false); // Control MFA field visibility
  const [step, setStep] = useState(1); // Control form steps (1: Email/Password, 2: MFA)

  // Email Regex Pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Password Regex Pattern
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email format.";
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(password.trim())) {
      newErrors.password =
        "Password must be at least 8 characters, include 1 number, and 1 special character.";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string, value: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };

      if (field === "email") {
        if (!value.trim()) {
          newErrors.email = "Email is required.";
        } else if (!emailRegex.test(value.trim())) {
          newErrors.email = "Invalid email format.";
        } else {
          delete newErrors.email;
        }
      } else if (field === "password") {
        if (!value.trim()) {
          newErrors.password = "Password is required.";
        } else if (!passwordRegex.test(value.trim())) {
          newErrors.password =
            "Password must be at least 8 characters, include 1 number, and 1 special character.";
        } else {
          delete newErrors.password;
        }
      }

      return newErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      // Step 1: Validate email and password
      if (validateForm()) {
        setStep(2); // Go to Step 2 (MFA)
      }
    } else if (step === 2) {
      // Step 2: Validate MFA
      if (mfa.length === 6) {
        alert("Welcome to Dashboard"); // Success message after successful form submission
        // Redirect to the dashboard (for example)
        // router.push("/dashboard");
      } else {
        alert("Please enter a valid 6-digit MFA code");
      }
    }
  };

  const handleMfaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setMfa(value); // Limit to 6 digits
    }
  };

  return (
    <div className={cn("flex justify-center items-center h-screen", className)}>
      <Card>
        <CardHeader className="flex flex-col items-center">
          {/* Logo */}
          <img
            src="/assets/image.png"
            alt="Company Logo"
            className="w-[24rem] h-[3rem] object-contain mt-2 mb-2"
          />
          <CardTitle className="text-2xl font-semibold">SIGN IN</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Enter your details below to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              {step === 1 && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email", email)}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              )}

              {/* Password Field */}
              {step === 1 && (
                <div className="grid gap-2 relative">
                  <Label htmlFor="password" className="flex justify-between">
                    Password
                    <Link href="/forgotpassword" className="text-sm text-blue-500 hover:underline">
                      Forgot Password?
                    </Link>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => handleBlur("password", password)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
              )}

              {/* MFA Field (only show after first step) */}
              {step === 2 && (
                <div className="grid gap-2">
                  <Label htmlFor="mfa">MFA Code (6 Digits)</Label>
                  <Input
                    id="mfa"
                    type="text"
                    value={mfa}
                    onChange={handleMfaChange}
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                  {step === 1 ? "SIGN IN" : "SUBMIT MFA"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
