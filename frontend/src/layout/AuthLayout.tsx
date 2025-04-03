import { Helmet } from "react-helmet";
import AuthHeader from "./AuthHeader";
import { useDarkMode } from "../hooks/useDarkMode";

type AuthLayoutProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
};

export default function AuthLayout({
  children,
  title,
  description,
  keywords,
  author,
}: AuthLayoutProps): JSX.Element {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <div
        className={`${
          isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
        }`}
      >
        <AuthHeader />
        <div
          className={` ${
            isDarkMode
              ? "bg-gray-900 text-gray-200"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
