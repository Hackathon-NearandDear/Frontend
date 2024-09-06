const API_BASE_URL = "http://52.87.64.91:8000";

export async function fetchTopAIs() {
  const response = await fetch(`${API_BASE_URL}/ai/top10/`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
