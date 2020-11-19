### `POST /signup`

### Params:

* `email`: example `deva1@gmail.com`
* `password`: at least 6 figures 
* `confirmPassword`: at least 6 figures, Must match with `password`
* `handle`: user unique DB handle, CANT be duplicated 

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
    "message": "user registed successfully",
    "status_code": 201,
    "data": {
        "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlNTQyN2NkMzUxMDhiNDc2NjUyMDhlYTA0YjhjYTZjODZkMDljOTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcG9tb3BhbC1kZXYiLCJhdWQiOiJwb21vcGFsLWRldiIsImF1dGhfdGltZSI6MTYwNTc2MDE4NiwidXNlcl9pZCI6IjZMNzR5d3ZaZWhTc0V4Wmo0cVAxdk81djgycjIiLCJzdWIiOiI2TDc0eXd2WmVoU3NFeFpqNHFQMXZPNXY4MnIyIiwiaWF0IjoxNjA1NzYwMTg2LCJleHAiOjE2MDU3NjM3ODYsImVtYWlsIjoiZGV2YjQyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkZXZiNDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.S7d5f65Cn_ynOIcQLM7ReVAYwh0Sl9vMgE5I2qHRICLmniv_asaaz0vuZ4APlt1rmRqtdiv-WM60ylnrdoqFyddLx0HN374aBuLHadX6OxI5_3Xe7oTXcNg43GG38BL1LVc_o30rPj-a8IqVSBIFCK7WBty0Jjvi9MQIlW5Q5anMTNsuOtX9ttLwqii1UQ7VjlCxeZaSamJnOMN_UDQsaD8igI0gTmsNYeWraNcQM4oYTofWJRvX-7yuDhRru2SwnSTkPmCjTxWmg_aNgOAxddi3-tLS3oFz6gnQxzSlSypATSJtbSyUh2AoDCCRvrXn9POl6wlozQGZ0Xg3cEFY7Q",
        "cookie": "eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9wb21vcGFsLWRldiIsImF1ZCI6InBvbW9wYWwtZGV2IiwiYXV0aF90aW1lIjoxNjA1NzYwMTg2LCJ1c2VyX2lkIjoiNkw3NHl3dlplaFNzRXhaajRxUDF2TzV2ODJyMiIsInN1YiI6IjZMNzR5d3ZaZWhTc0V4Wmo0cVAxdk81djgycjIiLCJpYXQiOjE2MDU3NjAxODcsImV4cCI6MTYwNTg0NjU4NywiZW1haWwiOiJkZXZiNDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRldmI0MkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.O6iV3ujnIG7D2V-lWmFCaCPhZABKRT6XdG3ywVTg2E6nD0INIF5aU1mKxdeIfErw5ZaIWLI3iYP5DXckh4uCMGOdKEzlUrufQwNp-02lOYQWjS6uAHccCTiiOsVre4qNddaKM6E_PHY8nT-nq6YQyv6ZfY5Nouf_YCVzqWKBmgLZEphSzUxyUhOadHApIxgeb1b4ZSOs-N-fYufsLslLSo2SxEG8hPbLyRuLSpPVBePm26Fpuoh7MprD_XMprRY1fYNhQIrOfQa2g4laTXPp8CnU6hN3DBvbZEP-L38oBeScacqFGJVnCp9J30aS-weuxIsY33MLaS6zao8FpJ2StQ"
    }
}
```

#### Error example:
```
{
    "success": false,
    "message": "invalid request",
    "error_code": 400,
    "data": {
        "general": "Something went wrong, please try again"
    }
}
```

