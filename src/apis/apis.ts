import axios from "axios"
import { Movie } from "../pages/Homepage/models/movie"

export const fetchMovies = async () => {
  const { data } = await axios.get<Movie[]>("https://run.mocky.io/v3/d03e0886-f5c8-4961-902d-51bfe8059a33")
  return data
}