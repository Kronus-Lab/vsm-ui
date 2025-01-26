import { useContext } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { AppUserContext } from "../context/AppUser";
import "./ServersList.css"

export default function ServersList(){

    const user = useContext(AppUserContext)

    return (
    <>
        { user.isReady ?
            <List className='nav'>
                {user.user?.vpn_servers?.map((server, index) => (
                    <ListItem className="nav-item" key={index}>
                        <ListItemButton className='nav-link' component="a" href={"/api/servers/" + server}>
                            <ListItemText primary={server} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        : <></>
        }
    </>
       
    )
}