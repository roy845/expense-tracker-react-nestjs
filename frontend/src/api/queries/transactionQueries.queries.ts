export const GET_TRANSACTIONS = `
  query GetTransactions {
    transactions {
      _id
      amount
      transactionType
      description
      category
      date
      paymentMethod
      isRecurring
      tags
      createdAt
      updatedAt
    }
  }
`;

export const GET_TRANSACTION_BY_ID = `
  query GetTransaction($id: String!) {
    transaction(id: $id) {
      _id
      amount
      type
      description
      category
      date
      paymentMethod
      recurringTransaction
      tags   
    }
  }
`;

export const GET_TRANSACTIONS_BY_USER = `
query TransactionsByUser(
  $search: String
  $skip: Int
  $take: Int
  $sortBy: String
  $order: SortOrder
  $type: TransactionType
  $category: Category
  $startDate: DateTime
  $endDate: DateTime
  $minAmount: Float
  $maxAmount: Float
  $paymentMethod: PaymentMethod
) {
  transactionsByUser(
    search: $search
    skip: $skip
    take: $take
    sortBy: $sortBy
    order: $order
    type: $type
    category: $category
    startDate: $startDate
    endDate: $endDate
    minAmount: $minAmount
    maxAmount: $maxAmount
    paymentMethod: $paymentMethod
  ) {
    transactions {
      _id
      amount
      type
      description
      category
      date
      paymentMethod
      recurringTransaction
      tags
    }
    totalPages
  }
}
`;
