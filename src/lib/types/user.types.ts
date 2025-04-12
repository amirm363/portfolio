import { ICON_MAP } from "../utils";

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export type SocialLink = {
  name: string;
  url: string;
  icon: keyof typeof ICON_MAP;
};

export type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description?: string[];
};

export type Project = {
  name: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
};

// export type Education = {
//   school: string;
//   degree: string;
//   startDate: string;
//   endDate: string;
// };

export type NavigationLink = {
  name: string;
  url: string;
};

export type Skill = {
  name: string;
  icon: string;
};

export type UserConfig = {
  id: string;
  name: string;
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  profilePicture: string;
  bio: string;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  navigationLinks: NavigationLink[];
};
