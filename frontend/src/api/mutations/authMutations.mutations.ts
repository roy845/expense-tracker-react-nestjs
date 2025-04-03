export const REGISTER_MUTATION = `
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      _id
      username
      email
    }
  }
`;

export const LOGIN_MUTATION = `
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      message
      accessToken
      refreshToken
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = `
  mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
    forgotPassword(forgotPasswordInput: $forgotPasswordInput)
  }
`;

export const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $resetPasswordInput)
  }
`;
