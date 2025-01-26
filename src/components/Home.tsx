import {Outlet} from "react-router";
import {useEffect, useState} from "react";
import {AppUserState, AppUserContext, AppUser} from "../context/AppUser";
import TopBar from "./TopBar";
import ServersList from "./ServersList";
import "./Home.css"


export default function Home() {
    const [user, setUser] = useState<AppUserState>({isReady: false});
    //init
    useEffect(() => {
        if (!user.isReady) {
            fetch('/api/whoami', {
                headers: {accept: 'application/json'}
            }).then(async (resp) => {
                if (resp.ok) {
                    const body = await resp.json();
                    setUser({isReady: true, user: body as AppUser});
                }
            })
        }
    })

    return (
        <>
            <AppUserContext.Provider value={user}>
                <TopBar />
                {user.isReady ?
                    <>
                        <div className="container justify-content-center">
                            <h4>Download VPN Server Configuration</h4>
                            <ServersList />
                        </div>
                    </>
                    : 
                    <>
                        
                    </>
                }

                <Outlet/>
            </AppUserContext.Provider>
        </>
    )
}
