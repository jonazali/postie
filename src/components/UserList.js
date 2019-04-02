import React from "react";
import "../css/UserList.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserList = ({ users }) => (
  <div className="user-list">
    <ul className="list">
      {users.map(user => (
        <li key={user.id}>
          <p className="list-item-title">{user.username}</p>
          <Link
            to={{ pathname: `/users/${user.id}`, state: { user } }}
            className="details"
          >
            Details
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// class UserList extends React.Component {
//   render() {
//     return (
//       <div className="user-list">
//         <ul className="list">
//           {this.props.users.map(user => (
//             <li key={user.id}>
//               <p className="list-item-title">{user.username}</p>
//               <Link
//                 to={{ pathname: `/users/${user.id}`, state: { user } }}
//                 className="details"
//               >
//                 Details
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string
    })
  ).isRequired
};

export default UserList;
