export const configStates = {
   openSidenav: false,
   sidenavColor: "blue",
   sidenavType: "dark",
   transparentNavbar: true,
   fixedNavbar: false,
   openConfigurator: false,
};

export const authStates = {
   users: [],
   count: 0,
   auth: {
      fName: "",
      lName: "",
      email: "",
      expTime: 1000 * 60 * 60,
      accessToken: "",
   },
};

export const hotelStates = {
   hotels: [],
   count: 0,
   hotel: {
      avatar: "",
      name: "",
      title: "",
      type: "",
      address: "",
      city: "",
      description: "",
      distance: 0,
      price: 0,
      rating: 0,
      photos: [],
      rooms: [],
      featured: false,
   },
};
