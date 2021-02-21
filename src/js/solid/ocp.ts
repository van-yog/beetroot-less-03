interface PaymentType {
    processPayment: () => void
}


class CashPayment implements PaymentType {
    public processPayment() {
        console.log('cach');
    }
}
class CreditCartPayment implements PaymentType {
    public processPayment() {
        console.log('credit-cart');

    }
}

const paymentsArr: PaymentType[] = [new CashPayment(), new CreditCartPayment()]

class Payment {
    public processPayment(payments: PaymentType[]) {
        payments.forEach(payment => payment.processPayment())
    }
}

let p = new Payment();
p.processPayment(paymentsArr);