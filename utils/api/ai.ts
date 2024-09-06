const API_BASE_URL = "http://52.87.64.91:8000";

export async function fetchTopAIs() {
  const response = await fetch(`${API_BASE_URL}/ai/top10/`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchAILogs(id: string) {
  const response = await fetch(`${API_BASE_URL}/ailogs/ai/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function createAI(aiData: {
  name: string;
  creator: string;
  category: string;
  introductions: string;
  contents: string;
  logs: string;
}) {
  const response = await fetch(`${API_BASE_URL}/ai/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aiData),
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
