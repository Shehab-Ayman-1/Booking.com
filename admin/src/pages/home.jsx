import { useNavigate } from "react-router-dom";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { StatisticsCard, StatisticsChart } from "@/widgets";
import { statisticsCardsData, statisticsChartsData } from "@/data";
import { User } from "@/assets";
import { Table } from "@/components";
import { useContext } from "@/context";
import { useAxios } from "@/hooks";

export function Home() {
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
              let td = `py-3 px-5 text-center ${i === authsStates.users?.length - 1 ? "" : "border-b border-blue-gray-50"}`;
              let typography = `text-[18px] font-semibold text-blue-gray-600`;
              return (
                 <tr className={i % 2 ? "bg-blue-50" : ""} key={i}>
                    <td className={`flex items-center justify-start whitespace-nowrap ${td}`}>
                       <Avatar src={avatar || User} className="mr-2 ml-2 h-[32px] w-[32px]" />
                       <Typography variant="small" className={typography}>
                          - {fName} {lName}
                       </Typography>
                    </td>
                    <td className={`${td} whitespace-nowrap`}>
                       <Typography variant="small" className={typography}>
                          {email}
                       </Typography>
                    </td>
                    <td className={td}>
                       <Typography variant="small" className={typography}>
                          {isAdmin ? "Admin" : "User"}
                       </Typography>
                    </td>
                    <td className={`${td} whitespace-nowrap`}>
                       <Button className="mr-2 text-[15px]" variant="gradient" size="sm" onClick={() => navigate("/auth/update-user", { state: { _id, avatar, fName, lName, email, isAdmin } })}>
                          Update
                       </Button>
                       <Button className="text-[15px] " variant="gradient" size="sm" color="red" disabled={loading} onClick={() => handleDeleteUser(_id)}>
                          Delete
                       </Button>
                    </td>
                 </tr>
              );
           })
         : null;
   };

   return (
      <div className="mt-12">
         <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {statisticsCardsData.map(({ Icon, title, footer, ...rest }) => (
               <StatisticsCard {...rest} key={title} title={title} icon={<Icon className="h-6 w-6 text-white" />} footer={footer} footerType="cards" />
            ))}
         </div>

         <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
            {statisticsChartsData.map(({ title, footer, ...rest }) => (
               <StatisticsChart {...rest} key={title} footer={footer} footerType="charts" />
            ))}
         </div>

         <div className="mb-4">
            <Table
               states={authsStates}
               dispatch={authsDispatch}
               title="Users"
               headers={["Name", "Email", "Role", "Controllers"]}
               addButton={{ text: "Add User", path: "/auth/register" }}
               paginationURL={"/users/get-users"}
            >
               <UsersRows />
            </Table>
         </div>
      </div>
   );
}
