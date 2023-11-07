const crypto = require('crypto');
const base64url = require('base64url');

const TOKEN_COOKIE_NAME = "Homework5";
// In a real application, you will never hard-code this secret and you will
// definitely never commit it to version control, ever

exports.TokenMiddleware = (req, res, next) => {
  // We will look for the token in two places:
  // 1. A cookie in case of a browser
  // 2. The Authorization header in case of a different client
  let token = null;
  if(!req.cookies[TOKEN_COOKIE_NAME]) {
    //No cookie, so let's check Authorization header
    const authHeader = req.get('Authorization');
    if(authHeader && authHeader.startsWith("Bearer ")) {
      //Format should be "Bearer token" but we only need the token
      token = authHeader.split(" ")[1];
    }
  }
  else { //We do have a cookie with a token
    token = req.cookies[TOKEN_COOKIE_NAME]; //Get session Id from cookie
  }

  if(!token) { // If we don't have a token
    res.status(401).json({error: 'Not authenticated'});
    return;
  }

  //If we've made it this far, we have a token. We need to validate it

  try {
    const hmac = crypto.createHmac('sha256', process.env.API_SECRET);
    let idx = token.indexOf(".");
    let header = token.slice(0, idx);
    let idx_2 = token.indexOf(".", idx + 1 );
    let payload = token.slice(idx + 1, idx_2);
    let signature = token.slice(idx_2 + 1);
    let hJson = JSON.parse(base64url.decode(header));
    let pJson = JSON.parse(base64url.decode(payload));
    let header_encoded = base64url.encode(JSON.stringify(hJson));
    let payload_encoded = base64url.encode(JSON.stringify(pJson));


    // first check if the computed signature between the header and payload corresponds to the signature we have
    let signature_verify = hmac.update(header_encoded + "." + payload_encoded).digest('base64url');

    if(signature_verify == signature) {
      console.log("Signature Verified!");
      // we have passed step one our current signature matches the signature calculated
      // using the header and payload, now check that the passed payload is not expired
      let exp_date = new Date(pJson.exp * 1000);

      // get current time
      let current_date = new Date();

      console.log("Current date hours: " + current_date.getHours());
      console.log("Expiration date hours: " + exp_date.getHours());
      
      // check hours first if our current hour is greater than the exp date we know it is expired
      if(current_date.getHours() > exp_date.getHours() && exp_date.getHours() != 0) {
        if(current_date.getHours() != 23 && exp_date.getHours() != 0) {
          // catch boundary values
          res.status(401).json({error: 'Not authenticated'});
          return;
        }
      }


      // if we have the same hour check the minutes to verify if we have hit the exp date
      if(current_date.getHours() == exp_date.getHours()) {
        console.log("Failing in second check!");
        if(current_date.getMinutes() > exp_date.getMinutes()) {
          res.status(401).json({error: 'Not authenticated'});
          return;
        }
      }

      console.log("We passed!");
    }

    else {
      res.status(401).json({error: 'Not authenticated'});
      return;
    }

    // if we got here our user is valid
    req.user = pJson.user;
    next(); //Make sure we call the next middleware
  }
  catch(err) { //Token is invalid
    res.status(401).json({error: 'Not authenticated'});
    return;
  }


}


exports.generateToken = (req, res, user) => {
  let data = {
    user: user,
    // Use the exp registered claim to expire token in 1 hour
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  };

  const hmac = crypto.createHmac('sha256', process.env.API_SECRET);

  const header =  {
    "alg": "HS256",
    "typ": "JWT"
  };

  const header_encoded = base64url.encode(
    JSON.stringify(header)
  );

  const payload_encoded = base64url.encode(JSON.stringify(data));
  
  const signature = hmac.update(header_encoded + "." + payload_encoded).digest('base64url');

  const token = header_encoded + "." + payload_encoded + "." + signature;

  //send token in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 1000 //This session expires in 2 minutes.. but token expires in 1 hour!
  });
};


exports.removeToken = (req, res) => {
  //send session ID in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000 //A date in the past
  });
}