interface servicesType {
  icon: string;
  title: string;
}

export const services: servicesType[] = [
  {
    icon: require("../assets/images/people.png"),
    title: "Connections",
  },
  {
    icon: require("../assets/images/messages.png"),
    title: "Messages",
  },
  {
    icon: require("../assets/images/details.png"),
    title: "Details",
  },
  {
    icon: require("../assets/images/privacy.png"),
    title: "Privacy",
  },
  {
    icon: require("../assets/images/terms.png"),
    title: "Terms and Polycies",
  },
];
