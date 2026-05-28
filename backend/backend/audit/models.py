from django.db import models

from ingestion.models import (
    EmissionRecord
)


class Log(models.Model):

    record=models.ForeignKey(

        EmissionRecord,

        on_delete=models.CASCADE
    )

    action=models.CharField(
        max_length=100
    )

    old_status=models.CharField(
        max_length=50,
        null=True
    )

    new_status=models.CharField(
        max_length=50
    )

    created_at=models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):

        return self.action