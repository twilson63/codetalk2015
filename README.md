# CodeTalk 2015

---

### About Me

* Tom Wilson
* Lead Technologist at Jack Russell Software
* @twilson63
* github.com/twilson63

---

# Offline Web

---

### Why?

* Mobile
* Latency
* Deadzones

---

### Offline Web

* AppCache
* Service Workers
* LocalStorage
* WebSQL
* IndexDB

---

# PouchDB

---

PouchDB is an open-source JavaScript database

---

### About PouchDB

* Cross Browser
* Lightweight (46KB)
* Easy to Learn
* Open Source

---

```
var db = new PouchDB('dbname');

db.put({
  _id: 'dave@gmail.com',
  name: 'David',
  age: 68
});

db.changes().on('change', function() {
  console.log('Ch-Ch-Changes');
});

db.replicate.to('http://example.com/mydb');
```

---

# Lets create an offline app

---

``` js
npm i
npm run dev
```

---



