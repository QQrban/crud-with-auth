import type { JSX } from "react";

export type LoginForm = {
    identifier: string,
    password: string
}

export type AuthResponse = {
    token: string
}

export type DrawerItem = {
  text: string;
  icon: JSX.Element;
  to?: string;               
  onClick?: () => void;
};