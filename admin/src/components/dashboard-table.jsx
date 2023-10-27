import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { Button, Typography } from "@material-tailwind/react";
import { useAxios } from "@/hooks";

export const Table = ({ states = [], dispatch, title, addButton, headers, paginationURL, children }) => {
   const [widgetNo, setWidgetNo] = useState({ from: 0, to: 5 });
   const { loading, refetch } = useAxios("get", "/");
   const navigate = useNavigate();

   useEffect(() => {
      (async () => {
         let { data, loading, error } = await refetch("get", `${paginationURL}?from=${widgetNo.from}&to=${widgetNo.to}`);

         if (!loading && !error && data?.users?.length) dispatch({ type: "GET_AUTHS", payload: data });
         if (!loading && !error && data?.hotels?.length) dispatch({ type: "GET_Hotels", payload: data });
      })();
   }, [widgetNo]);

   const nextWidget = () => {
      if (widgetNo.from + 5 >= states?.count) return;

      setWidgetNo(({ from, to }) => {
         let _from = from + 5 <= states?.count ? from + 5 : from;
         let _to = to + 5 <= states?.count + 5 ? to + 5 : to;
         return { from: _from, to: _to };
      });
   };

   const prevWidget = () => {
      if (widgetNo.from === 0 || widgetNo.to === 5) return;

      setWidgetNo(({ from, to }) => {
         let _from = from - 5 <= 0 ? 0 : from - 5;
         let _to = to - 5 <= 0 ? 5 : to - 5;
         return { from: _from, to: _to };
      });
   };

   return (
      <Card className="overflow-hidden xl:col-span-2">
         <CardHeader floated={true} shadow={true} variant="gradient" color="blue" className="m-0 flex items-center justify-between p-6">
            <div className="mb-1 flex w-full items-center justify-between gap-3">
               <Typography variant="h2" color="white">
                  {title}
               </Typography>
               {addButton && (
                  <Button variant="gradient" color="green" size="lg" onClick={() => navigate(addButton?.path, { state: addButton?.state })}>
                     {addButton?.text}
                  </Button>
               )}
            </div>
         </CardHeader>

         <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
               <thead>
                  <tr className="min-w-[400px] bg-blue-200">
                     {headers?.map((el, i) => (
                        <th key={i} className="border-b border-blue-gray-50 py-3 px-6 text-center">
                           <Typography variant="small" className="text-[18px] font-bold uppercase text-black">
                              {el}
                           </Typography>
                        </th>
                     ))}
                  </tr>
               </thead>

               <tbody>{children}</tbody>

               <tfoot className="flex w-full py-3 px-6">
                  <tr>
                     <td className="flex min-w-[150px] items-center justify-start gap-4 whitespace-nowrap" colSpan={headers.length}>
                        <button className="fa fa-arrow-left mr-1 cursor-pointer text-3xl text-black transition hover:text-blue-500" disabled={loading} onClick={prevWidget} />
                        <span className="count">{widgetNo?.from / 5 + 1}</span>
                        <span className="count"> / {Math.ceil(states?.count / 5)}</span>
                        <button className="fa fa-arrow-right ml-1 cursor-pointer text-3xl text-black transition hover:text-blue-500" disabled={loading} onClick={nextWidget} />
                     </td>
                  </tr>
               </tfoot>
            </table>
         </CardBody>
      </Card>
   );
};
