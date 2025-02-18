"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// You can import your logo from a local or external source
import logo from "@/assets/logo.png"; // Assuming you have a logo image

export default function ForgotPassword({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Reset Password
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = () => {
    const newErrors: any = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Not a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswords = () => {
    const newErrors: any = {};
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numericRegex = /\d/;
  
    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters.";
    } else if (!specialCharRegex.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one special character.";
    } else if (!numericRegex.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one numeric value.";
    }
  
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail()) {
      console.log("Email sent to:", email);
      setStep(2);
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswords()) {
      console.log("Password reset for:", email);
      alert("Your password has been successfully reset!");
      router.push("/signin");
    }
  };

  return (
    <div className={cn("flex justify-center items-center min-h-screen", className)} >
      <Card className="w-full sm:w-96">
        <CardHeader className="text-center">
          {/* Add logo here */}
          <div className="mb-4">
            <img
              src="/assets/image.png"
              alt="Company Logo"
              className="w-[24rem] h-[3rem] object-contain mt-2 mb-2"
            />
          </div>
          <CardTitle className="text-2xl">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <form onSubmit={handleEmailSubmit}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <Button type="submit" className="w-full">Send Reset Link</Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordReset}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2 relative">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                </div>

                <div className="grid gap-2 relative">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>

                <Button type="submit" className="w-full">Reset Password</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
