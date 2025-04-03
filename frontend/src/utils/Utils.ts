import { format } from "date-fns";

export class Utils {
  static formatDateTime = (timestamp: string) => {
    return format(new Date(timestamp), "MMMM d, yyyy 'at' h:mm a");
  };

  static formatDate = (timestamp: string) => {
    return format(new Date(timestamp), "MMMM d, yyyy");
  };

  static formatDate1 = (timestamp: string | number) => {
    return format(new Date(Number(timestamp)), "MMM dd, yyyy");
  };

  static getLast12Months = () => {
    const months = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

      // ✅ Manually construct YYYY-MM without toISOString() to prevent UTC issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensures "03" instead of "3"

      months.push({
        label: date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        value: `${year}-${month}`, // ✅ Corrected YYYY-MM format
      });
    }
    return months;
  };

  static getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };
}
