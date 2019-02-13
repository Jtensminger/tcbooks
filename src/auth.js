import auth0 from 'auth0-js';

export default class Auth {
  //New
  accessToken;
  idToken;
  expiresAt;
  tokenRenewalTimeout;
  userProfile;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: process.env.REACT_APP_Auth_Domain,
      audience: `https://${process.env.REACT_APP_Auth_Domain}/userinfo`,
      clientID: process.env.REACT_APP_Auth_ClientId,
      redirectUri: process.env.REACT_APP_Auth_Callback,
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    // New
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);

    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    //New
    this.getAccessToken = this.getAccessToken.bind(this);
    this.isAllowed = this.isAllowed.bind(this);
    this.hasRole = this.hasRole.bind(this);
    this.hasGroup = this.hasGroup.bind(this);
    this.scheduleRenewal()

    this.setSession = this.setSession.bind(this);
  }

  getProfile(cb) {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        profile.roles = this.profile[process.env.REACT_APP_Auth_Role_URL]
        profile.permissions = this.profile[process.env.REACT_APP_Auth_Permission_URL]
        profile.groups = this.profile[process.env.REACT_APP_Auth_Group_URL]
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        console.log(authResult);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve(authResult);
      });
    })
  }

// New
  scheduleRenewal() {
    let expiresAt = this.expiresAt;
    const timeout = expiresAt - Date.now();
    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  }

  getExpiryDate() {
    return JSON.stringify(new Date(this.expiresAt));
  }

  renewSession() {
    return new Promise((resolve, reject) => {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
         return resolve()
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  })
}
  //New
  getAccessToken() {
      return this.accessToken;
  }

    // New
  getIdToken() {
      return this.idToken;
  }

  isAuthenticated() {
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }


  isAllowed(permissions) {
    if(permissions === null || permissions === undefined) return true
    return this.profile && permissions.some(permission => Object.values(this.profile.permission).includes(permission))
  }

  hasRole(roles) {
    if(roles === null || roles === undefined) return true
    return this.profile && roles.some(role => Object.values(this.profile.roles).includes(roles))
  }

  hasGroup(groups) {
    if(groups === null || groups === undefined) return true
    return this.profile && groups.some(group => Object.values(this.profile.groups).includes(group))
  }

  login() {
    return new Promise((resolve, reject) => {
      this.auth0.authorize();
      resolve();
    })
  }

  logout() {
    // clear id token and expiration

    //new
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this.userProfile = null;
    //new
    localStorage.removeItem('isLoggedIn');
    clearTimeout(this.tokenRenewalTimeout);
  }

  setSession(authResult) {
    localStorage.setItem('isLoggedIn', 'true');
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.profile.roles = this.profile[process.env.REACT_APP_Auth_Role_URL]
    this.profile.permissions = this.profile[process.env.REACT_APP_Auth_Permission_URL]
    this.profile.groups = this.profile[process.env.REACT_APP_Auth_Group_URL]
    // new
    this.accessToken = authResult.accessToken;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.scheduleRenewal();
  }
}
