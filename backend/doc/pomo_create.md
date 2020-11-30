### `POST /pomo`

### Params:

* `handle`: example `deva7@gmail.com`
* `content`: example `finished recording video`
* `project`: example `other`
* `tag`: example `learn`
* `createdAt`: `Date Object`
* `dateSeq`: example `20201129`
* `avatar`: example `user.avatar`
* `nickName`: example `user.nickName`
* `type`: example `-1`
* `time`: example `60` 1min
* `public`: example `true`

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
        "message": "pomo 123 created succesfully"
    }
}
```

#### Error example:
// TODO

