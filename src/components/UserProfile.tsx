import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  username: string;
  role: 'user' | 'admin';
  onLogout: () => void;
}

export const UserProfile = ({ username, role, onLogout }: UserProfileProps) => {
  const stats = {
    topics: 12,
    comments: 45,
    reputation: 128,
    joinDate: 'Октябрь 2024'
  };

  const recentActivity = [
    { type: 'topic', title: 'Предложение по улучшению сервера', category: 'Идеи', time: '2 часа назад' },
    { type: 'comment', title: 'Ответ на "Баг с порталом"', category: 'Баги', time: '5 часов назад' },
    { type: 'topic', title: 'Заявка на Helper', category: 'Helper', time: '1 день назад' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-lg bg-primary/20 border-2 border-primary/30 flex items-center justify-center shrink-0">
            <Icon name="User" size={40} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-heading font-bold text-foreground">{username}</h2>
              {role === 'admin' && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  <Icon name="Shield" size={14} className="mr-1" />
                  Администратор
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-4">Участник с {stats.joinDate}</p>
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="border-border text-foreground hover:bg-secondary"
            >
              <Icon name="LogOut" className="mr-2" size={16} />
              Выйти
            </Button>
          </div>
        </div>

        <Separator className="my-6 bg-border" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary">{stats.topics}</div>
            <div className="text-sm text-muted-foreground">Тем создано</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary">{stats.comments}</div>
            <div className="text-sm text-muted-foreground">Комментариев</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary">{stats.reputation}</div>
            <div className="text-sm text-muted-foreground">Репутация</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-heading font-bold text-primary">
              <Icon name="Award" size={24} />
              3
            </div>
            <div className="text-sm text-muted-foreground">Достижения</div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Activity" size={20} className="text-primary" />
          Последняя активность
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-secondary rounded-lg border border-border">
              <div className={`p-2 rounded ${activity.type === 'topic' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                <Icon name={activity.type === 'topic' ? 'FileText' : 'MessageSquare'} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">{activity.title}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs border-border">
                    {activity.category}
                  </Badge>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Award" size={20} className="text-primary" />
          Достижения
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-secondary rounded-lg border border-primary/30 text-center">
            <Icon name="MessageCircle" size={32} className="mx-auto mb-2 text-primary" />
            <p className="text-sm font-heading font-semibold text-foreground">Собеседник</p>
            <p className="text-xs text-muted-foreground mt-1">50+ комментариев</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg border border-primary/30 text-center">
            <Icon name="Flame" size={32} className="mx-auto mb-2 text-primary" />
            <p className="text-sm font-heading font-semibold text-foreground">Активист</p>
            <p className="text-xs text-muted-foreground mt-1">10 тем за месяц</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg border border-primary/30 text-center">
            <Icon name="Star" size={32} className="mx-auto mb-2 text-primary" />
            <p className="text-sm font-heading font-semibold text-foreground">Звезда</p>
            <p className="text-xs text-muted-foreground mt-1">100+ репутации</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
