import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserService from "./API/UserService";
import UsersFilter from "./components/usersFilter/UsersFilter";
import UserInfo from "./components/userInfo/UserInfo";
import UsersList from "./components/usersList/UsersList";
import { useFetching } from "./hooks/useFetching";
import { useUsers } from "./hooks/useUser";

function App() {

  const [users, setUsers] = useState([]);
  const [fetchUsers, isLoading, error] = useFetching(async () => {
    const response = await UserService.getAllUsers();
    setUsers(response.data); 
  });
  
  const [filter, setFilter] = useState('');
  const usersSorted = useUsers(users, filter);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <UsersFilter setFilter={setFilter}/>
      <BrowserRouter>
        <Routes>

          <Route path="/users" element={<UsersList users={usersSorted} isLoading={isLoading} error={error} />} />
          <Route path="/users/:id" element={<UserInfo />} />
          <Route path="*" element={<h1>Error</h1>} />
          <Route path="/" element={<Navigate to="/users" />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
