const API_BASE_URL = "http://52.87.64.91:8000";

export async function createChat(chatData: { aiid: string; userid: string }) {
  const response = await fetch(`${API_BASE_URL}/chats/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chatData),
  });
  if (!response.ok) {
    const errorData = await response.text();
    console.error("Error response:", errorData);
    throw new Error(
      `Failed to create AI: ${response.status} ${response.statusText}\n${errorData}`,
    );
  }

  return await response.json();
}
