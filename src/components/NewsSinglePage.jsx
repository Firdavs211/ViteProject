import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../slice/fetchDataSlice";
import Loader from "./Loader";
import moment from "moment";

const NewsSinglePage = () => {
  const dispatch = useDispatch();
  const { articleId } = useParams();
  console.log(articleId);
  const dataState = useSelector((state) => state.getData);
  console.log(dataState.data);

  useEffect(() => {
    dispatch(
      fetchData(`https://api.spaceflightnewsapi.net/v3/articles/${articleId}`)
    );
  }, []);

  const formattedDate = moment(dataState.data.publishedAt).format(
    "MMMM D, YYYY [at] h:mm A"
  );

  return (
    <div className="container">
      {dataState.loading && <Loader />}
      <div className="mt-3 w-50 mx-auto">
        <div className="card-body gap-3 p-0">
          <div>
            <h3>{dataState.data.title}</h3>
            <p className="card-text fs-5 mt-3">{dataState.data.summary}</p>
          </div>
          <img
            className="article-img my-3"
            src={dataState.data.imageUrl}
            alt={dataState.data.title}
          />
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center fs-6">
          <p className="newssite m-0 text-primary">
            {" "}
            {dataState.data.newsSite}
          </p>

          <time className="text-secondary">{formattedDate}</time>
        </div>
      </div>
    </div>
  );
};

export default NewsSinglePage;
