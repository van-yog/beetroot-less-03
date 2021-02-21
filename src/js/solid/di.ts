{
  class TransferPaymentMethod {
    public process() {
      console.log("do transfer");
    }
  }

  class Transaction {
    public pay() {
      const transfer = new TransferPaymentMethod();
      transfer.process();
    }
  }

  let transaction = new Transaction();
  transaction.pay();
}
