def rewrite(question,history=None):
    history=history or []
    context=' '.join(str(x) for x in history[-3:])
    return f'{question} {context}'.strip()
