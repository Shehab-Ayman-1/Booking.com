import { logoAtlassian, logoInvision, logoJira, logoSlack, logoSpotify, logoXD, team1, team2, team3, team4 } from "@/assets";

export const projectsTableData = [
   {
      img: logoXD,
      name: "Material XD Version",
      members: [
         { img: team1, name: "Romina Hadid" },
         { img: team2, name: "Ryan Tompson" },
         { img: team3, name: "Jessica Doe" },
         { img: team4, name: "Alexander Smith" },
      ],
      budget: "$14,000",
      completion: 60,
   },
   {
      img: logoAtlassian,
      name: "Add Progress Track",
      members: [
         { img: team2, name: "Ryan Tompson" },
         { img: team4, name: "Alexander Smith" },
      ],
      budget: "$3,000",
      completion: 10,
   },
   {
      img: logoSlack,
      name: "Fix Platform Errors",
      members: [
         { img: team3, name: "Jessica Doe" },
         { img: team1, name: "Romina Hadid" },
      ],
      budget: "Not set",
      completion: 100,
   },
   {
      img: logoSpotify,
      name: "Launch our Mobile App",
      members: [
         { img: team4, name: "Alexander Smith" },
         { img: team3, name: "Jessica Doe" },
         { img: team2, name: "Ryan Tompson" },
         { img: team1, name: "Romina Hadid" },
      ],
      budget: "$20,500",
      completion: 100,
   },
   {
      img: logoJira,
      name: "Add the New Pricing Page",
      members: [{ img: team4, name: "Alexander Smith" }],
      budget: "$500",
      completion: 25,
   },
   {
      img: logoInvision,
      name: "Redesign New Online Shop",
      members: [
         { img: team1, name: "Romina Hadid" },
         { img: team4, name: "Alexander Smith" },
      ],
      budget: "$2,000",
      completion: 40,
   },
];
