import "./Home.css";
import { useEffect, useState } from "react";
import { useUser } from "./context/UserContext";
import { Link } from "react-router-dom";

const SERVER = "http://localhost:5001";

function Home() {
  const [projects, setProjects] = useState([]);
  const { loggedInUser } = useUser();

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${SERVER}/api/projects`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const projectsData = await response.json();
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const isStudent = loggedInUser && loggedInUser.role === "Student";
  const isMP = loggedInUser && loggedInUser.role === "MP";

  return (
    <div className="home-container">
      <div className="home">
        <p>
          Welcome {loggedInUser.name}, {loggedInUser.role}
        </p>
        {(isStudent || isMP) && (
          <Link to="/addProject">
            <button className="button">Add Project</button>
          </Link>
        )}
        {isStudent && (
          <Link to="/teamForm">
            <button className="button">Add Team</button>
          </Link>
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.name}</td>
                <td className="td-button">
                  <Link to="/bugForm">
                    <button className="button">Add a bug</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
