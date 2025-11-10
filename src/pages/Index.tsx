import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon: string;
}

const resources: Resource[] = [
  { id: '1', title: 'Документация', description: 'Полное руководство по работе с платформой', url: '/docs', category: 'Обучение', icon: 'BookOpen' },
  { id: '2', title: 'API Reference', description: 'Справочник по всем методам API', url: '/api', category: 'Разработка', icon: 'Code' },
  { id: '3', title: 'Блог', description: 'Последние новости и обновления', url: '/blog', category: 'Новости', icon: 'Newspaper' },
  { id: '4', title: 'Сообщество', description: 'Присоединяйтесь к нашему сообществу', url: '/community', category: 'Поддержка', icon: 'Users' },
  { id: '5', title: 'Видео-уроки', description: 'Обучающие материалы в формате видео', url: '/tutorials', category: 'Обучение', icon: 'Video' },
  { id: '6', title: 'FAQ', description: 'Ответы на частые вопросы', url: '/faq', category: 'Поддержка', icon: 'HelpCircle' },
  { id: '7', title: 'GitHub', description: 'Наш репозиторий с открытым кодом', url: '/github', category: 'Разработка', icon: 'Github' },
  { id: '8', title: 'Changelog', description: 'История изменений и обновлений', url: '/changelog', category: 'Новости', icon: 'FileText' },
];

const categories = ['Все', 'Обучение', 'Разработка', 'Новости', 'Поддержка'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Все');

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Все' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 pointer-events-none" />
      
      <div className="relative z-10">
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Icon name="Compass" size={24} className="text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold">Navigator</h1>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
                <a href="#resources" className="text-sm font-medium hover:text-primary transition-colors">Ресурсы</a>
                <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors">Категории</a>
                <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О проекте</a>
                <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
              </nav>
              <Button variant="outline" size="sm" className="md:hidden">
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <section id="home" className="mb-24 text-center animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Навигация по ресурсам
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Найдите всё необходимое в одном месте. Быстрый доступ к документации, API, обучающим материалам и сообществу.
              </p>
              
              <div id="search" className="relative max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск ресурсов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg glass-effect border-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </section>

          <section id="categories" className="mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  className={`hover-scale ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground hover-glow'
                      : 'glass-effect'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </section>

          <section id="resources" className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <Card
                  key={resource.id}
                  className="group glass-effect hover-scale hover-glow cursor-pointer p-6 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => window.location.href = resource.url}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Icon name={resource.icon as any} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <span className="text-xs text-accent font-medium">{resource.category}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </Card>
              ))}
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-16 animate-fade-in">
                <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground">Ничего не найдено</p>
                <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить запрос или выбрать другую категорию</p>
              </div>
            )}
          </section>

          <section id="about" className="mb-24">
            <Card className="glass-effect p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6">О проекте</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Target" size={24} className="text-primary" />
                    Наша миссия
                  </h3>
                  <p className="text-muted-foreground">
                    Мы создаём централизованную платформу для навигации по всем важным ресурсам. 
                    Наша цель — сделать доступ к информации максимально быстрым и удобным.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Zap" size={24} className="text-accent" />
                    Преимущества
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Быстрый поиск по всем ресурсам
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Удобная категоризация
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      Современный интерфейс
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          <section id="contacts" className="animate-fade-in">
            <Card className="glass-effect p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Связаться с нами</h2>
              <Accordion type="single" collapsible className="max-w-2xl mx-auto text-left">
                <AccordionItem value="email">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={20} className="text-primary" />
                      <span>Email</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">contact@navigator.dev</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="telegram">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <Icon name="MessageCircle" size={20} className="text-primary" />
                      <span>Telegram</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">@navigator_support</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="discord">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <Icon name="Globe" size={20} className="text-primary" />
                      <span>Discord</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">discord.gg/navigator</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </section>
        </main>

        <footer className="border-t border-border/50 mt-24 py-8 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Navigator. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
