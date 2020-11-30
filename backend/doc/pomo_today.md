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
    "message": "user logged in successfully",
    "status_code": 200,
    "data": {
        "pomos": [
          {
            "handle": "A7",
            "project": "Other",
            "tag": [],
            "createdAt": "2020-11-29T22:45:51.357Z",
            "dateSeq": 20201129,
            "avatar": "https://firebasestorage.googleapis.com/v0/b/pomopal-dev.appspot.com/o/defaultAvatar.jpg?alt=media",
            "nickName": "A7",
            "type": -1,
            "time": 2,
            "public": true
          }
      ]
    }
}
```

#### Error example:
// TODO

