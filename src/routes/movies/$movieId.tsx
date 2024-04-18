import { createFileRoute } from "@tanstack/react-router";
import { getMovie } from "../../api";
import Movie from "../../components/Movie";

export const Route = createFileRoute("/movies/$movieId")({
  component: DetailRoute,
  loader: ({ params: { movieId } }) => getMovie(movieId),
});

function DetailRoute() {
  const movie = Route.useLoaderData();
  return <Movie movie={movie} />;
}
