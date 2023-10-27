import { Avatar, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { User } from "@/assets";
import { Table } from "@/components";
import { useContext } from "@/context";
import { useAxios } from "@/hooks";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export const Users = () => {
   const { loading, refetch } = useAxios("delete", "/");
   const [authsStates, authsDispatch] = useContext(1);
   const navigate = useNavigate();

   const handleDeleteUser = async (id) => {
      const { data, loading, error } = await refetch("delete", `/users/delete-user/${id}`);
      if (!loading && !error && typeof data === "string") authsDispatch({ type: "DELETE_USER", payload: id });
      if (!loading && error) alert(error);
   };

   const UsersRows = () => {
      return authsStates.users?.length
         ? authsStates.users.map(({ _id, avatar, fName, lName, email, isAdmin }, i) => {
              let td = `py-3 px-5 text-center whitespace-nowrap`;
              let typography = `text-[18px] font-semibold text-blue-gray-600`;
              return (
                 <tr className={i % 2 ? "bg-blue-50" : ""} key={i}>
                    <td className={`${td}`}>
                       <Button
                          className="mr-1 text-[10px]"
                          variant="text"
                          size="sm"
                          disabled={loading}
                          onClick={() => navigate(`/auth/update-user`, { state: { _id, avatar, fName, lName, email, isAdmin } })}
                       >
                          <PencilSquareIcon /> Update
                       </Button>
                       <Button className="text-[10px]" variant="text" size="sm" color="red" disabled={loading} onClick={() => handleDeleteUser(_id)}>
                          <TrashIcon /> Delete
                       </Button>
                    </td>
                    <td className={`${td}`}>
                       <Avatar src={avatar || User} alt={fName} className="mr-2 ml-2 h-[32px] w-[32px]" />
                       <Typography variant="small" className={`${typography} inline-block`}>
                          {fName} {lName}
                       </Typography>
                    </td>
                    <td className={td}>
                       <Typography variant="small" className={typography}>
                          {email}
                       </Typography>
                    </td>
                    <td className={td}>
                       <Typography variant="small" className={typography}>
                          {isAdmin ? "Admin" : "User"}
                       </Typography>
                    </td>
                    <td className={td}>
                       <Typography variant="small" className={`${typography} ${i % 2 ? "text-red-500" : "text-green-500"}`}>
                          {i % 2 ? "Offline" : "Online"}
                       </Typography>
                    </td>
                 </tr>
              );
           })
         : null;
   };

   return (
      <div className="mb-4">
         <Table
            states={authsStates}
            dispatch={authsDispatch}
            title="Users"
            headers={["Controllers", "Name", "Email", "Role", "state"]}
            addButton={{ text: "Add User", path: "/auth/register" }}
            paginationURL={"/users/get-users"}
         >
            <UsersRows />
         </Table>
      </div>
   );
};
