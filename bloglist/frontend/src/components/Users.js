import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = () => {
  const users = useSelector(({ users }) => users);

  return (
    <div>
      {users && (
        <div>
          <h2>Users</h2>
          <h4 style={{ paddingLeft: 150 }}>blogs created</h4>
          <Table striped>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};
export default Users;
