import { ClockIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";

export function StatisticsCard({ color, icon, title, value, footer, footerType }) {
   return (
      <Card>
         <CardHeader variant="gradient" color={color} className="absolute -mt-4 grid h-16 w-16 place-items-center">
            {icon}
         </CardHeader>

         <CardBody className="p-4 text-right">
            <Typography variant="small" className="font-normal text-blue-gray-600">
               {title}
            </Typography>
            <Typography variant="h4" color="blue-gray">
               {value}
            </Typography>
         </CardBody>

         {footer && footerType === "cards" && (
            <CardFooter className="border-t border-blue-gray-50 p-4">
               <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
               </Typography>
            </CardFooter>
         )}

         {footer && footerType === "charts" && (
            <CardFooter className="border-t border-blue-gray-50 p-4">
               <Typography variant="small" className="flex items-center font-normal text-blue-gray-600">
                  <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                  &nbsp;{props.footer}
               </Typography>
            </CardFooter>
         )}
      </Card>
   );
}
