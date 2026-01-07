import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "At vero eos et accusamus et iusto odio dignissimos.",
      description: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus"
    },
    {
      title: "Transform Intellectual Property into Liquid Assets",
      description: "Tokenize your patents and scientific innovations to unlock their value through decentralized finance and blockchain technology."
    },
    {
      title: "Secure, Transparent, and Efficient",
      description: "Experience the future of IP management with our cutting-edge platform that brings transparency and liquidity to intellectual property markets."
    }
  ];

  // Auto-advance slides with looping
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  // Reset timer when slide is manually changed
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      let redirectPath = (location.state as any)?.from?.pathname || "/";
      // If SPV user, redirect to SPV dashboard
      if (user?.role === "spv") {
        redirectPath = "/spv";
      }
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user?.role, navigate, location.state]);

  // Don't render if already authenticated (prevent flash of content)
  if (isAuthenticated) {
    return null;
  }

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const success = await login(data.email, data.password);
      
      if (!success) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Try: demo@nanofi.com / Demo123 or spv@nanofi.com / SPV123",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to dashboard...",
        icon: <CheckCircle className="w-5 h-5 text-success" />,
      });

      // Determine redirect based on user role
      // Check localStorage directly since state might not be updated yet
      const currentUser = JSON.parse(localStorage.getItem("user") || "null");
      let redirectPath = (location.state as any)?.from?.pathname || "/";
      
      if (currentUser?.role === "spv") {
        redirectPath = "/spv";
      }
      
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 1500);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Dark Background with Animated Lines */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#16213e] to-[#0f3460]">
        {/* Animated Background Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Purple/Pink Glowing Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            {/* Curved glowing lines */}
            <path
              d="M0,400 Q200,200 400,350 T800,400 T1000,450"
              stroke="url(#gradient1)"
              strokeWidth="4"
              fill="none"
              className="animate-pulse"
              opacity="0.7"
              style={{ filter: "blur(2px)" }}
            />
            <path
              d="M0,550 Q300,350 600,500 T1000,550"
              stroke="url(#gradient2)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
              opacity="0.6"
              style={{ animationDelay: "0.5s", filter: "blur(1.5px)" }}
            />
            <path
              d="M0,650 Q250,450 500,600 T1000,650"
              stroke="url(#gradient3)"
              strokeWidth="2.5"
              fill="none"
              className="animate-pulse"
              opacity="0.5"
              style={{ animationDelay: "1s", filter: "blur(1px)" }}
            />
            <path
              d="M0,300 Q150,100 300,250 T600,300 T1000,350"
              stroke="url(#gradient1)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
              opacity="0.4"
              style={{ animationDelay: "1.5s", filter: "blur(1px)" }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-8 md:p-12 h-full">
          {/* Top Section */}
          <div className="flex items-start justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/nanofi-logo.png" 
                alt="NANOFI Logo" 
                className="h-12 md:h-16 w-auto"
              />
            </Link>

            {/* Back Link */}
            <Link
              to="/"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Nanofi Web</span>
            </Link>
          </div>

          {/* Middle Content */}
          <div className="flex-1 flex flex-col justify-center max-w-lg relative overflow-hidden">
            <div className="relative h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col justify-center transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-blue-500 w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - White Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            </p>
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Input your Email"
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Input your Password"
                          className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forget Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <Button
            variant="outline"
            type="button"
            className="w-full h-11 border-gray-300 hover:bg-gray-50 gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </Button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Doesn't have any account? </span>
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

