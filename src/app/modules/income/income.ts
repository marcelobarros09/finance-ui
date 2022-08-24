export interface Income {
  id?: Number;
  description: String;
  amount: Number;
  status: String;
  dateDue: Date;
  dateReceipt?: Date;
}
