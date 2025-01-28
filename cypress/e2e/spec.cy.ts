import path from 'path';

describe('End to End testing of VPN Server Manager', () => {
  it('Not logged in', () => {
    cy.visit('http://localhost:5173/api/servers/myserver')
    cy.get('[id=":r1:"]').contains("Login")
    cy.screenshot("not_logged_in")
  })

  it('Login and download file', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[id=":r1:"]').click();
    cy.get('a[href="/api/servers/myserver"]').click();
    cy.screenshot("success");
  })

  it('Verify the downloaded file', () => {
    const downloadsFolder = Cypress.config("downloadsFolder")
    cy.readFile(path.join(downloadsFolder, "myserver.ovpn"))
      .should("exist")
      .should("include", "cipher AES-256-CBC")
      .should("include", "auth SHA1")
      .should("include", "remote myvpn.example.com 1194 udp")
      .should("include", "verify-x509-name \"C=CA, ST=Ontario, L=Toronto, O=My Org, emailAddress=admin@example.com, CN=myvpn.example.com\" subject")
      .should("include", "<ca>\n-----BEGIN CERTIFICATE-----\n")
      .should("include", "-----END CERTIFICATE-----\n</ca>")
      .should("include", "<cert>\n-----BEGIN CERTIFICATE-----\n")
      .should("include", "-----END CERTIFICATE-----\n</cert>")
      .should("include", "<key>\n-----BEGIN RSA PRIVATE KEY-----\n")
      .should("include", "-----END RSA PRIVATE KEY-----\n</key>")
      .should("include", "<tls-crypt>\n#\n# 2048 bit OpenVPN static key\n#\n-----BEGIN OpenVPN Static key V1-----\nsingleline\nstatickey\n-----END OpenVPN Static key V1-----\n\n</tls-crypt>")
  })

  it('Logout', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[id=":r3:"]').click()
    cy.get('[id=":r1:"]').contains("Login")
    cy.screenshot("logout")
  })
})