export const REFRESH_TOKEN_QUERY = `
  query RefreshToken {
    refreshToken {
      message
      accessToken
    }
  }
`;

export const LOGOUT_QUERY = `
  query Query {
    logout
  }
`;
