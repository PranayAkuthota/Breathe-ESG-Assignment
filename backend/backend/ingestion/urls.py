from django.urls import path
from .views import (
    UploadView,
    ApproveView
)
from .views import UploadView
from .views import (
    UploadView,
    ApproveView,
    DashboardView
)
from .views import RecordsView
urlpatterns=[

path(
"upload/",
UploadView.as_view()
),

path(
"approve/<int:id>/",
ApproveView.as_view()
),

path(
"stats/",
DashboardView.as_view()
),

path(
"records/",
RecordsView.as_view()
)

]