from django.shortcuts import render, redirect, reverse
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib import messages
from django.urls import reverse_lazy
from django.views import generic
from django.core.files.storage import FileSystemStorage
from .models import StudentError, CustomUser, ErrorImage, Keyword, Suggestion

@login_required
def index(request):
    context = {
        "all_errors": StudentError.objects.all()
    }
    return render(request, 'errors/home.html', context)

@login_required
def add(request):
    if request.method == "GET":
        return render(request, 'errors/add.html')

@login_required
def create(request):
    if request.method == "POST":
        response = {'status': 1}
        try:
            current_user = CustomUser.objects.get(username=request.user)
            new_error = StudentError.objects.create(description=request.POST["description"], contributor=current_user)

            # # upload and add each image
            fs = FileSystemStorage()
            for file in request.FILES.getlist("uploadedImages"):
            # for f in request.FILES:
                # file = request.FILES[f]
                filename = fs.save('uploaded_images/'+file.name, file)
                ErrorImage.objects.create(url=filename[16:], uploader=current_user, associated_error=new_error)
            return JsonResponse(response)
        except:
            response['status'] = 0
            return JsonResponse(response)

@login_required
def show(request, id):
    error_to_display = StudentError.objects.get(id=id)
    context = {'error': error_to_display,
                'other_keywords': Keyword.objects.exclude(errors_submitted=error_to_display)
               }
    return render(request, "errors/one.html", context)

@login_required
def add_keyword(request, error_id, keyword_id):
    keyword = Keyword.objects.get(id=keyword_id)
    StudentError.objects.get(id=error_id).keywords.add(keyword)
    return redirect(reverse('main:show', kwargs={'id': error_id}))

# @login_required
# def remove_keyword(request, error_id, keyword_id):
#     keyword = Keyword.objects.get(id=keyword_id)
#     StudentError.objects.get(id=error_id).keywords.remove(keyword)
#     return redirect(reverse('main:show', kwargs={'id': error_id}))

@login_required
def add_suggestion(request, error_id):
    error = StudentError.objects.get(id=error_id)
    current_user = CustomUser.objects.get(username=request.user)
    Suggestion.objects.create(content=request.POST["suggestion"], associated_error=error, suggestor=current_user)
    return redirect(reverse('main:show', kwargs={'id': error_id}))