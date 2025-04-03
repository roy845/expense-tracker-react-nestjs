import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/authContext";
import { Observable } from "@apollo/client/utilities";

const useApolloPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  // HTTP Link - Enables sending cookies
  const httpLink = createHttpLink({
    uri: "http://localhost:5001/graphql",
    credentials: "include",
  });

  // Auth Link - Adds Authorization header for protected routes
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: auth?.accessToken ? `Bearer ${auth.accessToken}` : "",
    },
  }));

  // Error Handling Link - Refreshes token if expired
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err.extensions);
        if (err.extensions?.code === "UNAUTHENTICATED") {
          return new Observable((observer) => {
            refresh()
              .then((newAccessToken) => {
                if (!newAccessToken) {
                  observer.error(err); // Stop if refresh fails
                  return;
                }

                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                }));

                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch((error) => {
                observer.error(error); // Handle refresh errors
              });
          });
        }
      }
    }
  });

  // Apollo Client Instance
  const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return client;
};

export default useApolloPrivate;
