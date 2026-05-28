import requests

url=url="https://breathe-esg-assignment-hhce.onrender.com/api/approve/1/"


r=requests.post(
    url
)

print(
    r.status_code
)

print(
    r.text
)