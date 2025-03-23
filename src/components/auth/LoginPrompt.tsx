
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, GraduationCap, Mail, Lock, UserCheck } from 'lucide-react';

interface LoginPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginPrompt = ({ open, onOpenChange }: LoginPromptProps) => {
  const [accountType, setAccountType] = useState<'student' | 'instructor'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally authenticate with a backend
    // For this example, we'll just save the user type to localStorage
    localStorage.setItem('userType', accountType);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', isSignUp ? name : 'User');
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-forest/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </DialogTitle>
          <DialogDescription>
            {isSignUp 
              ? 'Join our learning community today'
              : 'Sign in to continue your learning journey'
            }
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setAccountType(value as 'student' | 'instructor')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student" className="flex items-center justify-center gap-2">
              <User className="h-4 w-4" />
              Student
            </TabsTrigger>
            <TabsTrigger value="instructor" className="flex items-center justify-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Instructor
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleLogin} className="space-y-4 mt-6">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Your full name" 
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="yourname@example.com" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-forest hover:bg-forest-light">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            {isSignUp ? (
              <p>Already have an account? <button 
                onClick={() => setIsSignUp(false)}
                className="text-forest hover:text-forest-light underline"
              >
                Sign in
              </button></p>
            ) : (
              <p>Don't have an account? <button 
                onClick={() => setIsSignUp(true)}
                className="text-forest hover:text-forest-light underline"
              >
                Sign up
              </button></p>
            )}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPrompt;
