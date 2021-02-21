interface PaymentMethodInerface {
  pay(amount: number): void;

}
interface MoneyPayment {
  switchCurrency(currency: string): void;
}

class CachPaymentMethod implements PaymentMethodInerface, MoneyPayment {
  public pay(amount: number): void {
    console.log("amount " + amount);
  }
  switchCurrency(currency: string) {
    console.log("switched to " + currency);
  }
}

/* todo ->  add GoldBarPaymentMethod */

class GoldBarPaymentMethod implements PaymentMethodInerface {
  public pay(amount: number): void {
    console.log("amount " + amount);
  }
}