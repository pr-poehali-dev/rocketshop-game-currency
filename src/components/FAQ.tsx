import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function FAQ() {
  return (
    <section id="faq" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Частые вопросы
        </h2>
        <p className="text-muted-foreground text-lg">Ответы на популярные вопросы о RocketShop</p>
      </div>

      <Card className="max-w-3xl mx-auto p-6 bg-card/80 backdrop-blur-sm border-primary/20">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border-primary/20">
            <AccordionTrigger className="text-left hover:text-primary">
              <div className="flex items-center gap-3">
                <Icon name="HelpCircle" className="w-5 h-5 text-primary" />
                <span className="font-semibold">Как быстро я получу свой заказ?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Большинство товаров доставляются моментально после оплаты. Для некоторых товаров (например, Robux через Game Pass) требуется время ожидания, указанное в описании товара. Обычно это занимает от нескольких минут до 5 дней.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-primary/20">
            <AccordionTrigger className="text-left hover:text-primary">
              <div className="flex items-center gap-3">
                <Icon name="Shield" className="w-5 h-5 text-primary" />
                <span className="font-semibold">Безопасна ли покупка валюты?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Да! Мы используем только проверенные и официальные методы доставки. Все транзакции проходят безопасно, а ваши данные защищены. Мы работаем уже несколько лет и имеем множество положительных отзывов.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-primary/20">
            <AccordionTrigger className="text-left hover:text-primary">
              <div className="flex items-center gap-3">
                <Icon name="CreditCard" className="w-5 h-5 text-primary" />
                <span className="font-semibold">Какие способы оплаты доступны?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Сейчас доступна оплата через Сбербанк (комиссия 2%). В ближайшее время добавим Т-Банк и СБП. После оплаты отправьте скриншот в нашу поддержку для подтверждения заказа.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-primary/20">
            <AccordionTrigger className="text-left hover:text-primary">
              <div className="flex items-center gap-3">
                <Icon name="RotateCcw" className="w-5 h-5 text-primary" />
                <span className="font-semibold">Можно ли вернуть деньги?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Да! Если вас не устроил заказ или возникли проблемы с доставкой, мы вернем вам деньги. Все честно и безопасно. Просто свяжитесь с нашей поддержкой.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-primary/20">
            <AccordionTrigger className="text-left hover:text-primary">
              <div className="flex items-center gap-3">
                <Icon name="Clock" className="w-5 h-5 text-primary" />
                <span className="font-semibold">Какие часы работы поддержки?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Наша поддержка работает с 3:00 до 18:00 по МСК. В это время вы можете связаться с нами в Telegram @RocketShopSeller для получения помощи.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-primary/20">
            <AccordionTrigger className="text-left hover:text-primary">
              <div className="flex items-center gap-3">
                <Icon name="MessageCircle" className="w-5 h-5 text-primary" />
                <span className="font-semibold">Как связаться с поддержкой?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Вы можете связаться с нами через Telegram: @RocketShopSeller. Мы отвечаем быстро и помогаем решить любые вопросы!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-primary/20">
            <AccordionTrigger className="text-left hover:text-primary">
              <div className="flex items-center gap-3">
                <Icon name="Tag" className="w-5 h-5 text-primary" />
                <span className="font-semibold">Есть ли скидки для новых покупателей?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Да! Новые покупатели получают скидку 20% на первый заказ. Активируйте промокод в шапке сайта, и скидка применится автоматически при добавлении товаров в корзину.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </section>
  );
}
