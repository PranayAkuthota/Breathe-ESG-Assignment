from rest_framework.views import APIView
from rest_framework.response import Response

import pandas as pd

from audit.models import Log

from .models import (
    Company,
    DataSource,
    EmissionRecord
)

from .utils import (
    clean_unit,
    check_suspicious
)

from .serializers import RecordSerializer

class UploadView(APIView):

    def post(self, request):

        file = request.FILES.get(
            "file"
        )

        category = request.data.get(
            "category",
            "Fuel"
        )

        if not file:

            return Response(
                {
                    "error": "file missing"
                },
                status=400
            )

        df = pd.read_csv(file)

        rows = df.to_dict(
            "records"
        )

        company, _ = Company.objects.get_or_create(
            name="Demo Company"
        )

        source, _ = DataSource.objects.get_or_create(

            company=company,

            source_type="SAP"
        )

        count = 0

        for row in rows:

            # =========================
            # FUEL
            # =========================

            if category == "Fuel":

                qty = row.get(
                    "Qty",
                    0
                )

                clean_data = {

                    "fuel": row.get(
                        "Fuel"
                    ),

                    "quantity": qty,

                    "unit": clean_unit(
                        row.get(
                            "Unit"
                        )
                    )

                }

            # =========================
            # ELECTRICITY
            # =========================

            elif category == "Electricity":

                qty = row.get(
                    "Usage",
                    0
                )

                clean_data = {

                    "source": row.get(
                        "Source"
                    ),

                    "usage": qty,

                    "unit": clean_unit(
                        row.get(
                            "Unit"
                        )
                    )

                }

            # =========================
            # TRAVEL
            # =========================

            elif category == "Travel":

                qty = row.get(
                    "Distance",
                    0
                )

                clean_data = {

                    "employee": row.get(
                        "Employee"
                    ),

                    "mode": row.get(
                        "Mode"
                    ),

                    "distance": qty,

                    "unit": clean_unit(
                        row.get(
                            "Unit"
                        )
                    )

                }

            else:

                qty = 0

                clean_data = {}

            suspicious = check_suspicious(
                qty
            )

            EmissionRecord.objects.create(

                source=source,

                category=category,

                raw_data=row,

                normalized_data=clean_data,

                suspicious=suspicious,

                status=
                "FLAGGED"
                if suspicious
                else
                "PENDING"

            )

            count += 1

        return Response({

            "message": "done",

            "records": count

        })
    
    from audit.models import Log



class ApproveView(APIView):


    def post(

        self,
        request,
        id
    ):

        record=EmissionRecord.objects.get(
            id=id
        )


        old=record.status


        if old=="LOCKED":

            return Response({

                "message":"already locked"

            })


        record.status="LOCKED"

        record.save()


        Log.objects.create(

            record=record,

            action="approved",

            old_status=old,

            new_status="LOCKED"

        )


        return Response({

            "message":"updated"

        })
    from django.db.models import Count


class DashboardView(APIView):

    def get(self,request):

        total=EmissionRecord.objects.count()

        flagged=EmissionRecord.objects.filter(
            suspicious=True
        ).count()


        approved=EmissionRecord.objects.filter(
            status="LOCKED"
        ).count()


        pending=EmissionRecord.objects.filter(
            status="PENDING"
        ).count()


        percent=0

        if total:

            percent=round(
                (flagged/total)*100,
                2
            )


        return Response({

            "total_records":total,

            "flagged":flagged,

            "approved":approved,

            "pending":pending,

            "risk_percent":percent

        })
    
    from .serializers import RecordSerializer


class RecordsView(APIView):

    def get(self,request):

        status=request.GET.get(
            "status"
        )

        category=request.GET.get(
            "category"
        )

        data=EmissionRecord.objects.all()

        if status:

            data=data.filter(
                status=status
            )

        if category:

            data=data.filter(
                category=category
            )

        serializer=RecordSerializer(
            data,
            many=True
        )

        return Response(
            serializer.data
        )