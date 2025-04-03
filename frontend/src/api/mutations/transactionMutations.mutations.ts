export const CREATE_TRANSACTION = `
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(createTransactionInput: $input) {
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

export const UPDATE_TRANSACTION = `
  mutation UpdateTransaction($id: String!, $input: UpdateTransactionInput!) {
    updateTransaction(id: $id, updateTransactionInput: $input) {
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

export const REMOVE_TRANSACTION = `
 mutation Mutation($removeTransactionId: String!) {
  removeTransaction(id: $removeTransactionId) {
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

export const REMOVE_ALL_TRANSACTIONS = `mutation Mutation {
  removeAllTransactionsByUser
}`;
