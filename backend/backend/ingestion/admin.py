from django.contrib import admin

from .models import (
    Company,
    DataSource,
    EmissionRecord
)


@admin.register(EmissionRecord)
class RecordAdmin(
    admin.ModelAdmin
):

    list_display=(

        "id",

        "status",

        "suspicious",

        "created_at"

    )



admin.site.register(
    Company
)

admin.site.register(
    DataSource
)