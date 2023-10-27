import { team1, team2, team3, team4, homeDecor1, homeDecor2, homeDecor3, homeDecor4 } from "@/assets";

export const projectsData = [
   {
      img: homeDecor1,
      title: "Modern",
      tag: "Project #1",
      description: "As Uber works through a huge amount of internal management turmoil.",
      route: "/dashboard/profile",
      members: [
         { img: team1, name: "Romina Hadid" },
         { img: team2, name: "Ryan Tompson" },
         { img: team3, name: "Jessica Doe" },
         { img: team4, name: "Alexander Smith" },
      ],
   },
   {
      img: homeDecor2,
      title: "Scandinavian",
      tag: "Project #2",
      description: "Music is something that every person has his or her own specific opinion about.",
      route: "/dashboard/profile",
      members: [
         { img: team4, name: "Alexander Smith" },
         { img: team3, name: "Jessica Doe" },
         { img: team2, name: "Ryan Tompson" },
         { img: team1, name: "Romina Hadid" },
      ],
   },
   {
      img: homeDecor3,
      title: "Minimalist",
      tag: "Project #3",
      description: "Different people have different taste, and various types of music.",
      route: "/dashboard/profile",
      members: [
         { img: team1, name: "Romina Hadid" },
         { img: team2, name: "Ryan Tompson" },
         { img: team3, name: "Jessica Doe" },
         { img: team4, name: "Alexander Smith" },
      ],
   },
   {
      img: homeDecor4,
      title: "Gothic",
      tag: "Project #4",
      description: "Why would anyone pick blue over pink? Pink is obviously a better color.",
      route: "/dashboard/profile",
      members: [
         { img: team4, name: "Alexander Smith" },
         { img: team3, name: "Jessica Doe" },
         { img: team2, name: "Ryan Tompson" },
         { img: team1, name: "Romina Hadid" },
      ],
   },
];
