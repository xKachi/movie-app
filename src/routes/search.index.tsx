import { createFileRoute, defer, Await } from "@tanstack/react-router";
import { Suspense } from "react";

import MovieCards from "../components/MovieCards";
import Movie from "../components/Movie";

import { searchMovie, getMovie } from "../api";

interface SearchParams {
  query: string;
}

export const Route = createFileRoute("/search/")({
  component: SearchRoute,
  loaderDeps: ({ search: { query } }) => ({ query }),
  loader: async ({ deps: { query } }) => {
    const movies = await searchMovie(query);
    return {
      movies,
      firstMovie: movies?.[0]?.id ? defer(getMovie(movies[0].id)) : null,
    };
  },
  validateSearch: (search: { query: string }): SearchParams => {
    return {
      query: (search.query as string) || "",
    };
  },
});

function SearchRoute() {
  const { movies, firstMovie } = Route.useLoaderData();
  console.log(movies);

  return (
    <>
      {firstMovie && (
        <div className="my-5">
          <Suspense fallback={<div>Loading...</div>}>
            <Await promise={firstMovie}>
              {(movie) => {
                return <Movie movie={movie} />;
              }}
            </Await>
          </Suspense>
        </div>
      )}
      <MovieCards movies={movies || []} />
    </>
  );
}
