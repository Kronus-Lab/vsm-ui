import {Button} from "@mui/material";

export default function ApplicationLogin() {
    return (
        <>
            <main className="container-fluid">
                <div className="px-4 py-5 my-5 text-center">
                    <div className="col-lg-6 mx-auto">
                        {/* We need to use a href link to ensure we follow the resulting redirect */}
                        <a href={"/auth/login"}><Button >Log In</Button></a>
                    </div>
                </div>
            </main>
        </>
    )
}
