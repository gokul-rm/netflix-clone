import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const movieSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.NUMBER, description: "A unique integer ID for the movie." },
    title: { type: Type.STRING, description: "The title of the movie." },
    overview: { type: Type.STRING, description: "A brief synopsis of the movie, around 2-3 sentences." },
    backdrop_path: { type: Type.STRING, description: "A placeholder image URL from picsum.photos with 1280x720 resolution." },
    poster_path: { type: Type.STRING, description: "A placeholder image URL from picsum.photos with 500x750 resolution." },
    youtube_trailer_id: { type: Type.STRING, description: "A valid YouTube video ID for a trailer. For example, use 'dQw4w9WgXcQ' for testing." },
    genres: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of strings listing the movie's genres (e.g., 'Action', 'Sci-Fi')." },
    vote_average: { type: Type.NUMBER, description: "The average user rating for the movie, from 0 to 10, with one decimal place." },
  },
  required: ["id", "title", "overview", "backdrop_path", "poster_path", "youtube_trailer_id", "genres", "vote_average"],
};

const fullSchema = {
  type: Type.ARRAY,
  items: movieSchema,
};

export const fetchMoviesByCategory = async (prompt: string): Promise<Movie[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following request, generate a list of movies. For each movie, provide a unique integer ID, title, overview, an array of genres, a backdrop_path URL from picsum.photos (1280x720), a poster_path URL from picsum.photos (500x750), a youtube_trailer_id, and a vote_average (user rating out of 10). Request: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: fullSchema,
      },
    });

    const jsonText = response.text.trim();
    const movies = JSON.parse(jsonText);
    return movies as Movie[];
  } catch (error) {
    console.error("Error fetching movies from Gemini API:", error);
    // Return an empty array or throw the error to be handled by the component
    return [];
  }
};