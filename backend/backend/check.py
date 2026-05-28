import requests

url="http://127.0.0.1:8000/api/approve/1/"


r=requests.post(
    url
)

print(
    r.status_code
)

print(
    r.text
)