class OrderProcess {
    static perfom() {
        return (new OrderProcess).handle();
    }

    private handle() {
        this.checkCart().checkOrder().sendSms()
    }

    private checkCart() {
        console.log('check cart');
        return this;
    }
    private checkOrder() {
        console.log('check order');
        return this;
    }
    private sendSms() {
        console.log('send sms');
        return this;
    }
}



class Purchases {
    public store() {
        OrderProcess.perfom();
    }
}

let purchases = new Purchases();
purchases.store();