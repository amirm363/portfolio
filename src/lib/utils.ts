import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FC } from "react";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
  DribbbleIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  ArrowDownIcon,
} from "lucide-react";

type IconType = FC<{ className?: string }>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ICON_MAP: Record<string, IconType> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  twitter: TwitterIcon,
  dribbble: DribbbleIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  ArrowDown: ArrowDownIcon,
};

export const handleSessionStorage = {
  set: (key: string, value: string) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: string) => {
    return JSON.parse(sessionStorage.getItem(key) || "null");
  },
  remove: (key: string) => {
    sessionStorage.removeItem(key);
  },
  clear: () => {
    sessionStorage.clear();
  },
};
