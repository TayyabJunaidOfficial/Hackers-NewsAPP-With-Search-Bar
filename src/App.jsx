import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      const responseData = await response.json();
      setData(responseData.hits);
    } catch (error) {
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="text-center mb-4">Search Hacker News</h1>
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Search Hacker News"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleSearch}
            />
            {error && <p className="text-danger">{error}</p>}
            <div>
              {data &&
                data.map((item) => (
                  <div key={item.objectID} className="card mb-3">
                    <div className="card-body">
                      <h2 className="card-title">{item.title}</h2>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Author: {item.author}
                      </h6>
                      <p>Points: {item.points}</p>
                      <p className="card-text">Comments: {item.num_comments}</p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
