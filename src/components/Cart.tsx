import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  discount: number;
}

export default function Cart({ isOpen, onClose, items, onRemove, onUpdateQuantity, discount }: CartProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'sber' | 'tbank' | 'sbp' | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discount / 100));
  const total = subtotal - discountAmount;
  const commission = paymentMethod === 'sber' ? Math.round(total * 0.02) : 0;
  const finalTotal = total + commission;

  const handleCheckout = () => {
    if (items.length > 0) {
      setShowPayment(true);
    }
  };

  const handlePayment = (method: 'sber' | 'tbank' | 'sbp') => {
    setPaymentMethod(method);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-2xl">
              <Icon name="ShoppingCart" className="w-6 h-6 text-primary" />
              Корзина
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col h-[calc(100vh-180px)]">
            {discount > 0 && (
              <div className="mb-4 p-3 bg-accent/20 border border-accent rounded-lg flex items-center gap-2">
                <Icon name="Tag" className="w-5 h-5 text-accent" />
                <span className="font-medium">Скидка {discount}% активирована!</span>
              </div>
            )}

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Icon name="ShoppingBag" className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
                <p className="text-muted-foreground">Добавьте товары из каталога</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto space-y-4">
                  {items.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.game}</h4>
                          <p className="text-sm text-muted-foreground">{item.amount}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0"
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              <Icon name="Minus" className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{item.price * item.quantity} ₽</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mt-2 text-destructive hover:text-destructive"
                            onClick={() => onRemove(item.id)}
                          >
                            <Icon name="Trash2" className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Сумма:</span>
                    <span className="font-medium">{subtotal} ₽</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-accent">
                      <span>Скидка {discount}%:</span>
                      <span className="font-medium">-{discountAmount} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span className="text-primary">{total} ₽</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary" size="lg" onClick={handleCheckout}>
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Выберите способ оплаты</DialogTitle>
          </DialogHeader>

          {!paymentMethod ? (
            <div className="space-y-3">
              <Button
                className="w-full h-auto py-4 flex flex-col items-start bg-green-600 hover:bg-green-700"
                onClick={() => handlePayment('sber')}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="CreditCard" className="w-5 h-5" />
                  <span className="font-bold text-lg">Сбербанк</span>
                </div>
                <span className="text-sm opacity-90">Комиссия 2%</span>
              </Button>

              <Button className="w-full h-auto py-4 bg-muted hover:bg-muted" disabled>
                <div className="flex items-center gap-2">
                  <Icon name="CreditCard" className="w-5 h-5" />
                  <span className="font-bold text-lg">Т-Банк</span>
                  <Badge className="ml-auto">Скоро</Badge>
                </div>
              </Button>

              <Button className="w-full h-auto py-4 bg-muted hover:bg-muted" disabled>
                <div className="flex items-center gap-2">
                  <Icon name="Smartphone" className="w-5 h-5" />
                  <span className="font-bold text-lg">СБП</span>
                  <Badge className="ml-auto">Скоро</Badge>
                </div>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Card className="p-4 bg-primary/5 border-primary">
                <h3 className="font-bold mb-3 text-lg">Реквизиты для оплаты:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Сумма заказа:</span>
                    <span className="font-medium">{total} ₽</span>
                  </div>
                  {commission > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Комиссия 2%:</span>
                      <span className="font-medium">{commission} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>К оплате:</span>
                    <span className="text-primary">{finalTotal} ₽</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="Building2" className="w-4 h-4 text-primary" />
                  Получатель:
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground block">Банк:</span>
                    <span className="font-medium">СберБанк</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Номер карты:</span>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded font-mono text-base">
                        2202 2083 9585 3485
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          navigator.clipboard.writeText('2202208395853485');
                        }}
                      >
                        <Icon name="Copy" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Получатель:</span>
                    <span className="font-medium">Никита Владимирович Т.</span>
                  </div>
                </div>
              </Card>

              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <div className="flex gap-2">
                  <Icon name="Info" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">После оплаты:</p>
                    <p className="text-muted-foreground">
                      Отправьте скриншот оплаты в поддержку @RocketShopSeller для подтверждения заказа
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline" onClick={() => setPaymentMethod(null)}>
                <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Назад к способам оплаты
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
