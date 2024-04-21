# Project IOT
### Table of contents

1. [Clone](#clone)
2. [Backend](#backend)
    - [Installation](#installation)
    - [Config](#config)
    - [Running](#running)
3. [Frontend](#frontend)
    - [Installation](#installation-1)
    - [Running](#running-1)
4. [Hardware](#hardware)
5. [API DOCS](#api-docs)
### Clone

```bash
$ git clone https://github.com/hhd182/LTUD_IOT.git
```

### Backend

---
### Installation
```bash
$ cd back-end
$ npm i
```
---
### Config
Create file `.env` from `.env.example`
```
DB_USERNAME = 'your username'
DB_PASSWORD = 'your password'
DB_HOST = 'your host'
DB_PORT = 'your port'
DB_NAME = 'your database'

MQTT_USERNAME = 'your broker username'
MQTT_PASSWORD = 'your broker password'
MQTT_PORT = 'your port broker connect'
```

---
### Running
```bash
$ npm start
```
Terminal
![image](https://github.com/hhd182/LTUD_IOT/assets/82596802/6a6e53ad-983e-49cb-b594-cac56e31eeeb)

---
### Frontend

---
### Installation
```bash
$ cd front-end
$ npm i
```

---
### Running
```bash
$ npm run dev
```
Dashboard
![image](https://github.com/hhd182/LTUD_IOT/assets/82596802/335e4849-5497-4243-825b-7650094129e0)
Data sensor
![image](https://github.com/hhd182/LTUD_IOT/assets/82596802/288f2333-9947-409e-85c7-074b435e1bf2)
Action history

### API DOCS
```
http://${your host}:${your port}/api-docs
```
