# Revenue calculation algorithm
def calculate_earnings(views, ctr, epc):
    clicks = views * ctr
    return clicks * epc