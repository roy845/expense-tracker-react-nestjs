import { AxiosInstance } from "axios";
import useAxiosPrivate from "./useAxiosPrivate";
import { sendGraphQLPrivateRequest } from "../api/serverApi";
import {
  Category,
  CreateTransactionDto,
  PaymentMethod,
  Transaction,
  TransactionType,
  UpdateTransactionDto,
} from "../types/transaction.types";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTION_BY_ID,
  GET_TRANSACTIONS_BY_USER,
} from "../api/queries/transactionQueries.queries";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  REMOVE_TRANSACTION,
  REMOVE_ALL_TRANSACTIONS,
} from "../api/mutations/transactionMutations.mutations";

const useTransactionService = () => {
  const axiosPrivate: AxiosInstance = useAxiosPrivate();

  // ✅ Create a transaction
  const createTransaction = async (
    transactionData: CreateTransactionDto
  ): Promise<Transaction> => {
    return sendGraphQLPrivateRequest<{ createTransaction: Transaction }>(
      axiosPrivate,
      CREATE_TRANSACTION,
      { input: transactionData }
    ).then((res) => res.createTransaction);
  };

  // ✅ Get all transactions
  const getTransactions = async (): Promise<Transaction[]> => {
    return sendGraphQLPrivateRequest<{ transactions: Transaction[] }>(
      axiosPrivate,
      GET_TRANSACTIONS
    ).then((res) => res.transactions);
  };

  // ✅ Get a single transaction by ID
  const getTransactionById = async (id: string): Promise<Transaction> => {
    return sendGraphQLPrivateRequest<{ transaction: Transaction }>(
      axiosPrivate,
      GET_TRANSACTION_BY_ID,
      { id }
    ).then((res) => res.transaction);
  };

  // ✅ Get all transactions for the authenticated user
  const getTransactionsByUser = async ({
    search = "",
    skip = 0,
    take = -1,
    sortBy = "date",
    order = "DESC",
    type,
    category,
    paymentMethod,
    startDate,
    endDate,
    minAmount,
    maxAmount,
  }: {
    search?: string;
    skip?: number;
    take?: number;
    sortBy?: string;
    order?: "ASC" | "DESC";
    type?: TransactionType;
    category?: Category;
    paymentMethod?: PaymentMethod;
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
  }): Promise<{ transactions: Transaction[]; totalPages: number }> => {
    return sendGraphQLPrivateRequest<{
      transactionsByUser: { transactions: Transaction[]; totalPages: number };
    }>(axiosPrivate, GET_TRANSACTIONS_BY_USER, {
      search,
      skip,
      take,
      sortBy,
      order,
      type,
      category,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      paymentMethod,
    }).then((res) => ({
      transactions: res.transactionsByUser.transactions,
      totalPages: res.transactionsByUser.totalPages,
    }));
  };

  // ✅ Update a transaction
  const updateTransaction = async (
    id: string,
    updateData: UpdateTransactionDto
  ): Promise<Transaction> => {
    return sendGraphQLPrivateRequest<{ updateTransaction: Transaction }>(
      axiosPrivate,
      UPDATE_TRANSACTION,
      { id, input: updateData }
    ).then((res) => res.updateTransaction);
  };

  // ✅ Delete a transaction
  const removeTransaction = async (id: string): Promise<Transaction> => {
    return sendGraphQLPrivateRequest<{ removeTransaction: Transaction }>(
      axiosPrivate,
      REMOVE_TRANSACTION,
      { removeTransactionId: id }
    ).then((res) => res.removeTransaction);
  };

  // ✅ Delete all transactions
  const removeAllTransactions = async (): Promise<boolean> => {
    return sendGraphQLPrivateRequest<{ removeAllTransactionsByUser: boolean }>(
      axiosPrivate,
      REMOVE_ALL_TRANSACTIONS,
      {}
    ).then((res) => res.removeAllTransactionsByUser);
  };

  return {
    createTransaction,
    getTransactions,
    getTransactionById,
    getTransactionsByUser,
    updateTransaction,
    removeTransaction,
    removeAllTransactions,
  };
};

export default useTransactionService;
