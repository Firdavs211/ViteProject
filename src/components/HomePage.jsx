import { useEffect } from "react";
import { fetchData } from "../slice/fetchDataSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const HomePage = () => {
  const dispatch = useDispatch();

  const dataState = useSelector((state) => state.getData);
  console.log(dataState.data);

  useEffect(() => {
    dispatch(fetchData(`https://api.spaceflightnewsapi.net/v3/articles`));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-3">Today's news</h1>
      {dataState.loading && <Loader />}
      {dataState.error && <p>fetch data error</p>}
      {dataState.data && Array.isArray(dataState.data) && (
        <ul className="card-list d-grid gap-4 mb-5 list-unstyled">
          {dataState.data.map((item) => {
            const formattedDate = moment(item.publishedAt).format(
              "MMMM D, YYYY [at] h:mm A"
            );

            return (
              <li key={item.id} className="card">
                <div className="card-body d-flex justify-content-between gap-3 p-0">
                  <div className="p-3">
                    <Link
                      to={`news/${item.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <h4 className="card-title">{item.title}</h4>
                    </Link>
                    <p className="card-text fs-5">{item.summary}</p>
                  </div>
                  <Link to={`news/${item.id}`}>
                    <img
                      className="news-card-img"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                  </Link>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <p className="newssite m-0 text-primary"> @{item.newsSite}</p>
                  <time className="text-secondary">{formattedDate}</time>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
