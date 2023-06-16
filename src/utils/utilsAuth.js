
export async function LoginPageContent(username, password) {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`Request failed with status code ${response.status}`);
    }
    const { token } = await response.json();
    localStorage.setItem('token', token);
    return token;
}


export async function signUp(username, password) {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
  
    if (response.status !== 201) {
        throw new Error(`Request failed with status code ${response.status}`);
    }
  
    const { token } = await response.json();
    localStorage.setItem('token', token);
    return token;
}


export function logout() {
    localStorage.removeItem('token');
}

export function isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
}

export async function getLoggedInUser() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const response = await fetch('http://localhost:3000/User', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
}
