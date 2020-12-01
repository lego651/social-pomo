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
    "data": {
        "pomos": [
            {
                "handle": "A7",
                "project": "L4",
                "tag": [],
                "createdAt": "2020-12-01T04:11:14.131Z",
                "dateSeq": 20201201,
                "avatar": "https://firebasestorage.googleapis.com/v0/b/pomopal-dev.appspot.com/o/defaultAvatar.jpg?alt=media",
                "nickName": "A7",
                "type": -1,
                "time": 10,
                "public": true
            },
            {
                "handle": "A7",
                "project": "L5",
                "tag": [],
                "createdAt": "2020-12-01T04:11:36.955Z",
                "dateSeq": 20201201,
                "avatar": "https://firebasestorage.googleapis.com/v0/b/pomopal-dev.appspot.com/o/defaultAvatar.jpg?alt=media",
                "nickName": "A7",
                "type": -1,
                "time": 13,
                "public": true
            },
            {
                "handle": "A7",
                "project": "Youtuber",
                "tag": [],
                "createdAt": "2020-12-01T04:10:48.866Z",
                "dateSeq": 20201201,
                "avatar": "https://firebasestorage.googleapis.com/v0/b/pomopal-dev.appspot.com/o/defaultAvatar.jpg?alt=media",
                "nickName": "A7",
                "type": -1,
                "time": 3,
                "public": true
            }
        ],
        "time": 26
    }
}
```

#### Error example:
// TODO

