import fs from 'node:fs'
import path from 'node:path'
import { http, HttpResponse } from 'msw'


let isLoggedIn = false

// Mock server setup; Does not need to mock the oAuth callback function to test UI functionalities.
const handlers = [

    // Simulated user information endpoint. Returns a 401 is not already logged in, else returns john doe's account information and VPN servers.
    http.get('/api/whoami', () => {
        if (isLoggedIn) {
            console.log('[GET] /api/whoami - Logged in as John Doe');
            return HttpResponse.json({
                username: 'jdoe',
                vpn_servers: ['myserver','myserver2', 'myserver3']
            });
        } else {
            console.log('[GET] /api/whoami - Not Logged in');
            return new HttpResponse(null, { status: 401 });
        }
    }),

    // Simulated login endpoint. (We don't need to go through the callback function)
    http.get('/auth/login', () => {
        console.log("[MOCK] Logging in as John Doe")
        isLoggedIn = true;
        return new HttpResponse(null, {
            status: 302,
            headers: {
              Location: '/',
            },
        })
    }),

    // Simulated logout endpoint.
    http.get('/auth/logout', () => {
        console.log("[MOCK] Logging out")
        isLoggedIn = false;
        return new HttpResponse(null, {
            status: 302,
            headers: {
              Location: '/',
            },
        })
    }),

    // Simulated 'myserver' endpoint only needs to return a 200 ok response for tests to pass.
    //   as the ACL and file checks are handled by the API test framework.
    http.get('/api/servers/myserver', () => {
        console.log('[MOCK] Server')
        if(isLoggedIn) {
            const buffer = fs.readFileSync(
                path.resolve(process.cwd(), 'mocks', `myserver.ovpn`)
            )
            
            return HttpResponse.arrayBuffer(buffer, {
                headers: {
                  'Content-Type': 'text/plain',
                  'Content-Disposition': 'attachment; filename=myserver.ovpn',
                },
              });
        }
        return new HttpResponse(null, {
            status: 302,
            headers: {
              Location: '/',
            },
        })
    })
]

export default handlers;