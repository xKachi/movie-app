import { createFileRoute, Link } from "@tanstack/react-router";
import { getMovies } from "../api";
import { z } from "zod";

import MovieCards from "../components/MovieCards";

export const Route = createFileRoute("/")({
  component: IndexComponent,
  validateSearch: z.object({
    page: z.number().catch(1),
  }),
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: ({ deps: { page } }) => getMovies(page),
});

function IndexComponent() {
  const { page } = Route.useSearch();
  const { movies, pages } = Route.useLoaderData();

  return (
    <div>
      <div className="flex justify-end pr-5 py-5">
        <div className="flex gap-1 text-xl font-bold justify-end">
          {new Array(pages).fill(0).map((_, i) =>
            page === i + 1 ? (
              <div className="px-4 py-2 border border-red-300 rounded bg-[#0b0000] text-white">
                {i + 1}
              </div>
            ) : (
              <Link
                key={i}
                from={Route.id}
                search={{
                  page: i + 1,
                }}
                className="px-4 py-2 border border-red-300 rounded hover:bg-[#a33d3da1]"
              >
                {i + 1}
              </Link>
            )
          )}
        </div>
      </div>
      <MovieCards movies={movies} />
    </div>
  );
}
