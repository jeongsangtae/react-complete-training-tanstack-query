import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Header from "../Header.jsx";
import { fetchEvent } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventDetails() {
  const params = useParams();
  const id = params.id;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { id: id }],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <LoadingIndicator />}
      {!isPending && data && (
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={deleteHandler}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src="http://localhost:3000/" alt="" />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>{data.time}</time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      )}
      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message || "Failed to fetch events."}
        />
      )}
    </>
  );
}
