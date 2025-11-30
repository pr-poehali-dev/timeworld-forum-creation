import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  status: 'active' | 'pending' | 'deleted';
}

interface AdminPanelProps {
  topics: ForumTopic[];
  onDeleteTopic: (id: number) => void;
  onApproveTopic: (id: number) => void;
}

export const AdminPanel = ({ topics, onDeleteTopic, onApproveTopic }: AdminPanelProps) => {
  const [selectedTab, setSelectedTab] = useState('topics');

  const users = [
    { id: 1, username: 'Steve_Minecraft', role: 'user', topics: 5, comments: 23, status: 'active' },
    { id: 2, username: 'Alex_Builder', role: 'user', topics: 8, comments: 45, status: 'active' },
    { id: 3, username: 'Creeper_King', role: 'user', topics: 2, comments: 12, status: 'banned' },
  ];

  const reports = [
    { id: 1, type: 'topic', target: 'Спам в теме', reporter: 'User123', reason: 'Реклама сторонних серверов', status: 'pending' },
    { id: 2, type: 'user', target: 'Bad_Player', reporter: 'GoodPlayer', reason: 'Оскорбления в комментариях', status: 'pending' },
    { id: 3, type: 'comment', target: 'Комментарий #456', reporter: 'ModerUser', reason: 'Нарушение правил форума', status: 'resolved' },
  ];

  const stats = {
    totalTopics: topics.length,
    totalUsers: users.length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    activeUsers: users.filter(u => u.status === 'active').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
          <Icon name="Shield" size={32} className="text-red-400" />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Панель администратора</h1>
          <p className="text-muted-foreground">Управление форумом TimeWorld</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <Icon name="FileText" size={24} className="text-blue-400" />
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Всего</Badge>
          </div>
          <div className="text-3xl font-heading font-bold text-foreground">{stats.totalTopics}</div>
          <p className="text-sm text-muted-foreground mt-1">Тем на форуме</p>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Users" size={24} className="text-green-400" />
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Активных</Badge>
          </div>
          <div className="text-3xl font-heading font-bold text-foreground">{stats.activeUsers}</div>
          <p className="text-sm text-muted-foreground mt-1">Пользователей</p>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <Icon name="AlertTriangle" size={24} className="text-orange-400" />
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Ожидают</Badge>
          </div>
          <div className="text-3xl font-heading font-bold text-foreground">{stats.pendingReports}</div>
          <p className="text-sm text-muted-foreground mt-1">Жалоб на рассмотрении</p>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={24} className="text-purple-400" />
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Сегодня</Badge>
          </div>
          <div className="text-3xl font-heading font-bold text-foreground">+12</div>
          <p className="text-sm text-muted-foreground mt-1">Новых тем</p>
        </Card>
      </div>

      <Card className="p-6 bg-card border-border">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="bg-secondary mb-6">
            <TabsTrigger value="topics" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="FileText" size={16} className="mr-2" />
              Темы
            </TabsTrigger>
            <TabsTrigger value="users" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Users" size={16} className="mr-2" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              Жалобы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="space-y-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary border-border">
                    <TableHead className="text-foreground font-heading">ID</TableHead>
                    <TableHead className="text-foreground font-heading">Название</TableHead>
                    <TableHead className="text-foreground font-heading">Автор</TableHead>
                    <TableHead className="text-foreground font-heading">Категория</TableHead>
                    <TableHead className="text-foreground font-heading">Ответы</TableHead>
                    <TableHead className="text-foreground font-heading">Просмотры</TableHead>
                    <TableHead className="text-foreground font-heading text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topics.map((topic) => (
                    <TableRow key={topic.id} className="border-border">
                      <TableCell className="text-muted-foreground">{topic.id}</TableCell>
                      <TableCell className="text-foreground font-medium">{topic.title}</TableCell>
                      <TableCell className="text-foreground">{topic.author}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-border text-foreground">
                          {topic.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground">{topic.replies}</TableCell>
                      <TableCell className="text-foreground">{topic.views}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-primary/30 text-primary hover:bg-primary/10"
                          >
                            <Icon name="Eye" size={14} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onDeleteTopic(topic.id)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary border-border">
                    <TableHead className="text-foreground font-heading">ID</TableHead>
                    <TableHead className="text-foreground font-heading">Никнейм</TableHead>
                    <TableHead className="text-foreground font-heading">Роль</TableHead>
                    <TableHead className="text-foreground font-heading">Тем</TableHead>
                    <TableHead className="text-foreground font-heading">Комментариев</TableHead>
                    <TableHead className="text-foreground font-heading">Статус</TableHead>
                    <TableHead className="text-foreground font-heading text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-border">
                      <TableCell className="text-muted-foreground">{user.id}</TableCell>
                      <TableCell className="text-foreground font-medium">{user.username}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-border text-foreground capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground">{user.topics}</TableCell>
                      <TableCell className="text-foreground">{user.comments}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            user.status === 'active' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }
                        >
                          {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-primary/30 text-primary hover:bg-primary/10"
                          >
                            <Icon name="Edit" size={14} />
                          </Button>
                          {user.status === 'active' ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            >
                              <Icon name="Ban" size={14} />
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                            >
                              <Icon name="CheckCircle" size={14} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="space-y-3">
              {reports.map((report) => (
                <Card key={report.id} className="p-4 bg-secondary border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded ${report.status === 'pending' ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                        <Icon name={report.type === 'user' ? 'UserX' : 'AlertTriangle'} size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="border-border text-foreground capitalize">
                            {report.type}
                          </Badge>
                          <Badge 
                            className={
                              report.status === 'pending' 
                                ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' 
                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                            }
                          >
                            {report.status === 'pending' ? 'На рассмотрении' : 'Решено'}
                          </Badge>
                        </div>
                        <p className="text-foreground font-medium mb-1">{report.target}</p>
                        <p className="text-sm text-muted-foreground mb-2">{report.reason}</p>
                        <p className="text-xs text-muted-foreground">
                          Отправлено: {report.reporter}
                        </p>
                      </div>
                    </div>
                    {report.status === 'pending' && (
                      <div className="flex gap-2 shrink-0">
                        <Button 
                          size="sm"
                          className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                        >
                          <Icon name="Check" size={14} className="mr-1" />
                          Принять
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                        >
                          <Icon name="X" size={14} className="mr-1" />
                          Отклонить
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
