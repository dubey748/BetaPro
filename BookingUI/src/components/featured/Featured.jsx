import "./featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels/countByCity?cities=Mumbai,New Delhi,Gorakhpur"
  );
 
  

  return (
    <div className="featured">
      {loading ? (
        "loading please wait..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
 
          <div className="featuredItem">
            <img
              src="https://media.istockphoto.com/photos/mountain-view-in-mussoorie-dehradun-uttarakhand-picture-id1214520953?b=1&k=20&m=1214520953&s=170667a&w=0&h=niGab0OBwTiXuxq9x9yD8WD614vGzLcsuDRm9EPcVlw="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>New Delhi</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1619837374214-f5b9eb80876d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFkYWtofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Gorakhpur</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
