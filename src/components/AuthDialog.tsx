import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (username: string, role: 'user' | 'admin') => void;
}

export const AuthDialog = ({ open, onOpenChange, onLogin }: AuthDialogProps) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

  const handleLogin = () => {
    if (loginUsername.trim()) {
      const role = loginUsername.toLowerCase() === 'admin' ? 'admin' : 'user';
      onLogin(loginUsername, role);
      onOpenChange(false);
      setLoginUsername('');
      setLoginPassword('');
    }
  };

  const handleRegister = () => {
    if (registerUsername.trim() && registerEmail.trim()) {
      onLogin(registerUsername, 'user');
      onOpenChange(false);
      setRegisterUsername('');
      setRegisterPassword('');
      setRegisterEmail('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground flex items-center gap-2">
            <Icon name="User" size={24} className="text-primary" />
            Вход в аккаунт
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="login" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Вход
            </TabsTrigger>
            <TabsTrigger value="register" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Регистрация
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="login-username" className="text-foreground">Никнейм</Label>
              <Input
                id="login-username"
                placeholder="Ваш никнейм в Minecraft"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-foreground">Пароль</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
            >
              <Icon name="LogIn" className="mr-2" size={18} />
              Войти
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Для демо: введите любой никнейм или "admin" для админа
            </p>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="register-username" className="text-foreground">Никнейм</Label>
              <Input
                id="register-username"
                placeholder="Ваш никнейм в Minecraft"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-foreground">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="your@email.com"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password" className="text-foreground">Пароль</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button 
              onClick={handleRegister}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
            >
              <Icon name="UserPlus" className="mr-2" size={18} />
              Зарегистрироваться
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
