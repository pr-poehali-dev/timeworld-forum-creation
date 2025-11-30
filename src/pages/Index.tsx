import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { AuthDialog } from '@/components/AuthDialog';
import { UserProfile } from '@/components/UserProfile';
import { AdminPanel } from '@/components/AdminPanel';

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  content: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

const categories = [
  { name: 'Helper', icon: 'Shield', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { name: 'YouTuber', icon: 'Video', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { name: 'TikToker', icon: 'Music', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { name: 'Жалоба на персонал', icon: 'AlertTriangle', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { name: 'Жалоба на игроков', icon: 'UserX', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { name: 'Баги', icon: 'Bug', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { name: 'Идеи', icon: 'Lightbulb', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
];

const Index = () => {
  const [user, setUser] = useState<{ username: string; role: 'user' | 'admin' } | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [currentView, setCurrentView] = useState<'forum' | 'profile' | 'admin'>('forum');

  const [topics, setTopics] = useState<ForumTopic[]>([]);

  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Admin_TimeWorld',
      content: 'Спасибо за заявку! Рассмотрим в ближайшее время.',
      timestamp: '1 час назад'
    }
  ]);

  const [newTopic, setNewTopic] = useState({ title: '', category: '', content: '' });
  const [newComment, setNewComment] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleLogin = (username: string, role: 'user' | 'admin') => {
    setUser({ username, role });
    setCurrentView('forum');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('forum');
  };

  const handleDeleteTopic = (id: number) => {
    setTopics(topics.filter(t => t.id !== id));
  };

  const handleApproveTopic = (id: number) => {
    console.log('Approved topic:', id);
  };

  const handleCreateTopic = () => {
    if (newTopic.title && newTopic.category && newTopic.content) {
      if (!user) {
        setShowAuthDialog(true);
        return;
      }
      const topic: ForumTopic = {
        id: topics.length + 1,
        title: newTopic.title,
        author: user.username,
        category: newTopic.category,
        replies: 0,
        views: 0,
        lastActivity: 'Только что',
        content: newTopic.content
      };
      setTopics([topic, ...topics]);
      setNewTopic({ title: '', category: '', content: '' });
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedTopic) {
      if (!user) {
        setShowAuthDialog(true);
        return;
      }
      const comment: Comment = {
        id: comments.length + 1,
        author: user.username,
        content: newComment,
        timestamp: 'Только что'
      };
      setComments([...comments, comment]);
      setNewComment('');
      setTopics(topics.map(t => 
        t.id === selectedTopic.id ? { ...t, replies: t.replies + 1 } : t
      ));
    }
  };

  const filteredTopics = filterCategory === 'all' 
    ? topics 
    : topics.filter(t => t.category === filterCategory);

  const getCategoryStyle = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category || categories[0];
  };

  if (currentView === 'profile' && user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('forum')}
              className="border-border text-foreground hover:bg-secondary"
            >
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              На форум
            </Button>
            {user.role === 'admin' && (
              <Button 
                onClick={() => setCurrentView('admin')}
                className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
              >
                <Icon name="Shield" className="mr-2" size={18} />
                Админ-панель
              </Button>
            )}
          </div>
          <UserProfile username={user.username} role={user.role} onLogout={handleLogout} />
        </div>
      </div>
    );
  }

  if (currentView === 'admin' && user?.role === 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('forum')}
              className="border-border text-foreground hover:bg-secondary"
            >
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              На форум
            </Button>
            <Button 
              variant="outline"
              onClick={() => setCurrentView('profile')}
              className="border-border text-foreground hover:bg-secondary"
            >
              <Icon name="User" className="mr-2" size={18} />
              Мой профиль
            </Button>
          </div>
          <AdminPanel 
            topics={topics} 
            onDeleteTopic={handleDeleteTopic}
            onApproveTopic={handleApproveTopic}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-primary rounded-lg rotate-45 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary -rotate-45"></div>
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary">TimeWorld</h1>
              <p className="text-muted-foreground text-sm">Новая Эра гриферства</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Button 
                    onClick={() => setCurrentView('admin')}
                    className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                  >
                    <Icon name="Shield" className="mr-2" size={18} />
                    Админ
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => setCurrentView('profile')}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Icon name="User" className="mr-2" size={18} />
                  {user.username}
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setShowAuthDialog(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
              >
                <Icon name="LogIn" className="mr-2" size={18} />
                Войти
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-scale-in">
          {categories.slice(0, 4).map((category, index) => (
            <Card 
              key={category.name}
              className="p-6 bg-card hover:bg-card/80 transition-all cursor-pointer border-border hover:border-primary/50 group"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setFilterCategory(category.name)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${category.color} border transition-transform group-hover:scale-110`}>
                  <Icon name={category.icon} size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {topics.filter(t => t.category === category.name).length} тем
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.slice(4).map((category, index) => (
            <Card 
              key={category.name}
              className="p-6 bg-card hover:bg-card/80 transition-all cursor-pointer border-border hover:border-primary/50 group"
              onClick={() => setFilterCategory(category.name)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${category.color} border transition-transform group-hover:scale-110`}>
                  <Icon name={category.icon} size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {topics.filter(t => t.category === category.name).length} тем
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">Темы форума</h2>
            {filterCategory !== 'all' && (
              <Badge 
                variant="outline" 
                className="bg-primary/10 text-primary border-primary/30 cursor-pointer"
                onClick={() => setFilterCategory('all')}
              >
                {filterCategory} ✕
              </Badge>
            )}
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
                <Icon name="Plus" className="mr-2" size={18} />
                Создать тему
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl text-foreground">Новая тема</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Категория</label>
                  <Select value={newTopic.category} onValueChange={(value) => setNewTopic({...newTopic, category: value})}>
                    <SelectTrigger className="bg-secondary border-border text-foreground">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {categories.map(cat => (
                        <SelectItem key={cat.name} value={cat.name} className="text-foreground">
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Заголовок</label>
                  <Input 
                    placeholder="Введите заголовок темы"
                    value={newTopic.title}
                    onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Содержание</label>
                  <Textarea 
                    placeholder="Опишите вашу тему подробно..."
                    value={newTopic.content}
                    onChange={(e) => setNewTopic({...newTopic, content: e.target.value})}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground min-h-32"
                  />
                </div>
                <Button 
                  onClick={handleCreateTopic} 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                >
                  Опубликовать
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {filteredTopics.map((topic) => (
            <Card 
              key={topic.id}
              className="p-5 bg-card hover:bg-card/80 transition-all cursor-pointer border-border hover:border-primary/30 group animate-fade-in"
              onClick={() => setSelectedTopic(topic)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getCategoryStyle(topic.category).color} border shrink-0`}>
                  <Icon name={getCategoryStyle(topic.category).icon} size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    <Badge variant="outline" className={`${getCategoryStyle(topic.category).color} border shrink-0`}>
                      {topic.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{topic.content}</p>
                  <div className="flex items-center gap-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Icon name="User" size={14} />
                      <span>{topic.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="MessageSquare" size={14} />
                      <span>{topic.replies}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Eye" size={14} />
                      <span>{topic.views}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Clock" size={14} />
                      <span>{topic.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedTopic} onOpenChange={() => setSelectedTopic(null)}>
          <DialogContent className="bg-card border-border max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedTopic && (
              <>
                <DialogHeader>
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${getCategoryStyle(selectedTopic.category).color} border`}>
                      <Icon name={getCategoryStyle(selectedTopic.category).icon} size={24} />
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="font-heading text-2xl text-foreground mb-2">
                        {selectedTopic.title}
                      </DialogTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Icon name="User" size={14} />
                          {selectedTopic.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Icon name="Clock" size={14} />
                          {selectedTopic.lastActivity}
                        </span>
                        <Badge variant="outline" className={`${getCategoryStyle(selectedTopic.category).color} border`}>
                          {selectedTopic.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="mt-6">
                  <Card className="p-4 bg-secondary border-border mb-6">
                    <p className="text-foreground leading-relaxed">{selectedTopic.content}</p>
                  </Card>

                  <Separator className="my-6 bg-border" />

                  <div className="space-y-4">
                    <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                      <Icon name="MessageSquare" size={20} />
                      Комментарии ({comments.length})
                    </h3>
                    
                    {comments.map((comment) => (
                      <Card key={comment.id} className="p-4 bg-secondary border-border">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                            <Icon name="User" size={20} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-heading font-semibold text-sm text-foreground">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>
                          </div>
                        </div>
                      </Card>
                    ))}

                    <Card className="p-4 bg-secondary border-border">
                      <Textarea 
                        placeholder="Написать комментарий..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground mb-3"
                      />
                      <Button 
                        onClick={handleAddComment}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading"
                      >
                        <Icon name="Send" className="mr-2" size={16} />
                        Отправить
                      </Button>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <AuthDialog 
          open={showAuthDialog} 
          onOpenChange={setShowAuthDialog}
          onLogin={handleLogin}
        />
      </div>
    </div>
  );
};

export default Index;