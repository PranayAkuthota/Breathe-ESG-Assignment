def clean_unit(unit):

    mapping={

        "L":"liters",

        "ltr":"liters",

        "Liter":"liters",

        "Liters":"liters"

    }

    return mapping.get(
        unit,
        unit
    )



def check_suspicious(qty):

    if qty:

        if qty>100000:

            return True

    return False