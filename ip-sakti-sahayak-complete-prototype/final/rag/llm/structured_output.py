def assistant_output(answer,evidence):
    return {'answer':answer,'citations':[e['id'] for e in evidence],'evidence':evidence}
