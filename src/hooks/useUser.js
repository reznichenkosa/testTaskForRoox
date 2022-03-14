import React from "react";

export const useUsers = (users, sort) => {
    const sortedUsers = React.useMemo(() => {
        if (sort === 'city') {
          return [...users].sort((a,b) => a.address.city.localeCompare(b.address.city));
        }
        if (sort === 'company') {
          return [...users].sort((a,b) => a.company.name.localeCompare(b.company.name));
        }
        return users;
    }, [sort, users]);

    return sortedUsers;
}