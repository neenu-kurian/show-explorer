import { API_URL } from "./constants";
import HomeClient from "./components/HomeClient";
import fetch from "node-fetch";
import { Show } from "./types";

const HomePage = async () => {
  const response = await fetch(`${API_URL}/shows`);
  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.status}`);
  }
  const data = await response.json() as Show[];

  return <HomeClient shows={data} />;
};

export default HomePage;
