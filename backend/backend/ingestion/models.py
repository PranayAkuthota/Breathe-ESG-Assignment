from django.db import models


class Company(models.Model):

    name = models.CharField(
        max_length=100
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.name


class DataSource(models.Model):

    SOURCE_CHOICES = [

        ("SAP", "SAP"),

        ("UTILITY", "UTILITY"),

        ("TRAVEL", "TRAVEL")

    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=20,
        choices=SOURCE_CHOICES
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"{self.company.name}-{self.source_type}"


class EmissionRecord(models.Model):


    STATUS_CHOICES = [

        ("PENDING", "PENDING"),

        ("FLAGGED", "FLAGGED"),

        ("APPROVED", "APPROVED"),

        ("LOCKED", "LOCKED")

    ]

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    category=models.CharField(

    max_length=50,

    default="Fuel"
)
    raw_data = models.JSONField()

    normalized_data = models.JSONField()

    status = models.CharField(
        max_length=20,
        default="PENDING",
        choices=STATUS_CHOICES
    )

    suspicious = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.status