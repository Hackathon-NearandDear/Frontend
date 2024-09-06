const API_BASE_URL = "http://52.87.64.91:8000";

export async function loginUser(address: string) {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid: address }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}

export async function fetchChatList(userid: string) {
  const response = await fetch(`${API_BASE_URL}/chats/${userid}`);
  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response body:", errorText);
    throw new Error(
      `Failed to fetch chat list: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  console.log("Received data:", data);
  return data;
}
