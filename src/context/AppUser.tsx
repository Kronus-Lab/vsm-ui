import {createContext} from "react";

export interface AppUser {
    username?: string;
    vpn_servers?: string[];
}

export interface AppUserState {
    isReady: boolean;
    user?: AppUser;
}
    
export const AppUserContext = createContext<AppUserState>({
    isReady: false
});
