import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  game: string;
  price: number;
  originalPrice?: number;
  amount: string;
  platform: string;
  genre: string;
  rating: number;
  image: string;
  popular: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Золото',
    game: 'World of Warcraft',
    price: 1499,
    originalPrice: 1999,
    amount: '100,000 золота',
    platform: 'PC',
    genre: 'MMORPG',
    rating: 4.8,
    image: '/placeholder.svg',
    popular: true
  },
  {
    id: 2,
    name: 'V-Bucks',
    game: 'Fortnite',
    price: 799,
    amount: '2,800 V-Bucks',
    platform: 'Multi',
    genre: 'Battle Royale',
    rating: 4.9,
    image: '/placeholder.svg',
    popular: true
  },
  {
    id: 3,
    name: 'Кристаллы',
    game: 'Genshin Impact',
    price: 1299,
    amount: '6,480 кристаллов',
    platform: 'Multi',
    genre: 'RPG',
    rating: 4.7,
    image: '/placeholder.svg',
    popular: false
  },
  {
    id: 4,
    name: 'Robux',
    game: 'Roblox',
    price: 599,
    amount: '4,500 Robux',
    platform: 'Multi',
    genre: 'Sandbox',
    rating: 4.6,
    image: '/placeholder.svg',
    popular: true
  },
  {
    id: 5,
    name: 'Монеты FIFA',
    game: 'FIFA 24',
    price: 899,
    amount: '500,000 монет',
    platform: 'Multi',
    genre: 'Sports',
    rating: 4.5,
    image: '/placeholder.svg',
    popular: false
  },
  {
    id: 6,
    name: 'Riot Points',
    game: 'League of Legends',
    price: 699,
    amount: '5,000 RP',
    platform: 'PC',
    genre: 'MOBA',
    rating: 4.8,
    image: '/placeholder.svg',
    popular: false
  }
];

export default function Index() {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<number>(0);

  const filteredProducts = products.filter(product => {
    const matchesGenre = selectedGenre === 'all' || product.genre === selectedGenre;
    const matchesPlatform = selectedPlatform === 'all' || product.platform === selectedPlatform;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.game.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesPlatform && matchesPrice && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const addToCart = () => {
    setCart(cart + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Icon name="Rocket" className="text-primary w-10 h-10 animate-pulse-glow" />
                <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse-glow" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent neon-glow">
                RocketShop
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                Главная
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                О нас
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                Поддержка
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors">
                FAQ
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingCart" className="w-5 h-5" />
                {cart > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-xs">
                    {cart}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="History" className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse-glow" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-6 animate-slide-in">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ИГРОВАЯ ВАЛЮТА
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-in">
              Лучшие цены на валюту для топовых игр. Мгновенная доставка 24/7
            </p>
            <div className="flex gap-4 justify-center animate-slide-in">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 neon-border text-lg px-8">
                <Icon name="Zap" className="mr-2 w-5 h-5" />
                Начать покупки
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8">
                <Icon name="MessageCircle" className="mr-2 w-5 h-5" />
                Поддержка
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-primary/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="text-sm font-medium mb-2 block">Поиск игры</label>
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Найти игру..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Жанр</label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="bg-background/50 border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все жанры</SelectItem>
                  <SelectItem value="MMORPG">MMORPG</SelectItem>
                  <SelectItem value="Battle Royale">Battle Royale</SelectItem>
                  <SelectItem value="RPG">RPG</SelectItem>
                  <SelectItem value="MOBA">MOBA</SelectItem>
                  <SelectItem value="Sports">Спорт</SelectItem>
                  <SelectItem value="Sandbox">Sandbox</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Платформа</label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="bg-background/50 border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все платформы</SelectItem>
                  <SelectItem value="PC">PC</SelectItem>
                  <SelectItem value="Multi">Multi-platform</SelectItem>
                  <SelectItem value="Console">Console</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Сортировка</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-background/50 border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-low">Цена: низкая</SelectItem>
                  <SelectItem value="price-high">Цена: высокая</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium mb-3 block">
              Цена: {priceRange[0]} - {priceRange[1]} ₽
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={2000}
              step={100}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border-primary/20 hover-lift hover:border-primary/50 transition-all duration-300">
              {product.popular && (
                <Badge className="absolute top-4 right-4 z-10 bg-accent text-white neon-border">
                  <Icon name="TrendingUp" className="w-3 h-3 mr-1" />
                  Популярное
                </Badge>
              )}
              
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <img 
                  src={product.image} 
                  alt={product.game}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{product.game}</h3>
                    <p className="text-sm text-muted-foreground">{product.name}</p>
                  </div>
                  <Badge variant="outline" className="border-secondary text-secondary">
                    {product.platform}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Icon name="Star" className="w-4 h-4 text-accent fill-accent" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-sm text-muted-foreground">{product.genre}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Coins" className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{product.amount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice} ₽</span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={addToCart}
                  >
                    <Icon name="ShoppingBag" className="w-4 h-4 mr-1" />
                    Купить
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Icon name="Search" className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить фильтры поиска</p>
          </div>
        )}
      </section>

      <footer className="bg-card/30 backdrop-blur-sm border-t border-primary/20 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Rocket" className="text-primary w-8 h-8" />
                <span className="font-bold text-xl">RocketShop</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Лучшая игровая валюта по самым низким ценам
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Как купить</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Политика</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="MessageCircle" className="w-4 h-4" />
                  <span>24/7 онлайн чат</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="w-4 h-4" />
                  <span>support@rocket.shop</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="w-4 h-4" />
                  <span>+7 (999) 123-45-67</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 RocketShop. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
