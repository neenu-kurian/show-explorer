import { API_URL } from "./constants";
import HomeClient from "./components/HomeClient";
import https from "https";
import fetch from "node-fetch";
import { Show } from "./types";

const agent = new https.Agent({ rejectUnauthorized: false });

const HomePage = async () => {
  const response = await fetch(`${API_URL}/shows`, {
    agent,
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.status}`);
  }
  const data = await response.json() as Show[];
   console.log('res',data);

  return <HomeClient shows={data} />;
};

export default HomePage;
