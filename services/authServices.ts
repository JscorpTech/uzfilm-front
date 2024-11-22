const baseUrl = "https://gateway.pandatv.uz";
interface LoginForm {
  code: string;
  device_info: string;
}
export default {
  loginWithPhone(phone: string) {
    return $fetch(`${baseUrl}/auth/phone`, {
      method: "POST",
      body: {
        phone_number: phone,
      },
    });
  },
  verificationCode(phone: string, code: string, info: string) {
    return $fetch(`${baseUrl}/auth/verify_sms`, {
      method: "POST",
      body: {
        phone_number: phone,
        code: code,
        device_info: info,
      },
    });
  },
  loginWithEmail(loginForm: LoginForm) {
    return $fetch(`${baseUrl}/auth/google`, {
      method: "POST",
      body: loginForm,
    });
  },
  getSession(username: string, token: string | null) {
    return $fetch(baseUrl + "/auth/sessions?username=" + username, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  removeSession(token: string | null, id: number | string) {
    return $fetch(`${baseUrl}/auth/sessions/logout`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        session_id: id,
      },
    });
  },
  verifyToken(token: string | null) {
    return $fetch(baseUrl + "/auth/verify-token", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};
