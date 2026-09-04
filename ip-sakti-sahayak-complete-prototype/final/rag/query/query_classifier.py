def classify_question(q):
    q=q.lower()
    if any(x in q for x in ['patent','trademark','design','gi','ip']): return 'ip'
    if any(x in q for x in ['regulat','license','label','compliance','law','rule']): return 'regulatory'
    if any(x in q for x in ['traditional knowledge','tkdl','biodiversity','abs','biological']): return 'tk_abs'
    return 'general'
