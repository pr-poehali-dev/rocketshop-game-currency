import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { products, categories, Product } from '@/data/products';
import Cart from '@/components/Cart';
import Profile from '@/components/Profile';
import FAQ from '@/components/FAQ';

interface CartItem extends Product {
  quantity: number;
}

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все категории');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [discountActivated, setDiscountActivated] = useState(false);
  const [activeSection, setActiveSection] = useState<'catalog' | 'about' | 'support' | 'faq'>('catalog');

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'Все категории' || product.category === selectedCategory;
      const matchesPlatform = selectedPlatform === 'all' || product.platform === selectedPlatform;
      const matchesSearch =
        product.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesPlatform && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.popular ? 1 : -1;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map(item => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (section: 'catalog' | 'about' | 'support' | 'faq') => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => scrollToSection('catalog')}
              >
                Каталог
              </Button>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => scrollToSection('about')}
              >
                О нас
              </Button>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => scrollToSection('support')}
              >
                Поддержка
              </Button>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => scrollToSection('faq')}
              >
                FAQ
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
                <Icon name="ShoppingCart" className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsProfileOpen(true)}>
                <Icon name="User" className="w-5 h-5" />
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
            <div className="flex gap-4 justify-center animate-slide-in flex-wrap">
              <Button
                size="lg"
                className={`${
                  discountActivated ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                } neon-border text-lg px-8`}
                onClick={() => setDiscountActivated(true)}
                disabled={discountActivated}
              >
                {discountActivated ? (
                  <>
                    <Icon name="Check" className="mr-2 w-5 h-5" />
                    Скидка 20% активна!
                  </>
                ) : (
                  <>
                    <Icon name="Gift" className="mr-2 w-5 h-5" />
                    Дарим новым покупателям скидку 20% (получить)
                  </>
                )}
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
              <Icon name="Clock" className="w-4 h-4" />
              <span>Часы работы: 3:00-18:00 МСК</span>
            </div>
          </div>
        </div>

        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        />
      </section>

      <section id="catalog" className="container mx-auto px-4 py-12">
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-primary/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="text-sm font-medium mb-2 block">Поиск</label>
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Найти товар..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Категория</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-background/50 border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card
              key={product.id}
              className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border-primary/20 hover-lift hover:border-primary/50 transition-all duration-300"
            >
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

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Coins" className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{product.amount}</span>
                </div>

                {product.deliveryTime && (
                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Icon name="Clock" className="w-4 h-4" />
                    <span>{product.deliveryTime}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice} ₽</span>
                    )}
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" onClick={() => addToCart(product)}>
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

      <section id="about" className="container mx-auto px-4 py-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl my-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Почему выбирают RocketShop?
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            В RocketShop вы можете купить игровую валюту по самым выгодным ценам! Мы предлагаем широкий ассортимент валют для популярных MMORPG,
            MOBA, шутеров и мобильных игр. Наша команда гарантирует быструю доставку, безопасные транзакции и круглосуточную поддержку. Все честно
            и безопасно. Если вас не устроит заказ - вернем вам деньги.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover-lift">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Icon name="Package" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Широкий выбор валют</h3>
            <p className="text-muted-foreground">У нас есть валюта для большинства популярных онлайн-игр, и мы постоянно добавляем новые!</p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover-lift">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Icon name="DollarSign" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Выгодные цены</h3>
            <p className="text-muted-foreground">Мы предлагаем конкурентные цены и регулярные акции, чтобы вы могли экономить!</p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover-lift">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Icon name="Zap" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
            <p className="text-muted-foreground">Получите свою валюту в кратчайшие сроки, чтобы сразу вернуться в игру!</p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover-lift">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Icon name="Shield" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Безопасность</h3>
            <p className="text-muted-foreground">Мы используем проверенные методы доставки и гарантируем безопасность ваших транзакций!</p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover-lift">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Icon name="Headphones" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Круглосуточная поддержка</h3>
            <p className="text-muted-foreground">Наша команда поддержки всегда готова ответить на ваши вопросы и помочь с решением проблем!</p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover-lift">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Icon name="Smartphone" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Простой интерфейс</h3>
            <p className="text-muted-foreground">Легко найти нужную валюту и оформить заказ!</p>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-xl font-semibold text-primary mb-4">RocketShop - это ваш ракетный двигатель в мире онлайн-игр!</p>
          <p className="text-muted-foreground">Заряжайте свои игровые аккаунты и достигайте небывалых высот с нашей помощью!</p>
        </div>
      </section>

      <FAQ />

      <section id="support" className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 text-center">
          <h2 className="text-3xl font-bold mb-6">Отзывы и поддержка</h2>
          <p className="text-muted-foreground mb-6">Все актуальные отзывы можете увидеть здесь:</p>
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
              onClick={() => window.open('https://t.me/RocketShopRate', '_blank')}
            >
              <Icon name="MessageCircle" className="w-5 h-5 mr-2" />
              Telegram: Отзывы клиентов
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10"
              onClick={() => window.open('https://t.me/RocketShopSeller', '_blank')}
            >
              <Icon name="Headphones" className="w-5 h-5 mr-2" />
              Telegram: Поддержка @RocketShopSeller
            </Button>
          </div>
        </Card>
      </section>

      <footer className="bg-card/30 backdrop-blur-sm border-t border-primary/20 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Rocket" className="text-primary w-8 h-8" />
                <span className="font-bold text-xl">RocketShop</span>
              </div>
              <p className="text-sm text-muted-foreground">Лучшая игровая валюта по самым низким ценам</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#catalog" className="hover:text-primary transition-colors">
                    Каталог
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    Как купить
                  </a>
                </li>
                <li>
                  <a href="#support" className="hover:text-primary transition-colors">
                    Оплата
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#support" className="hover:text-primary transition-colors">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Clock" className="w-4 h-4" />
                  <span>3:00-18:00 МСК</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MessageCircle" className="w-4 h-4" />
                  <span>@RocketShopSeller</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Star" className="w-4 h-4" />
                  <span>@RocketShopRate</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 RocketShop. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        discount={discountActivated ? 20 : 0}
      />

      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        username="Игрок"
        createdAt={new Date().toLocaleDateString('ru-RU')}
        purchases={[]}
      />
    </div>
  );
}
