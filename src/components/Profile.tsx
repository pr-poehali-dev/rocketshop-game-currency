import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Purchase {
  id: number;
  date: string;
  product: string;
  amount: string;
  price: number;
  status: 'completed' | 'pending';
}

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  createdAt: string;
  purchases: Purchase[];
}

export default function Profile({ isOpen, onClose, username, createdAt, purchases }: ProfileProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <Icon name="User" className="w-6 h-6 text-primary" />
            Профиль
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold">{username}</h3>
                <p className="text-sm text-muted-foreground">Пользователь RocketShop</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-primary/20">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Calendar" className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Дата регистрации:</span>
                <span className="font-medium">{createdAt}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <Icon name="ShoppingBag" className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Всего покупок:</span>
                <span className="font-medium">{purchases.length}</span>
              </div>
            </div>
          </Card>

          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="History" className="w-5 h-5 text-primary" />
              История покупок
            </h3>

            {purchases.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon name="Package" className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Покупок пока нет</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {purchases.map((purchase) => (
                  <Card key={purchase.id} className="p-4 hover:border-primary/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{purchase.product}</h4>
                        <p className="text-sm text-muted-foreground">{purchase.amount}</p>
                      </div>
                      <Badge
                        variant={purchase.status === 'completed' ? 'default' : 'secondary'}
                        className={purchase.status === 'completed' ? 'bg-green-600' : ''}
                      >
                        {purchase.status === 'completed' ? 'Завершен' : 'В обработке'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{purchase.date}</span>
                      <span className="font-bold text-primary">{purchase.price} ₽</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
