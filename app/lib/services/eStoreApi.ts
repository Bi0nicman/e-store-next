const API_BASE_URL = 'http://localhost:3002';

type CreateUserPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: string;
  email: string;
};

type LoginUserPayload = {
  username: string;
  password: string;
};

export async function fetchUsers() {
  const res = await fetch(`${API_BASE_URL}/users/user`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUsers(payload: CreateUserPayload) {
  const res = await fetch(`${API_BASE_URL}/auth/signUp`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const rawResponse = await res.text();
  if (!res.ok) {
    let message = rawResponse || 'Failed to create user';
    try {
      const errJson = rawResponse ? JSON.parse(rawResponse) : null;
      message = errJson?.message ?? errJson?.error ?? message;
    } catch {}
    throw new Error(`createUsers failed (${res.status}): ${message || "empty response"}`);
  }
  
  // Handle empty response (204 No Content or empty body)
  if (!rawResponse || rawResponse.trim() === '') {
    return { success: true };
  }
  
  return JSON.parse(rawResponse);
}

export async function authenticateUser(formData: FormData) {

  const payload: LoginUserPayload = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  const res = await fetch(`${API_BASE_URL}/auth/signIn`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Failed to authenticate user');
  return res.json();
}

export async function fetchCurrentUser() {
  const res = await fetch(`${API_BASE_URL}/auth/user`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch current user');
  return res.json();
}


export async function logoutUser() {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    cache: 'no-store',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to logout user');
  return res.json();
}