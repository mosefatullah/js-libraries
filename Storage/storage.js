/*
 * Made by: Mohammad Sefatullah
 * Version: 1.0.0
*/

class Storage {
 constructor(key, type) {
  this.key = key;
  this.type = type;
  //useCase: temporary data, like a shopping cart
  //expire: when the browser is closed
  if (type === "session" || type === "s")
   (this.storage = sessionStorage), (this.type = "session");
  //useCase: user preferences, like a language
  //expire: until the user clears the cache
  else if (type === "cookie" || type === "c")
   (this.storage = document.cookie), (this.type = "cookie");
  //useCase: user data, like a profile
  //expire: until the user clears the cache
  else if (
   type === "indexedDB" ||
   type === "d" ||
   type === "i" ||
   type === "db" ||
   type === "database"
  )
   (this.storage = indexedDB), (this.type = "indexedDB");
  //useCase: user settings, like a theme
  //expire: never
  else (this.storage = localStorage), (this.type = "local");
 }

 set(val, expire = 365) {
  if (this.type === "cookie") {
   //cookie - expires in 1 year
   let expires = "session";
   if (expire !== "session") {
    if (expire === "") expire = 365;
    expire = this.formatFromString(expire) * 24 * 60 * 60 * 1000;
    let date = new Date();
    date.setTime(date.getTime() + expire);
    expires = "; expires=" + date.toUTCString();
   }
   val = this.formatToString(val);
   document.cookie = this.key + "=" + (val || "") + expires + "; path=/";
   return;
  } else if (this.type === "indexedDB") {
   //indexedDB
   if (!("indexedDB" in window)) {
    console.log("Error: This browser doesn't support IndexedDB.");
    return;
   }
   let request = this.storage.open(this.key, 1);
   request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.onerror = (event) => {
     console.log("Error: ", event.target.error);
    };
    if (val.table && typeof val.table === "string") {
     let objectStore = db.createObjectStore(
      val.table,
      typeof val.primary === "string"
       ? { keyPath: val.primary, autoIncrement: true }
       : { autoIncrement: true }
     );
     if (val.index && typeof val.index === "array") {
      for (let i = 0; i < val.index.length; i++) {
       if (
        typeof val.index[i][0] === "string" &&
        typeof val.index[i][1] === "boolean"
       ) {
        objectStore.createIndex(val.index[i][0], val.index[i][0], {
         unique: val.index[i][1],
        });
       }
      }
     } else if (val.index && typeof val.index === "object") {
      if (
       typeof val.index[0] === "string" &&
       typeof val.index[1] === "boolean"
      ) {
       objectStore.createIndex(val.index[0], val.index[0], {
        unique: val.index[1],
       });
      }
     } else if (val.index && typeof val.index === "string") {
      objectStore.createIndex(val.index, val.index, { unique: true });
     }
    }
   }.bind(this);
   request.onsuccess = function (event) {
    let db = event.target.result;
    if (val.table && typeof val.table === "string" && val.value) {
     let transaction = db.transaction(val.table, "readwrite");
     let objectStore = transaction.objectStore(val.table);
     objectStore.add(val.value).addEventListener("success", () => {
      console.log("Data added to the database successfully");
     });
     transaction.addEventListener("complete", () => {
      console.log("Transaction completed: database modification finished.");
     });
     transaction.addEventListener("error", () =>
      console.log("Transaction not opened due to error")
     );
     db.close();
    }
   }.bind(this);
   request.onerror = function (event) {
    console.log("Error: ", event.target.error);
   };
  } else {
   // other storage types
   val = this.formatToString(val);
   this.storage.setItem(this.key, val);
  }
 }
 get() {
  if (this.type === "cookie") {
   //cookie
   let name = this.key + "=";
   let decodedCookie = decodeURIComponent(document.cookie);
   let ca = decodedCookie.split(";");
   for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
     c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
     let val = c.substring(name.length, c.length);
     val = this.formatFromString(val);
     return val;
    }
   }
   return "";
  } else if (this.type === "indexedDB") {
   //indexedDB get data
   let request = this.storage.open(this.key, 1);
   request.onsuccess = function (event) {
    let db = event.target.result;
    let transaction = db.transaction(this.key, "readwrite");
    let objectStore = transaction.objectStore(this.key);
    let request = objectStore.get(1);
    request.onsuccess = function (event) {
     let val = event.target.result;
     val = this.formatFromString(val);
     return val;
    };
   };
   request.onerror = function (event) {
    console.error("error: ", event.target.error);
   };
  } else {
   // other storage types
   let val = this.storage.getItem(this.key);
   if (val === null) return "";
   val = this.formatFromString(val);
   return val;
  }
 }
 remove() {
  this.storage.removeItem(this.key);
 }
}

Storage.prototype.formatFromString = function (val) {
 if (
  typeof val === "object" ||
  typeof val === "number" ||
  typeof val === "boolean" ||
  typeof val === "array"
 ) {
  return val;
 } else if (typeof val === "string") {
  if (val === "undefined") return undefined;
  if (val === "null") return null;
  if (val === "true") return true;
  else if (val === "false") return false;
  try {
   val = JSON.parse(val);
  } catch (e) {
   try {
    let k = parseFloat(val);
    if (isNaN(k) === false) val = k;
   } catch (e) {}
  }
  return val;
 } else if (typeof val === "undefined") return undefined;
 else if (typeof val === "function") return val;
 else return "";
};

Storage.prototype.formatToString = function (val) {
 if (typeof val === "object") {
  if (val === null) val = "null";
  else val = JSON.stringify(val);
 } else if (typeof val === "string" || typeof val === "number") {
  val = val.toString();
  if (val === "undefined") val = undefined;
  if (val === "null") val = null;
 } else if (typeof val === "boolean") val = val.toString();
 else if (typeof val === "function") {
  let line = "",
   lines = val.toString().split("\n");
  for (let i = 0; i < lines.length; i++) {
   if (lines[i].startsWith(" ")) {
    line += " " + lines[i].trim();
   } else {
    line += "," + lines[i].trim();
   }
  }
  val = line.substring(1).trim();
 } else if (typeof val === "array") val = val.toString();
 else if (typeof val === "undefined") val = "undefined";
 else return "";
 return val;
};

const storage = (x, y) => {
 return new Storage(x, y);
};

export default storage;
