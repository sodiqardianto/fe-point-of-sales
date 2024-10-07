export interface SidenavProps {
  routes: RouteInterface[];
}

export interface RouteInterface {
    uniq_id: string;
    name: string;
    path: string;
    title: null | string;
    icon: string;
    submenus: Submenu[];
  }
  
export interface Submenu {
    uniq_id: string;
    name: string;
    path: string;
  }