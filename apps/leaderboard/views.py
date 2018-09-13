from django.shortcuts import render
from django.db.models import Count
from apps.error_log_mgmt.models import Suggestion, StudentError
from apps.user_mgmt.models import CustomUser

def index(request):
    annotated_users = CustomUser.objects.annotate(num_errors=Count('errors_shared'))
    users_errors = annotated_users.filter(num_errors__gt=0).order_by('-num_errors')
    annotated_users = CustomUser.objects.annotate(num_suggestions=Count('suggestions_given'))
    users_suggestions = annotated_users.filter(num_suggestions__gt=0).order_by('-num_suggestions')
    return render(request, "leaderboard/index.html", context = {'errors': users_errors, 'suggestions': users_suggestions})
