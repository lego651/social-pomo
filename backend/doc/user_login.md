### `POST /login`

### Params:

* `email`: example `deva7@gmail.com`
* `password`: example `123123`

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
    "status_code": 201,
    "data": {
        "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlNTQyN2NkMzUxMDhiNDc2NjUyMDhlYTA0YjhjYTZjODZkMDljOTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcG9tb3BhbC1kZXYiLCJhdWQiOiJwb21vcGFsLWRldiIsImF1dGhfdGltZSI6MTYwNjIwODY3MSwidXNlcl9pZCI6Ijh2aUFVaHBRbXRRTHNtdmczYVpHTzZUalcwQzIiLCJzdWIiOiI4dmlBVWhwUW10UUxzbXZnM2FaR082VGpXMEMyIiwiaWF0IjoxNjA2MjA4NjcxLCJleHAiOjE2MDYyMTIyNzEsImVtYWlsIjoiZGV2YTdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRldmE3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.aMC1kNYWbjggA01KSYrhWpS-mXnozTUVbZ5iPZXRHS4tkBzpzL-7g-NE0Y2bVOmmTVd2OEIwonUcYOW8-wYmSvgUU3Wc4dvnfgIrGbFjuir57EoluFnqT02vX-4Bl8k6_tEtLW1zSQXUz0eNxK_53lC8NhrBM4mBRpv5w5fseOxGNumbqSCdCFSh8K3V1zlz_omP_bmvqRTeh9vfxW1yzqf4LghzPyMxeThbWLDTXFzB3OtKwV2vanRzMRFFeuclZtcGSdCqfbxF1NSobXfUIhgC2pI7ZTT0WQkUJAuRSHIbJnIuVru2BIcBTmJ40vGrf4oe1SlYUT2KvajJudaP1Q",
        "cookie": "eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9wb21vcGFsLWRldiIsImF1ZCI6InBvbW9wYWwtZGV2IiwiYXV0aF90aW1lIjoxNjA2MjA4NjcxLCJ1c2VyX2lkIjoiOHZpQVVocFFtdFFMc212ZzNhWkdPNlRqVzBDMiIsInN1YiI6Ijh2aUFVaHBRbXRRTHNtdmczYVpHTzZUalcwQzIiLCJpYXQiOjE2MDYyMDg2NzIsImV4cCI6MTYwNjI5NTA3MiwiZW1haWwiOiJkZXZhN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZGV2YTdAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.jCex0l6KQ-tjylhxzE1R4c9hlSziwni5omlrc3Jrp0PUegKz6L9aO_w_rMZzPRqPup4wnFfjk9UlypOoo2xN-kbDBrzihGH28pBjpAPUPTAMw9W6W902hx46hD2GKm-DSzMSaZ4Ls8RgBAxM0oWz3Ise-Q84wte1TBqFTY5B4-S6zWKMXhVtIfUwyUTSpoCcwT5UIjuLx8CEZDniwjFr_j2n6ijPkrR1tGxQH0X-B-1URmu0id_OVW8LAgPE39-ojaLMDXTHjFQyGuLG2yGonPUPr58VbRdWXfHLGanaJWhcQ-XHVqS0hdMnmubzGU_3HDkCMem48AWKKyQFPfi6mA"
    }
}
```

#### Error example:
```
{
    "success": false,
    "message": "The password is invalid or the user does not have a password.",
    "status_code": 403,
    "data": {
        "password": "Email or password is incorrect, please try again"
    }
}
```

