from django.contrib import admin
from .models import GlossaryItem

class GlossaryAdmin(admin.ModelAdmin):
    pass

admin.site.register(GlossaryItem, GlossaryAdmin)
