### `GET /pomo/today`

### Headers:
* `Authorization`: example `${cookie} Bearer ${token}`

### Params:

* N/A

### Return:

#### Response schema:
```
{ 
  success: boolean,
  message: string,
  status_code: number,
  data: {}
}
```

#### Success example:
```
{
    "success": true,
    "message": "successful",
    "status_code": 200,
    "data": [
        {
            "handle": "A7",
            "project": "Youtuber",
            "tag": [],
            "createdAt": "2020-11-30T06:03:24.752Z",
            "dateSeq": 20201130,
            "avatar": "https://firebasestorage.googleapis.com/v0/b/pomopal-dev.appspot.com/o/defaultAvatar.jpg?alt=media",
            "nickName": "A7",
            "type": -1,
            "time": 3785,
            "public": true
        },
        {
            "handle": "A7",
            "project": "Youtuber",
            "tag": [],
            "createdAt": "2020-11-30T02:24:48.139Z",
            "dateSeq": 20201130,
            "avatar": "https://firebasestorage.googleapis.com/v0/b/pomopal-dev.appspot.com/o/defaultAvatar.jpg?alt=media",
            "nickName": "A7",
            "type": -1,
            "time": 1775,
            "public": true
        },
        {
            "handle": "A7",
            "project": "Youtuber",
            "tag": [],
            "createdAt": "2020-11-30T01:54:59.465Z",
            "dateSeq": 20201130,
            "avatar": "https://firebasestorage.googleapis.com/v0/b/pomopal-dev.appspot.com/o/defaultAvatar.jpg?alt=media",
            "nickName": "A7",
            "type": -1,
            "time": 1500,
            "public": true
        }
    ]
}
```

#### Error example:
// TODO

