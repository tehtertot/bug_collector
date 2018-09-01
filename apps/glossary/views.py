from django.shortcuts import render
from .models import GlossaryItem

def index(request):
    return render(request, "glossary/index.html", {'all_terms': GlossaryItem.objects.all().order_by('term')})