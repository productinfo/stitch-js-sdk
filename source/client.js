import cookie from 'cookie_js'

const USER_AUTH_KEY = "_baas_ua";

export class BaasClient {
  constructor(appUrl) {
    this.appUrl = appUrl; // serverUrl 
    //this.mongoSvcUrl = `${this.appUrl}/svc/mdb1`
    this.authUrl = `${this.appUrl}/auth`
    this.checkRedirectResponse();
  }

  authWithOAuth(providerName){
    window.location.replace(`${this.authUrl}/oauth2/${providerName}?redirect=${encodeURI(this.baseUrl())}`);
  }

  linkWithOAuth(providerName){
    if (this.auth() === null) {
      throw "Must auth before execute"
    }
    window.location.replace(`${this.authUrl}/oauth2/${providerName}?redirect=${encodeURI(this.baseUrl())}&link=${this.auth()['token']}`);
  }

  logout() {
    $.ajax({
      type: 'DELETE',
      url: this.authUrl + "/logout",
      headers: {
        'Authorization': `Bearer ${this.auth()['token']}`
      }
    }).done((data) => {
      localStorage.removeItem(USER_AUTH_KEY);
      location.reload();
    }).fail((data) => {
      // This is probably the wrong thing to do since it could have
      // failed for other reasons.
      localStorage.removeItem(USER_AUTH_KEY);
      location.reload();
    });
  }

  auth(){
    if (localStorage.getItem(USER_AUTH_KEY) === null) {
      return null;
    }
    return JSON.parse(atob(localStorage.getItem(USER_AUTH_KEY)));
  }

  authedId(){
    var a = this.auth();
    if (a == null) {
      return null;
    }
    return a['user']['_id'];
  }
  
  baseUrl(){
    return [location.protocol, '//', location.host, location.pathname].join('');
  }


  checkRedirectResponse(){
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    var found = false;
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == "_baas_error") {
          this.lastError = decodeURIComponent(pair[1])
          window.history.replaceState(null, "", this.baseUrl());
          console.log(`BaasClient: error from '${this.appUrl}': ${this.lastError}`);
          found = true;
          break;
        }
        if (decodeURIComponent(pair[0]) == "_baas_ua") {
          localStorage.setItem(USER_AUTH_KEY, decodeURIComponent(pair[1]));
          found = true;
          break;
        }
        if (decodeURIComponent(pair[0]) == "_baas_link") {
          found = true;
          break;
        }
    }
    if (found) {
      window.history.replaceState(null, "", this.baseUrl());
    }
  }

  executeAction(service, action, args, callback){
    if (this.auth() === null) {
      throw "Must auth before execute"
    }
    let payload = { action: action, arguments:args }

    $.ajax({
      type: 'POST',
      contentType: "application/json",
      url: `${this.appUrl}/svc/${service}`,
      data: JSON.stringify(payload),
      dataType: 'json',
      headers: {
        'Authorization': `Bearer ${this.auth()['token']}`
      }
    }).done((data) => callback(data))
  }


}

export class MongoClient {

  constructor(baasClient, svcName) {
    this.baasClient = baasClient;
    this.svcName = svcName;
  }

  find(db, collection, query, project, callback){
    let args = {
      "database": db,
      "collection": collection,
      "query": query,
      "project": project,
    }
    this.baasClient.executeAction(this.svcName, "find", args, callback)
  }

  // delete is a keyword in js, so this is called "remove" instead.
  remove(db, collection, query, singleDoc, callback){
    let args = {
      "database": db,
      "collection": collection,
      "query": query,
    }
    if(singleDoc){
      args["singleDoc"] = true;
    }
    this.baasClient.executeAction(this.svcName, "delete", args, callback)
  }

  insert(db, collection, documents, callback){
    let args = {
      "database": db,
      "collection": collection,
      "documents": documents,
    }
    this.baasClient.executeAction(this.svcName, "insert", args, callback)
  }

  update(db, collection, query, update, upsert, multi, callback){
    let args = {
      "database": db,
      "collection": collection,
      "query" : query,
      "update" : update,
      "upsert" : upsert,
      "multi" : multi,
    }
    this.baasClient.executeAction(this.svcName, "update", args, callback)
  }
  
}

