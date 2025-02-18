"use client";
import { useState } from "react";
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

export function RegistrationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Email Regex Pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Password should have at least one number, one special character, and be 8+ characters long
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(password.trim())) {
      newErrors.password =
        "Password must be at least 8 characters, include 1 number, and 1 special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string, value: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };

      if (field === "firstName" && !value.trim()) {
        newErrors.firstName = "First name is required.";
      } else if (field === "lastName" && !value.trim()) {
        newErrors.lastName = "Last name is required.";
      } else if (field === "email") {
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
    if (validateForm()) {
      console.log("Form submitted:", { firstName, lastName, email, password });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
      <CardHeader className="flex flex-col items-center">
  {/* Logo with better size and spacing */}
  <img
  src="/assets/image.png"
  alt="Company Logo"
  className="w-[24rem] h-[3rem] object-contain mt-2 mb-2"
/>

  <CardTitle className="text-2xl font-semibold">SIGN UP</CardTitle>
  <CardDescription className="text-sm text-gray-600">
    Enter your details below to register
  </CardDescription>
</CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* First Name & Last Name */}
              <div className="flex gap-4">
                <div className="w-full">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
  id="firstName"
  type="text"
  placeholder="John"
  value={firstName}
  onChange={(e) => {
    setFirstName(e.target.value);
    if (errors.firstName) {
      setErrors((prev) => ({ ...prev, firstName: "" }));
    }
  }}
  onBlur={() => handleBlur("firstName", firstName)}
/>
{errors.firstName && (
  <p className="text-red-500 text-sm">{errors.firstName}</p>
)}

                </div>
                <div className="w-full">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
  id="lastName"
  type="text"
  placeholder="Doe"
  value={lastName}
  onChange={(e) => {
    setLastName(e.target.value);
    if (errors.lastName) {
      setErrors((prev) => ({ ...prev, lastName: "" }));
    }
  }}
  onBlur={() => handleBlur("lastName", lastName)}
/>
{errors.lastName && (
  <p className="text-red-500 text-sm">{errors.lastName}</p>
)}
                </div>
              </div>

              {/* Email */}
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
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
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
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                  SIGN UP
                </Button>
              </div>

              {/* Sign In Link */}
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/signin" className="text-blue-500 hover:underline">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 