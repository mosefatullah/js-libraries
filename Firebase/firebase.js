/**
 * Firebase.js (v0.1.0)
 * @Created by Mohammad Sefatullah
 * @License: MIT
 */

"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
 getAuth,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 signInWithPopup,
 signInWithRedirect,
 GoogleAuthProvider,
 onAuthStateChanged,
 signOut,
 verifyPasswordResetCode,
 confirmPasswordReset,
 checkActionCode,
 applyActionCode,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import * as $fdb from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import * as $fst from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

let $firebase_config = null;
let $firebase_app = null;
let $firebase_auth = null;
let $firebase_databse = null;
let $firebase_storage = null;

const $handling = (r, e) => {
 try {
  if (!r || typeof r !== "function")
   throw new Error(
    "Firebase: First parameter is missing! (for result function)"
   );
  else r();
 } catch (er) {
  if (!e || typeof e !== "function")
   throw new Error(
    "Firebase: Second parameter is missing! (for error function)"
   );
  else e(er);
 }
};

const $firebase = {
 init: (config) => {
  if (!config) throw new Error("Firebase: Config is missing!");
  else {
   $firebase_config = config;
   $firebase_app = initializeApp(config);
   $firebase_auth = getAuth($firebase_app);
   $firebase_databse = $fdb.getDatabase($firebase_app);
   $firebase_storage = $fst.getStorage($firebase_app);
  }
 },
 /****** Authentication ******/
 /***/
 /***/
 /***/
 auth: {
  user: $firebase_auth?.currentUser || null,
  on: (result, error) => {
   try {
    onAuthStateChanged($firebase_auth, (user) => {
     result(user);
    });
   } catch (e) {
    if (error) error(e);
   }
  },
  signUpWithEmail: (email, password, result, error, conditional) => {
   $handling(
    () => {
     const $fn = function () {
      createUserWithEmailAndPassword($firebase_auth, email, password)
       .then(() => {
        result($firebase_auth.currentUser);
       })
       .catch((e) => {
        if (error) error(e);
       });
     };
     if (conditional) $fn();
     else conditional($fn);
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
  signInWithEmail: (email, password, result, error) => {
   $handling(
    () => {
     signInWithEmailAndPassword($firebase_auth, email, password)
      .then(() => {
       result($firebase_auth.currentUser);
      })
      .catch((e) => {
       if (error) error(e);
      });
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
  signInWithGoogle: (result, error) => {
   $handling( () => {
     const provider = new GoogleAuthProvider();
     provider.setCustomParameters({ prompt: "select_account" });
     signInWithPopup($firebase_auth, provider)
      .then((r) => {
       result(r);
      })
      .catch((e) => {
       if (e.code == "auth/popup-blocked") {
        signInWithRedirect($firebase_auth, provider)
         .then(() => {
          result(r);
         })
         .catch((e) => {
          if (error) error(e);
         });
       } else if (error) error(e);
      });
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
  logout: (result, error) => {
   $handling(
    async () => {
     const r = await signOut($firebase_auth);
     result(r);
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
  action: (mode, { code, lang = "en", newPassword }, result, error) => {
   $handling(
    () => {
     switch (mode) {
      case "resetPassword":
       handleResetPassword($firebase_auth, code, lang);
       break;
      case "recoverEmail":
       handleRecoverEmail($firebase_auth, code, lang);
       break;
      case "verifyEmail":
       handleVerifyEmail($firebase_auth, code, lang);
       break;
      default:
       if (error) error("Firebase: Invalid mode for Handling Email!");
     }
     function handleResetPassword(auth, actionCode, lang) {
      verifyPasswordResetCode(auth, actionCode)
       .then((email) => {
        confirmPasswordReset(auth, actionCode, newPassword)
         .then((resp) => {
          result(resp, email);
         })
         .catch((e) => {
          if (error) error(e);
         });
       })
       .catch((e) => {
        if (error) error(e);
       });
     }
     function handleRecoverEmail(auth, actionCode, lang) {
      let restoredEmail = null;
      checkActionCode(auth, actionCode)
       .then((info) => {
        restoredEmail = info["data"]["email"];
        return applyActionCode(auth, actionCode);
       })
       .then(() => {
        result(restoredEmail);
       })
       .catch((e) => {
        if (error) error(e);
       });
     }
     function handleVerifyEmail(auth, actionCode, lang) {
      applyActionCode(auth, actionCode)
       .then((resp) => {
        result(resp);
       })
       .catch((e) => {
        if (error) error(e);
       });
     }
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
 },
 /****** Database ******/
 /***/
 /***/
 /***/
 database: {
  read: (path, result, error) => {
   $handling(
    () => {
     $fdb.onValue(
      $fdb.ref($firebase_databse, path),
      (snapshot) => {
       result(snapshot.val());
      },
      {
       onlyOnce: true,
      }
     );
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
  write: (path, data, result, error) => {
   /* Note: (Overwrites) */
   $handling(
    () => {
     $fdb
      .set($fdb.ref($firebase_databse, path), data)
      .then((s) => {
       result(true, s);
      })
      .catch((e) => {
       if (error) error(e);
      });
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
  update: (path, data, result, error) => {
   /* Note: (Doesn't Overwrite) */
   $handling(
    () => {
     $fdb
      .update($fdb.ref($firebase_databse, path), data, { merge: true })
      .then((s) => {
       result(true, s);
      })
      .catch((e) => {
       if (error) error(e);
      });
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
  delete: (path, result, error) => {
   $handling(
    () => {
     $fdb
      .remove($fdb.ref($firebase_databse, path))
      .then((s) => {
       result(true, s);
      })
      .catch((e) => {
       if (error) error(e);
      });
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
  getKey: (path, error) => {
   let r = null;
   $handling(
    () => {
     r = $fdb.push($fdb.ref($firebase_databse, path)).key.substring(1);
    },
    (e) => {
     if (error) error(e);
    }
   );
   return r;
  },
 },
 /****** Storage ******/
 /***/
 /***/
 /***/
 storage: {
  upload: (path /* Single */, data, then) => {
   let metadata = {};
   if (!data.file) data.file = data;
   else if (data.file && data.metadata) metadata = data.metadata;
   $handling(
    () => {
     then(
      $fst.uploadBytes($fst.ref($firebase_storage, path), data.file, metadata)
     );
    },
    (e) => {
     throw new Error(e);
    }
   );
  },
  download: (path /* Single */, result, error) => {
   $handling(
    () => {
     $fst
      .getDownloadURL($fst.ref($firebase_storage, path))
      .then((s) => {
       result(s);
      })
      .catch((e) => {
       if (error) error(e);
      });
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
  downloads: (path /* Multiple */, result, error) => {
   $handling(
    () => {
     $fst
      .listAll($fst.ref($firebase_storage, path))
      .then((s) => {
       result(s);
      })
      .catch((e) => {
       if (error) error(e);
      });
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
  delete: (path /* Single */, result, error) => {
   $handling(
    () => {
     $fst
      .deleteObject($fst.ref($firebase_storage, path))
      .then((s) => {
       result(s);
      })
      .catch((e) => {
       if (error) error(e);
      });
    },
    (e) => {
     if (error) error(e);
    }
   );
  },
 },
};
export default $firebase;
